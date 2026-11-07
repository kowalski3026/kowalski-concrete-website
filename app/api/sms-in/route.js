// Twilio inbound-SMS webhook. Set the number's "A message comes in" webhook to
// https://kowalskicc.ca/api/sms-in (HTTP POST). Forwards replies to Kris's cell, records STOP/START.
import { json, redis, redisConf, formParams, twilioValid, twiml, normPhone, sendSms } from '../../lib/kc';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const STOP = /^\s*(stop|stopall|unsubscribe|cancel|end|quit)\b/i;
const START = /^\s*(start|unstop|yes)\s*$/i;

export async function POST(request) {
  const params = await formParams(request);
  if (!twilioValid(request, params)) return json({ error: 'forbidden' }, 403);

  const from = normPhone(params.From || '');
  const body = String(params.Body || '').slice(0, 600);
  if (!from) return twiml('');

  try {
    let leadId = null;
    if (redisConf()) leadId = (await redis([['GET', 'phone:' + from]]))[0];

    if (STOP.test(body)) {
      if (redisConf()) {
        const cmds = [['SET', 'stop:' + from, '1']];
        if (leadId) cmds.push(['ZREM', 'leads:due', leadId]);
        await redis(cmds);
        if (leadId) await patchLead(leadId, { stopped: true });
      }
      return twiml(''); // Twilio sends the carrier-required STOP confirmation itself
    }
    if (START.test(body)) {
      if (redisConf()) await redis([['DEL', 'stop:' + from]]);
      return twiml('');
    }

    if (leadId) {
      await redis([['ZREM', 'leads:due', leadId]]); // they answered: stop automatic follow-ups
      await patchLead(leadId, { replied: true });
    }
    const kris = normPhone(process.env.KRIS_CELL || '');
    if (kris && kris !== from) await sendSms(kris, 'Text from ' + from + ': ' + body.slice(0, 300));
  } catch (e) { console.error('sms-in', e && e.message); }
  return twiml('');
}

async function patchLead(id, patch) {
  const raw = (await redis([['GET', 'lead:' + id]]))[0];
  if (!raw) return;
  const lead = Object.assign(JSON.parse(raw), patch);
  await redis([['SET', 'lead:' + id, JSON.stringify(lead)]]);
}
