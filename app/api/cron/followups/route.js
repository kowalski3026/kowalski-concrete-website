// Daily cron (see vercel.json). Texts consenting leads on day 2, 5 and 14 after their quote request,
// unless they replied, opted out, or Kris marked them booked/lost.
import { json, redis, redisConf, sendSms, twilioReady, followText, DAYS, DAY_MS } from '../../../lib/kc';
import crypto from 'crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

function authed(request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const given = (request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
  const a = crypto.createHash('sha256').update(secret).digest();
  const b = crypto.createHash('sha256').update(given).digest();
  return crypto.timingSafeEqual(a, b);
}

export async function GET(request) {
  if (!authed(request)) return json({ error: 'unauthorized' }, 401);
  if (!redisConf()) return json({ ok: false, reason: 'no redis' });
  if (!twilioReady()) return json({ ok: true, sent: 0, reason: 'twilio not configured' });

  const now = Date.now();
  const due = (await redis([['ZRANGEBYSCORE', 'leads:due', '-inf', String(now), 'LIMIT', 0, 40]]))[0] || [];
  let sent = 0, dropped = 0, failed = 0;

  for (const id of due) {
    try {
      const raw = (await redis([['GET', 'lead:' + id]]))[0];
      const lead = raw ? JSON.parse(raw) : null;
      if (!lead || lead.status !== 'new' || lead.stopped || lead.replied || !lead.consent || !lead.e164) {
        await redis([['ZREM', 'leads:due', id]]); dropped++; continue;
      }
      const stop = (await redis([['GET', 'stop:' + lead.e164]]))[0];
      if (stop) { lead.stopped = true; await redis([['SET', 'lead:' + id, JSON.stringify(lead)], ['ZREM', 'leads:due', id]]); dropped++; continue; }

      const step = lead.step || 0;
      if (step >= DAYS.length) { await redis([['ZREM', 'leads:due', id]]); dropped++; continue; }

      const r = await sendSms(lead.e164, followText(lead, step));
      if (!r.ok) {
        lead.fails = (lead.fails || 0) + 1;
        const cmds = [['SET', 'lead:' + id, JSON.stringify(lead)]];
        if (lead.fails >= 3) cmds.push(['ZREM', 'leads:due', id]);
        await redis(cmds); failed++; continue;
      }
      lead.step = step + 1; lead.fails = 0;
      lead.lastText = new Date().toISOString();
      const cmds = [['SET', 'lead:' + id, JSON.stringify(lead)]];
      if (lead.step < DAYS.length) cmds.push(['ZADD', 'leads:due', Math.max(now + 3600000, lead.ts + DAYS[lead.step] * DAY_MS), id]);
      else cmds.push(['ZREM', 'leads:due', id]);
      await redis(cmds); sent++;
    } catch (e) { console.error('followup error', id, e && e.message); failed++; }
  }
  return json({ ok: true, sent, dropped, failed });
}
