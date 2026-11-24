import { Honeypot, Submit } from './LeadForm';

export function ContactForms() {
  return (
    <form className="form" data-lead="Website contact" data-ok="Thanks. Our team will get back to you shortly." data-tabs="">
      <div role="tablist" aria-label="I am a…" className="segs">
        <button type="button" role="tab" aria-selected="true" className="seg on" data-panel="cf-inv">I AM AN INVESTOR</button>
        <button type="button" role="tab" aria-selected="false" className="seg" data-panel="cf-con">I AM A CONTRACTOR</button>
      </div>
      <div className="frow">
        <label>Name<input className="field" name="name" autoComplete="name" required /></label>
        <label>Company<input className="field" name="company" autoComplete="organization" /></label>
      </div>
      <div className="frow">
        <label>Email<input className="field" type="email" name="email" autoComplete="email" required /></label>
        <label>Phone<input className="field" type="tel" name="phone" autoComplete="tel" /></label>
      </div>
      <div id="cf-inv" className="frow" role="tabpanel">
        <input type="hidden" name="who" value="Investor" />
        <label>Property address (if you have one)<input className="field" name="address" /></label>
        <label>I&rsquo;m looking for
          <select className="field" name="topic" defaultValue="Pre-Offer Rehab Review">
            <option>Pre-Offer Rehab Review</option><option>Renovation on a property I own</option><option>FHA 203(k) renovation</option><option>Portfolio / institutional work</option><option>Something else</option>
          </select>
        </label>
      </div>
      <div id="cf-con" className="frow" role="tabpanel" hidden>
        <input type="hidden" name="who" value="Contractor" disabled />
        <label>Trade / license type<input className="field" name="trade" placeholder="GC, roofing, HVAC…" disabled /></label>
        <label>Markets you cover<input className="field" name="markets" placeholder="City, county or metro" disabled /></label>
      </div>
      <label>Message<textarea className="field" name="message" required /></label>
      <Honeypot />
      <Submit label="Send message" />
    </form>
  );
}

const DOCS = [
  ['license', 'General contractor license'], ['coi', 'Certificate of insurance'], ['wc', 'Workers’ comp certificate or waiver'],
  ['w9', 'Completed current W-9'], ['nda', 'Signed mutual NDA'],
] as const;

export function ContractorApplication() {
  return (
    <form className="form" data-lead="Contractor application" data-ok="Application received. Our contractor team will review it and follow up about screening and onboarding." aria-label="Contractor application">
      <div className="frow"><label>Company name<input className="field" name="company" autoComplete="organization" required /></label><label>Contact name<input className="field" name="name" autoComplete="name" required /></label></div>
      <div className="frow"><label>Email<input className="field" type="email" name="email" autoComplete="email" required /></label><label>Phone<input className="field" type="tel" name="phone" autoComplete="tel" required /></label></div>
      <div className="frow"><label>Business address<input className="field" name="address" autoComplete="street-address" /></label><label>Years in business<input className="field" name="years" inputMode="numeric" /></label></div>
      <div className="frow"><label>Trades / services<input className="field" name="trades" placeholder="General contracting, roofing, HVAC…" required /></label><label>Markets served<input className="field" name="markets" placeholder="Cities, counties or metros" required /></label></div>
      <div className="frow"><label>License number(s)<input className="field" name="licenseNumbers" /></label><label>Crew size<input className="field" name="crew" inputMode="numeric" /></label></div>
      <fieldset style={{ border: '1px solid var(--line2)', padding: '18px 18px 8px', margin: 0 }}>
        <legend className="mono" style={{ fontSize: 12, padding: '0 8px', color: 'var(--mute3)' }}>REQUIRED DOCUMENTS (PDF/JPG, 3.5 MB TOTAL)</legend>
        {DOCS.map(([k, l]) => <label key={k} style={{ marginBottom: 12 }}>{l}<input className="field" style={{ paddingTop: 12 }} type="file" name={k} accept=".pdf,.jpg,.jpeg,.png" /></label>)}
      </fieldset>
      <label>Anything else we should know?<textarea className="field" name="notes" /></label>
      <Honeypot />
      <Submit label="Submit application" />
    </form>
  );
}
