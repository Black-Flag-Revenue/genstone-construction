import Link from '@/components/A';
import { Arrow } from './ui';
import { ArvCalculator } from './ArvCalculator';
import { SITE } from '@/lib/site';
import { listGuides } from '@/lib/content';

export function ResourceCards() {
  const guides = listGuides();
  return (
    <section className="sec-s light">
      <div className="wrap">
        <div className="grid-4" data-rv="stag">
          <Link className="card" href="/investor-resources/arv-calculator/"><span className="k">TOOL</span><h3>ARV Calculator</h3><p>Estimate after-repair value, your maximum bid and gross return.</p><span className="go">Open →</span></Link>
          <Link className="card" href="/investor-resources/financing/"><span className="k">FINANCING</span><h3>Investor financing</h3><p>DSCR, fix-and-flip, lines of credit and construction loans through Genstone Financial.</p><span className="go">Explore →</span></Link>
          <Link className="card" href="/investor-faqs/"><span className="k">FAQ</span><h3>Investor FAQs</h3><p>Scopes, schedules, draws, permits, change orders, warranties and more.</p><span className="go">Read →</span></Link>
          <Link className="card" href="/guides/"><span className="k">{guides.length} GUIDES</span><h3>Investor guides</h3><p>Rehab estimating, ARV, BRRRR, 203(k), REO, permits, draws and more.</p><span className="go">Browse →</span></Link>
        </div>
      </div>
    </section>
  );
}

export function FinancingBand() {
  return (
    <section className="sec-s ink3">
      <div className="wrap row" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ maxWidth: 680 }}>
          <p className="eyebrow">Genstone Financial</p>
          <h2 className="h3">DSCR rental loans · Fix &amp; flip loans · Lines of credit · New construction loans</h2>
        </div>
        <a className="btn btn-acc" href={SITE.financingUrl} rel="noopener" target="_blank">Explore investor loan programs <Arrow /></a>
      </div>
    </section>
  );
}

export function CalcBand() {
  return (
    <section className="sec-s" style={{ paddingTop: 0 }} id="calculator">
      <div className="wrap"><ArvCalculator /></div>
    </section>
  );
}

export function ContractorBand() {
  return (
    <section className="sec-s ink3">
      <div className="wrap row" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ maxWidth: 680 }}>
          <p className="eyebrow">Join the network</p>
          <h2 className="h3">Review the requirements, submit your application, complete screening and onboarding, then start receiving project opportunities.</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 300 }}>
          <Link className="btn btn-acc" href="/contractor-application/" style={{ justifyContent: 'space-between' }}>Contractor application <Arrow /></Link>
          <Link className="btn btn-ghost" href="/contractors/pre-application-check-list/" style={{ justifyContent: 'space-between' }}>Pre-application checklist <Arrow /></Link>
        </div>
      </div>
    </section>
  );
}
