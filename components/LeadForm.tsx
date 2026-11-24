const STRATS = ['Fix & Flip', 'BRRRR', 'Rental portfolio', 'Small multifamily (2–4 units)', 'FHA 203(k)', 'REO / bank-owned', 'Rental turn', 'Institutional / servicer', 'Other'];

export const Honeypot = () => <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }} />;
export const Submit = ({ label }: { label: string }) => (
  <>
    <button type="submit" className="btn btn-acc" style={{ justifyContent: 'space-between' }}>{label} <span className="arr" aria-hidden="true">→</span></button>
    <p className="ferr" role="alert" hidden />
  </>
);

/** Server-rendered; site.js posts it to /api/lead. */
export function LeadForm({ kind = 'Pre-Offer Rehab Review' }: { kind?: string }) {
  return (
    <form className="form" data-lead={kind} data-ok="Got it. An estimator will reach out shortly. If the deal is time-sensitive, call (312) 429-2637." aria-label={`Request a ${kind}`}>
      <label>Property address<input className="field" name="address" type="text" placeholder="Street, city, state" autoComplete="street-address" required /></label>
      <div className="frow">
        <label>Your offer or purchase price<input className="field" name="price" type="text" inputMode="numeric" placeholder="$" /></label>
        <label>Strategy<select className="field" name="strategy" defaultValue="Fix & Flip">{STRATS.map((s) => <option key={s}>{s}</option>)}</select></label>
      </div>
      <div className="frow">
        <label>Name<input className="field" name="name" type="text" autoComplete="name" required /></label>
        <label>Phone<input className="field" name="phone" type="tel" autoComplete="tel" required /></label>
      </div>
      <label>Email<input className="field" name="email" type="email" autoComplete="email" /></label>
      <label>Anything we should know?<textarea className="field" name="notes" placeholder="Condition, photos link, closing date, finish level you’re considering…" /></label>
      <Honeypot />
      <Submit label="Get my free review" />
    </form>
  );
}
