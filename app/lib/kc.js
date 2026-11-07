// Shared helpers for Kowalski Concrete server routes (quotes, texts, admin, jobs).
import crypto from 'crypto';

export const SITE = (process.env.PUBLIC_BASE_URL || 'https://kowalskicc.ca').replace(/\/$/, '');
export const BIZ_PHONE = '249-535-7501';
const ALLOWED_HOSTS = ['kowalskicc.ca', 'www.kowalskicc.ca', 'localhost'];

export function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
}

export function redisConf() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ''), token } : null;
}

export async function redis(commands) {
  const conf = redisConf();
  if (!conf) throw new Error('redis not configured');
  const r = await fetch(conf.url + '/pipeline', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + conf.token, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
    cache: 'no-store',
  });
  if (!r.ok) throw new Error('redis ' + r.status);
  const out = await r.json();
  return out.map((x) => { if (x.error) throw new Error(x.error); return x.result; });
}

export function originOk(request) {
  const src = request.headers.get('origin') || request.headers.get('referer');
  if (!src) return false;
  try { return ALLOWED_HOSTS.includes(new URL(src).hostname); } catch (e) { return false; }
}

export function clientIp(request) {
  const real = request.headers.get('x-real-ip');
  if (real) return real.trim();
  const xff = request.headers.get('x-forwarded-for');
  return xff ? xff.split(',')[0].trim() : 'unknown';
}

export const clean = (v, n) => String(v == null ? '' : v).replace(/[\u0000-\u001f<>]/g, ' ').trim().slice(0, n);
export const newId = () => crypto.randomBytes(8).toString('hex');

// "249 535 7501" -> "+12495357501"; returns '' if it does not look like a phone number
export function normPhone(p) {
  const d = String(p || '').replace(/\D/g, '');
  if (d.length === 10) return '+1' + d;
  if (d.length === 11 && d[0] === '1') return '+' + d;
  if (d.length >= 11 && d.length <= 15) return '+' + d;
  return '';
}

export const firstName = (n) => String(n || '').trim().split(/\s+/)[0] || 'there';

/* ---------------- Twilio (REST, no SDK) ---------------- */
export function twilioReady() {
  return !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_FROM);
}

export async function sendSms(to, body) {
  if (!twilioReady()) return { ok: false, skipped: true };
  if (!/^\+\d{10,15}$/.test(to || '')) return { ok: false, error: 'bad number' };
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 8000);
  try {
    const r = await fetch('https://api.twilio.com/2010-04-01/Accounts/' + sid + '/Messages.json', {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + Buffer.from(sid + ':' + process.env.TWILIO_AUTH_TOKEN).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ To: to, From: process.env.TWILIO_FROM, Body: body }).toString(),
      signal: ctl.signal,
    });
    if (!r.ok) { console.error('twilio sms failed', r.status, (await r.text()).slice(0, 300)); return { ok: false, status: r.status }; }
    return { ok: true };
  } catch (e) { console.error('twilio sms exception', e && e.message); return { ok: false, error: 'exception' }; }
  finally { clearTimeout(t); }
}

// Twilio request signature: base64(HMAC-SHA1(authToken, url + sorted key/value pairs))
export function twilioSignature(token, url, params) {
  const data = Object.keys(params).sort().reduce((s, k) => s + k + params[k], url);
  return crypto.createHmac('sha1', token).update(data).digest('base64');
}
export function twilioValid(request, params) {
  const token = process.env.TWILIO_AUTH_TOKEN;
  const given = request.headers.get('x-twilio-signature') || '';
  if (!token || !given) return false;
  const path = new URL(request.url).pathname;
  const bases = [SITE, 'https://kowalskicc.ca', 'https://www.kowalskicc.ca'];
  return bases.some((b) => {
    const exp = twilioSignature(token, b + path, params);
    const a = Buffer.from(exp), c = Buffer.from(given);
    return a.length === c.length && crypto.timingSafeEqual(a, c);
  });
}
export async function formParams(request) {
  const text = await request.text();
  const params = {};
  new URLSearchParams(text).forEach((v, k) => { params[k] = v; });
  return params;
}
export function twiml(inner) {
  return new Response('<?xml version="1.0" encoding="UTF-8"?><Response>' + (inner || '') + '</Response>', {
    status: 200, headers: { 'Content-Type': 'text/xml', 'Cache-Control': 'no-store' },
  });
}
export const xmlEsc = (s) => String(s).replace(/[<>&"']/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[c]));

/* ---------------- admin auth ---------------- */
export function adminOk(request) {
  const pw = process.env.ADMIN_PASSWORD;
  const given = request.headers.get('x-admin-key') || '';
  if (!pw || !given) return false;
  const a = crypto.createHash('sha256').update(pw).digest();
  const b = crypto.createHash('sha256').update(given).digest();
  return crypto.timingSafeEqual(a, b);
}

/* ---------------- lead messages ---------------- */
export const DAYS = [2, 5, 14];
export const DAY_MS = 86400000;

export function firstText(lead) {
  return 'Hi ' + firstName(lead.name) + ', Kowalski Concrete here. Thanks for your request'
    + (lead.price_range ? ' (your range: ' + lead.price_range + ')' : '') + '. Your summary and next steps: '
    + SITE + '/quote/' + lead.id + ' Questions? Call or text ' + BIZ_PHONE + '. Reply STOP to opt out.';
}
export function followText(lead, step) {
  const link = SITE + '/quote/' + lead.id;
  const n = firstName(lead.name);
  if (step === 0) return 'Hi ' + n + ', Kris at Kowalski Concrete. Any questions on your quote? I can set up your free site visit whenever suits you: ' + link + ' or call/text ' + BIZ_PHONE + '. Reply STOP to opt out.';
  if (step === 1) return 'Hi ' + n + ', just checking in from Kowalski Concrete. Booking for the season fills up, so let me know if you would like a spot for your project. ' + link + ' Reply STOP to opt out.';
  return 'Hi ' + n + ', last note from Kowalski Concrete. If you still want pricing firmed up, call or text ' + BIZ_PHONE + ' any time. If not, no worries and thanks for looking. Reply STOP to opt out.';
}
export function missedCallText() {
  return 'Hi, this is Kowalski Concrete. Sorry we missed your call, we are on a job site. Get a price range in about a minute: ' + SITE + '/instant-quote.html or reply here with what you need and we will get back to you. Reply STOP to opt out.';
}
