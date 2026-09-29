// Kowalski Concrete — visualizer lead capture.
// Saves name + phone/email to Upstash (list "viz:leads") and unlocks 2 more previews for that visitor.
// The email to info@kowalskicc.ca is sent by the page itself (FormSubmit), same as the quote form.
// View leads: Upstash console -> your database -> Data Browser -> key  viz:leads  (newest first).

export const runtime = 'nodejs';

const ALLOWED_HOSTS = ['kowalskicc.ca', 'www.kowalskicc.ca', 'localhost'];

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
}
function redisConf() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ''), token } : null;
}
async function redis(conf, commands) {
  const r = await fetch(conf.url + '/pipeline', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + conf.token, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
  });
  if (!r.ok) throw new Error('redis ' + r.status);
  const out = await r.json();
  return out.map((x) => { if (x.error) throw new Error(x.error); return x.result; });
}
function originOk(request) {
  const src = request.headers.get('origin') || request.headers.get('referer');
  if (!src) return false;
  try { return ALLOWED_HOSTS.includes(new URL(src).hostname); } catch (e) { return false; }
}
function clientIp(request) {
  const real = request.headers.get('x-real-ip');
  if (real) return real.trim();
  const xff = request.headers.get('x-forwarded-for');
  return xff ? xff.split(',')[0].trim() : 'unknown';
}
const clean = (v, n) => String(v == null ? '' : v).replace(/[\u0000-\u001f<>]/g, ' ').trim().slice(0, n);

export async function POST(request) {
  if (!originOk(request)) return json({ error: 'Not allowed.' }, 403);
  const rc = redisConf();
  if (!rc) return json({ error: 'Not set up yet.' }, 503);
  let b;
  try { b = await request.json(); } catch (e) { return json({ error: 'Bad request.' }, 400); }

  if (b && b.website) return json({ ok: true }); // honeypot: bots fill this, humans never see it

  const name = clean(b && b.name, 80);
  const contact = clean(b && b.contact, 120);
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact);
  const digits = contact.replace(/\D/g, '');
  const isPhone = !isEmail && digits.length >= 10 && digits.length <= 15 && /^[\d\s()+\-.ext]+$/i.test(contact);
  if (name.length < 2) return json({ error: 'Please enter your name.' }, 400);
  if (!isEmail && !isPhone) return json({ error: 'Please enter a valid phone number or email.' }, 400);
  if (!b.consent) return json({ error: 'Please tick the box so we can contact you.' }, 400);

  const ip = clientIp(request);
  const c = b.choices && typeof b.choices === 'object' ? b.choices : {};
  const lead = {
    at: new Date().toISOString(),
    name,
    contact,
    type: isEmail ? 'email' : 'phone',
    project: clean(c.projectType, 30),
    finish: clean(c.finish, 30),
    color: clean(c.fieldColor, 30),
    ip,
  };
  const kRate = 'viz:leadrate:' + ip;
  try {
    const r = await redis(rc, [['INCR', kRate], ['EXPIRE', kRate, 86400]]);
    if (r[0] > 5) return json({ error: 'Too many tries. Please call 249-535-7501.' }, 429);
    await redis(rc, [
      ['LPUSH', 'viz:leads', JSON.stringify(lead)],
      ['SET', 'viz:unlock:' + ip, '1', 'EX', 2592000], // 30 days
    ]);
  } catch (e) {
    console.error('lead save failed', e && e.message);
    return json({ error: 'Could not save that. Please try again.' }, 503);
  }
  return json({ ok: true });
}
