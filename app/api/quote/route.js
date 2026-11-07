// Kowalski Concrete — instant-quote booking requests.
// Saves a lead record to Upstash, emails Kris (Resend), and (with consent, when Twilio is configured)
// texts the customer a link to their quote summary. Follow-ups run from /api/cron/followups.

import { json, redis, redisConf, originOk, clientIp, clean, newId, normPhone, sendSms, twilioReady, firstText, DAYS, DAY_MS, SITE } from '../../lib/kc';

export const runtime = 'nodejs';

const NOTIFY = () => process.env.LEAD_TO_EMAIL || 'info@kowalskicc.ca';
const torontoDay = () => {
  const p = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Toronto', year: 'numeric', month: '2-digit', day: '2-digit' })
    .formatToParts(new Date()).reduce((a, x) => { a[x.type] = x.value; return a; }, {});
  return p.year + '-' + p.month + '-' + p.day;
};

export async function POST(request) {
  if (!originOk(request)) return json({ error: 'Not allowed.' }, 403);
  let b;
  try { b = await request.json(); } catch (e) { return json({ error: 'Bad request.' }, 400); }
  if (b && b.website) return json({ ok: true }); // honeypot: pretend success

  const name = clean(b && b.name, 80);
  const phone = clean(b && b.phone, 40);
  const email = clean(b && b.email, 120);
  const digits = phone.replace(/\D/g, '');
  if (name.length < 2) return json({ error: 'Please enter your name.' }, 400);
  if (digits.length < 10 || digits.length > 15) return json({ error: 'Please enter a valid phone number.' }, 400);
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

  const ip = clientIp(request);
  const e164 = normPhone(phone);
  const now = Date.now();
  const lead = {
    id: newId(),
    at: new Date(now).toISOString(),
    ts: now,
    name, phone, e164,
    email: emailOk ? email : '',
    address: clean(b.address, 200),
    project: clean(b.project, 300),
    price_range: clean(b.price_range, 60),
    notes: clean(b.notes, 1500),
    outline_points: clean(b.outline_points, 2000),
    consent: !!(b && b.consent),
    status: 'new', // new | booked | lost
    stopped: false, replied: false,
    step: 0, // next follow-up index into DAYS
    ip,
  };

  // 1. save (also acts as the rate limiter)
  let saved = false;
  if (redisConf()) {
    try {
      const day = torontoDay();
      const kIp = 'quote:ip:' + ip;
      const kDay = 'quote:day:' + day;
      const r = await redis([['INCR', kIp], ['EXPIRE', kIp, 3600], ['INCR', kDay], ['EXPIRE', kDay, 90000]]);
      if (r[0] > 8) return json({ error: 'Too many requests. Please call 249-535-7501.' }, 429);
      if (r[2] > 200) return json({ error: 'Please call 249-535-7501 and we will help you directly.' }, 429);
      const cmds = [
        ['SET', 'lead:' + lead.id, JSON.stringify(lead)],
        ['ZADD', 'leads:all', now, lead.id],
        ['LPUSH', 'quote:requests', JSON.stringify(lead)],
      ];
      if (e164) cmds.push(['SET', 'phone:' + e164, lead.id]);
      if (lead.consent && e164) cmds.push(['ZADD', 'leads:due', now + DAYS[0] * DAY_MS, lead.id]);
      await redis(cmds);
      saved = true;
    } catch (e) { console.error('quote save failed', e && e.message); }
  }

  // 2. text the customer (consent + Twilio configured + stored so the link works)
  let texted = false;
  if (saved && lead.consent && e164 && twilioReady()) {
    try {
      let blocked = false;
      try { blocked = !!(await redis([['GET', 'stop:' + e164]]))[0]; } catch (e) {}
      if (!blocked) texted = (await sendSms(e164, firstText(lead))).ok;
    } catch (e) {}
  }

  // 3. notify Kris (best effort)
  const lines = [
    'Name: ' + lead.name, 'Phone: ' + lead.phone, 'Email: ' + (lead.email || '(none)'),
    'Address: ' + (lead.address || '(none)'), 'Project: ' + (lead.project || '(none)'),
    'Price range shown: ' + (lead.price_range || '(none)'), 'Notes: ' + (lead.notes || '(none)'),
    'Outline: ' + (lead.outline_points || '(none)'), 'Time: ' + lead.at,
    'Texts: ' + (lead.consent ? (texted ? 'quote link texted; follow-ups on day 2, 5, 14' : 'consented, but text not sent (Twilio not set up or failed)') : 'no text consent'),
    'Customer page: ' + SITE + '/quote/' + lead.id,
  ];
  const text = lines.join('\n') + '\n\nFrom kowalskicc.ca/instant-quote';

  const rk = process.env.RESEND_API_KEY;
  let mailed = false;
  if (rk) {
    const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 7000);
    try {
      const er = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + rk, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Kowalski Instant Quote <onboarding@resend.dev>',
          to: [NOTIFY()],
          reply_to: lead.email || undefined,
          subject: 'Instant Quote Request — ' + lead.name + (lead.project ? ' — ' + lead.project.slice(0, 60) : ''),
          text,
        }),
        signal: ctl.signal,
      });
      mailed = er.ok;
      if (!er.ok) console.error('quote resend failed', er.status, (await er.text()).slice(0, 300));
    } catch (e) { console.error('quote resend exception', e && e.message); } finally { clearTimeout(t); }
  }

  if (saved || mailed) return json({ ok: true, saved, mailed, texted });
  return json({ error: 'Could not send. Please call 249-535-7501.' }, 503);
}
