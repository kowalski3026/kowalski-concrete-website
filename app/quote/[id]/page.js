import { notFound } from 'next/navigation';
import { redis, redisConf, firstName, BIZ_PHONE } from '../../lib/kc';
import { CSS, LOGO } from '../../lib/ui';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Your Quote | Kowalski Concrete Contracting', robots: { index: false, follow: false } };

export default async function QuotePage({ params }) {
  const id = String(params.id || '');
  if (!/^[a-f0-9]{16}$/.test(id) || !redisConf()) notFound();
  let lead = null;
  try { const raw = (await redis([['GET', 'lead:' + id]]))[0]; lead = raw ? JSON.parse(raw) : null; } catch (e) {}
  if (!lead) notFound();
  const tel = BIZ_PHONE.replace(/\D/g, '');
  return (
    <div className="kc">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="wrap">
        <div className="top">
          <a href="/"><img src={LOGO} alt="Kowalski Concrete Contracting Inc." width="760" height="180" style={{ height: 44, width: 'auto', display: 'block' }} /></a>
          <a className="tel" href={'tel:' + tel}>{BIZ_PHONE}</a>
        </div>
        <h1>Thanks, <span>{firstName(lead.name)}.</span></h1>
        <p className="sub">Here is the summary of your request. We will call to book your free site visit.</p>

        <section className="step">
          <h2>Your project</h2>
          <p style={{ margin: 0 }}>{lead.project || 'Concrete project'}</p>
          {lead.price_range ? (<>
            <div className="meta" style={{ marginTop: 14 }}>Ballpark range</div>
            <div className="big">{lead.price_range}</div>
          </>) : null}
          <p className="fine">A ballpark only. Final pricing depends on access, grading, base conditions and finish details, and is confirmed in writing after the site visit.</p>
        </section>

        <section className="step">
          <h2>What happens next</h2>
          <ol>
            <li>We call or text you to set a time for a free site visit.</li>
            <li>We measure, check access and the base, and talk through options.</li>
            <li>You get a written quote with the exact price. No pressure.</li>
          </ol>
        </section>

        <a className="btn" href={'tel:' + tel}>Call {BIZ_PHONE}</a>
        <a className="btn ghost" href={'sms:' + tel}>Text us</a>
        <a className="btn ghost" href="/instant-quote.html">Price another project</a>
        <p className="fine" style={{ marginTop: 18 }}>Kowalski Concrete Contracting Inc. &middot; Innisfil, Simcoe County &amp; Muskoka</p>
      </div>
    </div>
  );
}
