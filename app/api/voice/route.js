// Twilio voice webhook: Kris's cell forwards unanswered calls to the Twilio number; this texts the caller
// the instant-quote link and tells Kris. Set the number's "A call comes in" webhook to
// https://kowalskicc.ca/api/voice (HTTP POST).
import { json, redis, redisConf, formParams, twilioValid, twiml, xmlEsc, normPhone, sendSms, missedCallText } from '../../lib/kc';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SAY = 'You have reached Kowalski Concrete. We are on a job site and cannot pick up right now. We are texting you a link so you can get a price range in about a minute. Thanks for calling.';

export async function POST(request) {
  const params = await formParams(request);
  if (!twilioValid(request, params)) return json({ error: 'forbidden' }, 403);

  const from = normPhone(params.From || '');
  const ours = [process.env.TWILIO_FROM, process.env.KRIS_CELL].filter(Boolean).map(normPhone);
  if (from && !ours.includes(from)) {
    try {
      let go = true;
      if (redisConf()) {
        const day = new Date().toISOString().slice(0, 10);
        const r = await redis([['SET', 'missed:' + from, '1', 'NX', 'EX', 86400], ['INCR', 'missed:day:' + day], ['EXPIRE', 'missed:day:' + day, 90000], ['GET', 'stop:' + from]]);
        go = r[0] === 'OK' && r[1] <= 60 && !r[3];
      }
      if (go) {
        const s = await sendSms(from, missedCallText());
        const kris = normPhone(process.env.KRIS_CELL || '');
        if (kris) await sendSms(kris, 'Missed call from ' + from + (s.ok ? ' (texted them your quote link)' : ' (auto-text failed, may be a landline)') + '.');
      }
    } catch (e) { console.error('voice webhook', e && e.message); }
  }
  return twiml('<Say voice="alice" language="en-CA">' + xmlEsc(SAY) + '</Say><Hangup/>');
}
