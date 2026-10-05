// Kowalski Concrete — AI visualizer API route
// Holds the Gemini key server-side and enforces every spending / abuse cap.
//
// REQUIRED env vars (Vercel -> Project -> Settings -> Environment Variables):
//   GEMINI_API_KEY                      your Google key
//   UPSTASH_REDIS_REST_URL  + UPSTASH_REDIS_REST_TOKEN   (Vercel's Upstash integration may name these
//   KV_REST_API_URL         + KV_REST_API_TOKEN           KV_REST_API_* instead — both work)
// OPTIONAL (defaults shown):
//   VIZ_IP_PER_HOUR=3   VIZ_IP_PER_DAY=10   VIZ_GLOBAL_PER_DAY=50
//   VIZ_ENABLED=false  -> turns the tool off (needs a redeploy)
// Instant kill switch, no redeploy: in the Upstash data browser create key  viz:off  with value  1
//   (delete the key to turn it back on).

export const runtime = 'nodejs';
export const maxDuration = 60;

const MODEL = 'gemini-3.1-flash-image-preview';
const MAX_B64_CHARS = 3_000_000; // ~2.2 MB image; the page downsizes photos to 1600px before sending

const ALLOWED_HOSTS = ['kowalskicc.ca', 'www.kowalskicc.ca', 'localhost'];

const num = (v, d) => { const n = parseInt(v, 10); return Number.isFinite(n) && n > 0 ? n : d; };
const LIMITS = () => ({
  ipHour: num(process.env.VIZ_IP_PER_HOUR, 3),
  ipDay: num(process.env.VIZ_IP_PER_DAY, 10),
  global: num(process.env.VIZ_GLOBAL_PER_DAY, 50),
  free: num(process.env.VIZ_FREE_PER_DAY, 1),          // previews before contact info is asked
  unlocked: num(process.env.VIZ_UNLOCKED_PER_DAY, 3),  // total per day after contact info is given
});

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

// ---------- Redis (Upstash REST, no npm package needed) ----------
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
  return out.map((x) => x.result);
}

// ---------- input whitelists ----------
const COLOR_LABELS = { natural: 'natural light grey', charcoal: 'charcoal grey', buff: 'buff/tan', sand: 'sand beige', slate: 'slate blue-grey', brick: 'brick red/terracotta' };
const BORDER_FINISH = { smooth: 'smooth', stamped: 'stamped soldier-course' };
const FINISH_TEXTURES = {
  broom: 'a freshly poured broom-finish concrete surface, clean linear broom texture',
  exposed: 'a freshly poured exposed aggregate concrete surface, natural stone aggregate visible across the surface',
  stamped: 'a freshly poured stamped concrete surface, ashlar slate pattern',
  smooth: 'a freshly poured smooth trowel-finish concrete surface, clean and even',
};
const SURFACE_NOUNS = { driveway: 'driveway', patio: 'patio', pathway: 'pathway', steps: 'steps' };
const NUM_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six'];

const pick = (val, allowed, dflt) => (Object.prototype.hasOwnProperty.call(allowed, val) ? val : dflt);

function cleanChoices(c) {
  c = c && typeof c === 'object' ? c : {};
  return {
    projectType: pick(c.projectType, SURFACE_NOUNS, 'driveway'),
    finish: pick(c.finish, FINISH_TEXTURES, 'stamped'),
    fieldColor: pick(c.fieldColor, COLOR_LABELS, 'natural'),
    layout: c.layout === 'segmented' ? 'segmented' : 'standard',
    segmentShape: c.segmentShape === 'square' ? 'square' : 'diamond',
    segmentAccentColor: pick(c.segmentAccentColor, COLOR_LABELS, 'charcoal'),
    borderOn: c.borderOn === true,
    borderColor: pick(c.borderColor, COLOR_LABELS, 'charcoal'),
    borderFinish: pick(c.borderFinish, BORDER_FINISH, 'smooth'),
    stepsOn: c.stepsOn === true,
    stepsStyle: c.stepsStyle === 'cantilever' ? 'cantilever' : 'standard',
    stepCount: Math.min(6, Math.max(1, parseInt(c.stepCount, 10) || 3)),
    extending: c.extending === true,
  };
}

