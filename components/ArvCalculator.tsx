const F = ({ name, label, ph = '$', def }: { name: string; label: string; ph?: string; def?: string }) => (
  <label>{label}<input className="field" name={name} inputMode="numeric" placeholder={ph} defaultValue={def} /></label>
);

/** Server-rendered calculator; site.js does the math. */
export function ArvCalculator() {
  return (
    <form className="calc" data-calc="" onSubmit={undefined} aria-label="After repair value calculator">
      <div className="calc-in">
        <fieldset>
          <legend className="mono">1 · AFTER REPAIR VALUE</legend>
          <div className="segs" role="radiogroup" aria-label="Estimation method" style={{ flexWrap: 'wrap', marginBottom: 16 }}>
            <button type="button" role="radio" aria-checked="true" className="seg on" data-method="comps">RENOVATED COMPS</button>
            <button type="button" role="radio" aria-checked="false" className="seg" data-method="sqft">PRICE PER SQ FT</button>
            <button type="button" role="radio" aria-checked="false" className="seg" data-method="valueadd">AS-IS + VALUE ADD</button>
          </div>
          <div className="frow" data-mgroup="comps"><F name="comp1" label="Comp 1 sale price" /><F name="comp2" label="Comp 2" /><F name="comp3" label="Comp 3" /></div>
          <div className="frow" data-mgroup="sqft" hidden><F name="ppsf" label="Renovated comps, $ per sq ft" /><F name="sqft" label="Livable sq ft after remodel" ph="" /></div>
          <div className="frow" data-mgroup="valueadd" hidden><F name="asIs" label="As-is market value" /><F name="lift" label="Appraised lift from the work" /></div>
        </fieldset>
        <fieldset><legend className="mono">2 · REPAIR BUDGET</legend><F name="repair" label="Total rehab cost — materials, labor, permits" /></fieldset>
        <fieldset><legend className="mono">3 · YOUR OFFER RULE</legend><F name="rule" label="Share of ARV you’ll spend all-in (%)" ph="" def="70" /></fieldset>
        <fieldset><legend className="mono">4 · PURCHASE PRICE</legend><F name="price" label="Leave blank to use the maximum bid" /></fieldset>
      </div>
      <div className="calc-out" aria-live="polite">
        <div><span className="mono">AFTER REPAIR VALUE</span><b data-out="arv">—</b><small>Estimated market value once renovations are complete.</small></div>
        <div className="hl2"><span className="mono">MAXIMUM BID</span><b data-out="max">—</b><small><span data-out="rule">70%</span> of ARV, less your repair budget.</small></div>
        <div><span className="mono">GROSS PROFIT</span><b data-out="profit">—</b><small>ARV minus purchase price and repairs.</small></div>
        <div><span className="mono">RETURN ON INVESTMENT</span><b data-out="roi">—</b><small>Gross profit over purchase plus repairs.</small></div>
        <p className="fnote">Estimates only. Closing, financing and holding costs, commissions and taxes all reduce the real return. Want real repair numbers? Get a free Pre-Offer Rehab Review.</p>
      </div>
    </form>
  );
}
