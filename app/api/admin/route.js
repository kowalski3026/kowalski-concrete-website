// Admin API for Kris: list/update leads, create jobs, upload job photos. Header x-admin-key = ADMIN_PASSWORD.
import { json, redis, redisConf, adminOk, clean, newId, SITE } from '../../lib/kc';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const parse = (s) => { try { return JSON.parse(s); } catch (e) { return null; } };

export async function POST(request) {
  if (!process.env.ADMIN_PASSWORD) return json({ error: 'ADMIN_PASSWORD is not set in Vercel.' }, 503);
  if (!adminOk(request)) { await new Promise((r) => setTimeout(r, 600)); return json({ error: 'Wrong password.' }, 401); }
  if (!redisConf()) return json({ error: 'Redis is not configured.' }, 503);
  let b; try { b = await request.json(); } catch (e) { return json({ error: 'Bad request.' }, 400); }

  try {
    switch (b.action) {
      case 'login': return json({ ok: true });

      case 'leads': {
        const ids = (await redis([['ZREVRANGE', 'leads:all', 0, 59]]))[0] || [];
        if (!ids.length) return json({ leads: [] });
        const rows = await redis(ids.map((id) => ['GET', 'lead:' + id]));
        const leads = rows.map(parse).filter(Boolean).map((l) => ({
          id: l.id, at: l.at, name: l.name, phone: l.phone, email: l.email, address: l.address, project: l.project,
          price_range: l.price_range, notes: l.notes, status: l.status, consent: l.consent, stopped: l.stopped,
          replied: l.replied, step: l.step || 0, link: SITE + '/quote/' + l.id,
        }));
        return json({ leads });
      }

      case 'setStatus': {
        const id = String(b.id || ''); const status = ['new', 'booked', 'lost'].includes(b.status) ? b.status : null;
        if (!/^[a-f0-9]{16}$/.test(id) || !status) return json({ error: 'Bad request.' }, 400);
        const lead = parse((await redis([['GET', 'lead:' + id]]))[0]);
        if (!lead) return json({ error: 'Not found.' }, 404);
        lead.status = status;
        const cmds = [['SET', 'lead:' + id, JSON.stringify(lead)]];
        if (status !== 'new') cmds.push(['ZREM', 'leads:due', id]);
        await redis(cmds);
        return json({ ok: true });
      }

      case 'jobCreate': {
        const job = {
          id: newId(), ts: Date.now(),
          type: clean(b.type, 60), city: clean(b.city, 60), date: /^\d{4}-\d{2}-\d{2}$/.test(b.date || '') ? b.date : '',
          finish: clean(b.finish, 60), thickness: clean(b.thickness, 40), mix: clean(b.mix, 120), area: clean(b.area, 40),
          notes: clean(b.notes, 400), referral: clean(b.referral, 300), photos: 0,
        };
        await redis([['SET', 'job:' + job.id, JSON.stringify(job)], ['ZADD', 'jobs:all', job.ts, job.id]]);
        return json({ ok: true, id: job.id, url: SITE + '/job/' + job.id });
      }

      case 'jobs': {
        const ids = (await redis([['ZREVRANGE', 'jobs:all', 0, 59]]))[0] || [];
        if (!ids.length) return json({ jobs: [] });
        const rows = await redis(ids.map((id) => ['GET', 'job:' + id]));
        return json({ jobs: rows.map(parse).filter(Boolean).map((j) => ({ ...j, url: SITE + '/job/' + j.id })) });
      }

      case 'photo': {
        const id = String(b.id || ''); const data = String(b.data || '');
        if (!/^[a-f0-9]{16}$/.test(id) || !/^[A-Za-z0-9+/=]+$/.test(data) || data.length < 100 || data.length > 900000) return json({ error: 'Bad photo.' }, 400);
        const job = parse((await redis([['GET', 'job:' + id]]))[0]);
        if (!job) return json({ error: 'Job not found.' }, 404);
        if ((job.photos || 0) >= 8) return json({ error: 'Max 8 photos per job.' }, 400);
        const n = job.photos || 0; job.photos = n + 1;
        await redis([['SET', 'jobphoto:' + id + ':' + n, data], ['SET', 'job:' + id, JSON.stringify(job)]]);
        return json({ ok: true, n });
      }

      default: return json({ error: 'Unknown action.' }, 400);
    }
  } catch (e) { console.error('admin', e && e.message); return json({ error: 'Server error.' }, 500); }
}