// Same wording the page used client-side — now built here so callers can't send their own prompt.
// Saw-cut / control-joint instructions for the plain (non-segmented) slab. Width-driven so panels come out square.
function jointsPhrase(projectType) {
  const tail = ' The joints are thin, straight, dark saw-cut lines that follow the perspective of the photo. FEWER IS BETTER: do not add extra joints, and do not draw many small panels — every panel must be a large, clean square';
  if (projectType === 'driveway') {
    return 'with saw-cut control joints (relief joints) laid out like a professional pour: if the driveway is wide (about 16 to 24 feet), cut exactly ONE straight joint running lengthwise down the exact center of the driveway, which splits it into two equal-width strips; then cut straight cross joints across the full width, spaced evenly along the length, with the spacing between cross joints equal to the width of one strip, so every panel is a perfect square (about 10 feet by 10 feet on a 20-foot-wide driveway). If the driveway is narrow (a single-car width, under about 12 feet), use NO lengthwise joint and just cross joints spaced about as far apart as the driveway is wide, again making square panels.' + tail;
  }
  if (projectType === 'pathway') {
    return 'with saw-cut control joints cut straight across the pathway, no lengthwise joint, spaced evenly about as far apart as the pathway is wide, so every panel is a square.' + tail;
  }
  return 'with saw-cut control joints (relief joints) in a regular, perfectly square grid, one joint roughly every 10 feet in both directions, forming large equal squares of about 10 feet by 10 feet (a patio shows only a few panels).' + tail;
}

function buildPrompt(c) {
  const colorPhrase = (finish, key) => {
    if (key === 'natural') return '';
    const label = COLOR_LABELS[key];
    return finish === 'exposed' ? ', with the exposed aggregate blend running in ' + label + ' tones' : ', tinted ' + label;
  };
  const finishDesc = FINISH_TEXTURES[c.finish] + colorPhrase(c.finish, c.fieldColor) + ', professionally finished';
  const extending = c.extending;
  const isSteps = c.projectType === 'steps';
  const surfaceNoun = SURFACE_NOUNS[c.projectType] || 'driveway';
  const stepCountPhrase = () => {
    const n = c.stepCount;
    return 'exactly ' + NUM_WORDS[n] + ' (' + n + ') ' + (n === 1 ? 'step' : 'steps') + ' — count them, no more and no fewer, and keep the run short so it does not extend far out from the house';
  };

  const footprintPhrase = extending
    ? 'covering the area marked in bright magenta on this photo, treating the magenta-marked area as the new ' + surfaceNoun + ' surface to be added — regardless of what is currently there (grass, dirt, mulch, gravel, or old pavement)'
    : 'following the same footprint and shape as the existing ' + surfaceNoun;

  let mainClause;
  if (isSteps) {
    const stepsStyleDesc = c.stepsStyle === 'cantilever'
      ? 'built as modern cantilever (floating) concrete steps — thin treads that appear to float above the ground with a visible gap beneath each one and no visible support wall'
      : 'built directly on grade as solid poured concrete steps';
    mainClause = (extending ? 'Install new' : 'Replace the existing steps with new') + ' concrete steps finished as ' + finishDesc + ', ' + stepsStyleDesc + ', with ' + stepCountPhrase() + ', ' + footprintPhrase;
  } else if (c.layout === 'segmented') {
    const segShape = c.segmentShape === 'square' ? 'square' : 'diamond (a square turned 45 degrees so its corners point up, down, left and right)';
    const segName = c.segmentShape === 'square' ? 'square' : 'diamond';
    const accentLabel = COLOR_LABELS[c.segmentAccentColor] || COLOR_LABELS.charcoal;
    const bandW = c.borderOn ? '12 inches' : '8 inches';
    mainClause = 'Finish the ' + surfaceNoun + ' as ' + finishDesc + ', divided into a regular grid of ' + segShape + ' panels. ' +
      (c.segmentShape === 'square'
        ? 'PANEL SIZE: every square panel is about 10 feet on each side, which is LARGE — on a driveway about 20 feet wide only 2 squares fit across the width, and a patio shows only a handful of squares in total. COUNT CHECK: never more than 3 panels across the width of a driveway; never dozens of small panels. '
        : 'PANEL SIZE: every diamond is about 10 feet on each side, which is about 14 feet from corner to corner (left point to right point), so each diamond is VERY LARGE: on a driveway about 20 feet wide, only about one and a half diamonds fit across the width — one big diamond in the middle with the pointed ends of the next diamonds cut off by the outer border at the edges. Each diamond is roughly as wide as a two-car garage door. COUNT CHECK: never more than 2 whole diamonds across the width of a driveway, and a patio shows only a handful of diamonds in total; do NOT draw a fine, busy grid of small diamonds. ') +
      'Keep all panels identical in size and shape and the grid perfectly regular, following the photo\'s perspective (panels look smaller farther away, but the same real size). ' +
      'BORDER WIDTH: draw ONE bold ' + accentLabel + ' band style and use it everywhere — the contrasting border running around the outside edge of the whole pad AND every line between neighbouring panels are exactly the same width, about ' + bandW + ' wide, clearly visible as a solid ' + accentLabel + ' band. The lines between panels must NOT be thin hairline joints or thinner than the outer border; look at the outer border and make the inside lines match it exactly. ' +
      'Finished like a mosaic-style ' + segName + ' pattern with ' + accentLabel + ' accent banding, ' + footprintPhrase;
  } else {
    mainClause = (extending ? 'Install' : 'Replace the existing ' + surfaceNoun + ' with') + ' ' + finishDesc + (c.projectType === 'driveway' && !extending ? ' and any adjacent walkway surface' : '') + ', ' + footprintPhrase + ', ' + jointsPhrase(c.projectType);
  }
  let prompt = 'Photorealistic edit of this exact house and ' + surfaceNoun + ' photograph: ' + mainClause + '.';

  if (extending) {
    prompt += ' This exact photo already has the new area highlighted directly on top in bright magenta, painted on by the customer to mark where they want the new ' + surfaceNoun + ' added — it is not a separate reference, it is part of this same photo. Replace only the magenta-highlighted region with new concrete matching the description above, lying flat on the ground and matching the same slope, perspective, and lighting as the rest of the scene. If the marked area touches existing pavement, blend seamlessly into it at the transition with no visible seam or step; if the marked area is on grass, dirt, or another bare surface with no adjacent pavement, give the new pad a clean, finished edge instead. Do not alter any pixel outside that highlighted region. The magenta highlight itself must be completely removed and must NOT appear anywhere in the output — show only realistic concrete, grass, and other real materials.';
  }
  if (c.borderOn) {
    prompt += ' Add a distinct ' + COLOR_LABELS[c.borderColor] + ', ' + BORDER_FINISH[c.borderFinish] + '-finish concrete border strip, about 12 inches wide, running around the perimeter of the ' + surfaceNoun + ' — clearly different in color and texture from the main field, like a professional accent-border edge.';
  }
  if (c.stepsOn && !isSteps) {
    if (c.stepsStyle === 'cantilever') {
      prompt += ' Add a short run of ' + stepCountPhrase() + ' of modern cantilever (floating) concrete steps at the entry point where the ' + surfaceNoun + ' meets any elevation change — thin steps that appear to float above the ground with a visible gap beneath each tread and no visible support wall.';
    } else {
      prompt += ' Add a matching set of ' + stepCountPhrase() + ' of concrete steps at the entry point where the ' + surfaceNoun + ' meets any elevation change, built directly on grade.';
    }
  }
  if (extending) {
    prompt += ' Outside the magenta-highlighted area, do not change anything else in the image — keep the house, garage, landscaping, trees, fencing, any grass or ground not covered by the highlight, sky, lighting, camera angle, and perspective completely identical to the original photo.';
  } else {
    prompt += ' Do not change anything else in the image — keep the house, garage, landscaping, trees, fencing, grass, sky, lighting, camera angle, and perspective completely identical to the original photo.';
  }
  return prompt;
}

