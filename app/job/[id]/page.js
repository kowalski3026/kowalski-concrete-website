import { notFound } from 'next/navigation';
import { redis, redisConf, BIZ_PHONE } from '../../lib/kc';
import { CSS, LOGO } from '../../lib/ui';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Your Concrete Job | Kowalski Concrete Contracting', robots: { index: false, follow: false } };

const REVIEW_URL = process.env.GOOGLE_REVIEW_URL || 'https://g.page/r/CbL8fK0xzQQNEBI/review';
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function addDays(iso, n) {
  const d = new Date(iso + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n);
  return MONTHS[d.getUTCMonth()] + ' ' + d.getUTCDate();
}
function pretty(iso) { const d = new Date(iso + 'T12:00:00Z'); return MONTHS[d.getUTCMonth()] + ' ' + d.getUTCDate() + ', ' + d.getUTCFullYear(); }

export default async function JobPage({ params }) {
  const id = String(params.id || '');
  if (!/^[a-f0-9]{16}$/.test(id) || !redisConf()) notFound();
  let job = null;
  try { const raw = (await redis([['GET', 'job:' + id]]))[0]; job = raw ? JSON.parse(raw) : null; } catch (e) {}
  if (!job) notFound();
  const tel = BIZ_PHONE.replace(/\D/g, '');
  const hasDate = /^\d{4}-\d{2}-\d{2}$/.test(job.date || '');
  const specs = [
    ['Project', job.type], ['Location', job.city], ['Poured', hasDate ? pretty(job.date) : ''],
    ['Finish', job.finish], ['Thickness', job.thickness], ['Concrete mix', job.mix], ['Size', job.area],
  ].filter((r) => r[1]);
  const photos = Array.from({ length: job.photos || 0 }, (_, i) => i);

  return (
    <div className="kc">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="wrap">
        <div className="top">
          <a href="/"><img src={LOGO} alt="Kowalski Concrete Contracting Inc." width="760" height="180" style={{ height: 44, width: 'auto', display: 'block' }} /></a>
          <a className="tel" href={'tel:' + tel}>{BIZ_PHONE}</a>
        </div>
        <h1>{job.type ? <>Your <span>{job.type.toLowerCase()}</span></> : <>Your <span>concrete</span></>}</h1>
        <p className="sub">Everything about this job in one place: what went in, how to look after it, and how to reach us.</p>

        {photos.length > 0 && (
          <section className="step">
            <h2>Photos</h2>
            <div className="gal">
              {photos.map((i) => <img key={i} src={'/api/job-photo/' + id + '/' + i} alt={'Job photo ' + (i + 1)} loading="lazy" />)}
            </div>
          </section>
        )}

        {specs.length > 0 && (
          <section className="step">
            <h2>Job details</h2>
            <table><tbody>{specs.map((r) => <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td></tr>)}</tbody></table>
            {job.notes ? <p style={{ marginTop: 12, marginBottom: 0 }}>{job.notes}</p> : null}
          </section>
        )}

        <section className="step">
          <h2>Caring for your concrete</h2>
          {hasDate ? (
            <table><tbody>
              <tr><td>Walking</td><td>From {addDays(job.date, 2)}</td></tr>
              <tr><td>Cars</td><td>From {addDays(job.date, 7)}</td></tr>
              <tr><td>Heavy loads</td><td>From {addDays(job.date, 28)} (delivery trucks, RVs, equipment)</td></tr>
            </tbody></table>
          ) : null}
          <ul style={{ marginTop: 14 }}>
            <li>Skip de-icing salt through your first winter. Use sand and a plastic shovel. Fertilizer-based ice melters can damage new concrete.</li>
            <li>Hairline cracks along the cut joints are normal. The joints are there to guide them.</li>
            <li>Keep an eye on drainage. Water should run off, not sit.</li>
            <li>Sealing is a good idea, especially for exposed aggregate and stamped work. Ask us when.</li>
          </ul>
        </section>

        <section className="step">
          <h2>Happy with the work?</h2>
          <p>A quick Google review helps other Simcoe County homeowners find us. It takes about a minute.</p>
          <a className="btn" href={REVIEW_URL} rel="noopener">Leave a Google review</a>
        </section>

        <section className="step">
          <h2>Know someone who needs concrete?</h2>
          <p>{job.referral ? job.referral : 'Neighbours, friends and family are most of our work. If you send someone our way, tell us who sent them and we will take care of you.'}</p>
          <a className="btn ghost" href="/instant-quote.html">Share: instant price range</a>
        </section>

        <a className="btn ghost" href={'tel:' + tel}>Call {BIZ_PHONE}</a>
        <p className="fine" style={{ marginTop: 18 }}>Kowalski Concrete Contracting Inc. &middot; Innisfil, Simcoe County &amp; Muskoka. Care timings are general guidance for a standard residential pour. Follow any specific instructions we gave you in person.</p>
      </div>
    </div>
  );
}