// ---------- image sanity ----------
function looksLikeImage(b64, mime) {
  try {
    const head = Buffer.from(b64.slice(0, 32), 'base64');
    if (mime === 'image/jpeg') return head[0] === 0xff && head[1] === 0xd8;
    if (mime === 'image/png') return head[0] === 0x89 && head[1] === 0x50 && head[2] === 0x4e && head[3] === 0x47;
    if (mime === 'image/webp') return head.slice(0, 4).toString() === 'RIFF' && head.slice(8, 12).toString() === 'WEBP';
  } catch (e) { /* fall through */ }
  return false;
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

const torontoNow = () => {
  const p = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Toronto', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hourCycle: 'h23' })
    .formatToParts(new Date()).reduce((a, x) => { a[x.type] = x.value; return a; }, {});
  return { day: p.year + '-' + p.month + '-' + p.day, hour: p.hour };
};

export async function POST(request) {
  // 0. off switches
  if (process.env.VIZ_ENABLED === 'false') return json({ error: 'The visualizer is temporarily unavailable. Please try again later, or call 249-535-7501.' }, 503);
  if (!originOk(request)) return json({ error: 'Not allowed.' }, 403);

  const gemKey = process.env.GEMINI_API_KEY;
  const rc = redisConf();
  // Fail CLOSED: with no limiter configured, nothing is allowed to spend money.
  if (!gemKey || !rc) return json({ error: 'The visualizer is not set up yet.' }, 503);

  // 1. parse + validate (before touching the limiter, so junk requests cost nothing)
  const len = parseInt(request.headers.get('content-length') || '0', 10);
  if (len > 4_000_000) return json({ error: 'That photo is too large.' }, 413);
  let body;
  try { body = await request.json(); } catch (e) { return json({ error: 'Bad request.' }, 400); }
  const mime = body && body.mimeType;
  const image = body && body.image;
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(mime)) return json({ error: 'Please use a JPG, PNG or WebP photo.' }, 400);
  if (typeof image !== 'string' || image.length < 1000 || image.length > MAX_B64_CHARS || !/^[A-Za-z0-9+/=]+$/.test(image)) return json({ error: 'That photo is too large or not valid. Try a smaller one.' }, 400);
  if (!looksLikeImage(image, mime)) return json({ error: 'That file does not look like a photo.' }, 400);

  const tok = typeof body.token === 'string' && /^[a-f0-9]{32}$/.test(body.token) ? body.token : 'none';
  const choices = cleanChoices(body.choices);
  const prompt = buildPrompt(choices);

  // 2. caps
  const lim = LIMITS();
  const ip = clientIp(request);
  const t = torontoNow();
  const kIpH = 'viz:ip:h:' + ip + ':' + t.day + ':' + t.hour;
  const kIpD = 'viz:ip:d:' + ip + ':' + t.day;
  const kGlob = 'viz:g:' + t.day;
  let counts;
  let unlocked = false;
  let bonusCap = 0;
  try {
    const r = await redis(rc, [
      ['GET', 'viz:off'],
      ['GET', 'viz:unlock:' + ip],
      ['GET', 'viz:bonus:' + ip],
      ['GET', 'viz:tok:' + tok],
      ['INCR', kIpH], ['EXPIRE', kIpH, 4000],
      ['INCR', kIpD], ['EXPIRE', kIpD, 90000],
      ['INCR', kGlob], ['EXPIRE', kGlob, 90000],
    ]);
    if (r[0] === '1' || r[0] === 1) {
      await redis(rc, [['DECR', kIpH], ['DECR', kIpD], ['DECR', kGlob]]).catch(() => {});
      return json({ error: 'The visualizer is taking a short break. Please try again later, or call 249-535-7501.' }, 503);
    }
    counts = { h: r[4], d: r[6], g: r[8] };
    bonusCap = parseInt(r[2], 10) || 0;
    unlocked = r[1] === '1' || r[1] === 1 || r[3] === '1' || r[3] === 1;
  } catch (e) {
    return json({ error: 'The visualizer is busy. Please try again in a few minutes.' }, 503); // fail closed
  }
  const refund = () => redis(rc, [['DECR', kIpH], ['DECR', kIpD], ['DECR', kGlob]]).catch(() => {});

  if (counts.g > lim.global) { await refund(); return json({ error: 'We have hit today’s free preview limit. Please try again tomorrow, or call 249-535-7501 for a free quote.' }, 429); }
  if (!unlocked && counts.d > lim.free) { await refund(); return json({ needLead: true, error: 'Enter your name and a phone or email to unlock 2 more free previews.' }, 402); }
  if (unlocked && counts.d > Math.max(lim.unlocked, bonusCap)) { await refund(); return json({ error: 'You have used today’s free previews. Call 249-535-7501 or request a free quote and we will take it from here.' }, 429); }
  if (counts.h > lim.ipHour) { await refund(); return json({ error: 'You have used your previews for this hour. Please try again in a bit.' }, 429); }
  if (counts.d > lim.ipDay) { await refund(); return json({ error: 'You have used all of today’s previews. Please try again tomorrow, or call 249-535-7501.' }, 429); }

  // 3. Gemini
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 55_000);
  try {
    const r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + MODEL + ':generateContent', {
      method: 'POST',
      headers: { 'x-goog-api-key': gemKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }, { inlineData: { mimeType: mime, data: image } }] }],
        generationConfig: { responseModalities: ['TEXT', 'IMAGE'] },
      }),
      signal: ctl.signal,
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      console.error('gemini error', r.status, JSON.stringify(data).slice(0, 500));
      await refund();
      return json({ error: r.status === 429 ? 'The visualizer is very busy right now. Please try again in a few minutes.' : 'The preview could not be generated. Please try again.' }, 502);
    }
    const parts = (((data.candidates || [])[0] || {}).content || {}).parts || [];
    const img = parts.find((p) => p.inlineData && p.inlineData.data);
    if (!img) {
      console.error('gemini no image', JSON.stringify(data).slice(0, 500));
      await refund();
      return json({ error: 'No preview came back for that photo. Try a different photo or angle.' }, 502);
    }
    return json({ mimeType: img.inlineData.mimeType, data: img.inlineData.data, prompt });
  } catch (e) {
    console.error('gemini exception', e && e.message);
    await refund();
    return json({ error: 'The preview took too long. Please try again.' }, 504);
  } finally {
    clearTimeout(timer);
  }
}

// Only POST is served; anything else gets a 405 automatically.
