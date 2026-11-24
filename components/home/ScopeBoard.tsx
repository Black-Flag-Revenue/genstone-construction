
type Plan = { label: string; rehab: number; arv: number; weeks: string; verdict: string; extSub: string; intSub: string; ext: string[]; int: string[] };
const PLANS: Plan[] = [
  { label: 'A · RENT-READY', rehab: 38400, arv: 214000, weeks: '4 wk', verdict: 'Numbers support the offer as a hold at $142k.', extSub: '$10.2k', intSub: '$28.2k',
    ext: ['$3,900', '$2,800', '$1,200', '$900', '$800', '$600'], int: ['$9,800', '$6,400', '$5,600', '$2,900', '$2,700', '$800'] },
  { label: 'B · FLIP STANDARD', rehab: 61900, arv: 249000, weeks: '6 wk', verdict: 'Works at $142k. Margin holds above target.', extSub: '$26.7k', intSub: '$35.2k',
    ext: ['$11,800', '$4,200', '$5,600', '$1,900', '$1,400', '$1,800'], int: ['$14,900', '$8,600', '$5,900', '$3,100', '$1,500', '$1,200'] },
  { label: 'C · FULL GUT', rehab: 94500, arv: 279000, weeks: '9 wk', verdict: 'Only works under $128k. Counter or pass.', extSub: '$43.8k', intSub: '$50.7k',
    ext: ['$16,900', '$9,800', '$8,400', '$3,200', '$2,100', '$3,400'], int: ['$21,600', '$12,800', '$6,900', '$3,600', '$3,900', '$1,900'] },
];
const ZN = {
  ext: ['Roof', 'Paint + trim', 'Windows', 'Doors', 'Gutters + fascia', 'Landscaping'],
  int: ['Kitchen', 'Baths', 'Flooring', 'Drywall + paint', 'Mechanicals', 'Doors + trim'],
};
type View = 'ext' | 'int';


export function ScopeBoard() {
  const p = PLANS[1];
  const data = { plans: PLANS, zones: ZN };
  return (
    <div className="board in-3" data-board="">
      <script type="application/json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      <span className="board-corner wedge" aria-hidden="true" />
      <div className="board-head">
        <span className="mono">PRE-OFFER REHAB REVIEW · 3 BD / 1.5 BA RANCH, 1958</span>
        <span className="mono tagx">EXAMPLE</span>
      </div>
      <div role="tablist" aria-label="ARV plans" className="plans">
        {PLANS.map((x, i) => <button key={x.label} type="button" role="tab" aria-selected={i === 1} className={`plan${i === 1 ? ' on' : ''}`}>{x.label}</button>)}
      </div>
      <div className="board-bar">
        <div role="tablist" aria-label="Exterior or interior scope" className="segs">
          <button type="button" role="tab" aria-selected="true" className="seg on" data-view="ext">EXTERIOR <span className="sub">{p.extSub}</span></button>
          <button type="button" role="tab" aria-selected="false" className="seg" data-view="int">INTERIOR <span className="sub">{p.intSub}</span></button>
        </div>
        <span className="mono hint">DRAG TO RENOVATE</span>
      </div>
      <div className="stage">
        <div className="layer" data-view="ext">
          <svg viewBox="0 0 560 330" aria-hidden="true" className="base">
              <path className="bf bx t1" d="M8 292 H552" />
              <path className="bf th dsh" d="M70 190 H490 M70 208 H490 M70 226 H490 M70 244 H490 M70 262 H490 M70 280 H490" />
              <path className="bf bx t1" d="M70 172 V292 M490 172 V292" />
              <path className="bf bx t2" d="M46 172 L128 108 Q204 113 280 120 Q356 113 432 108 L514 172" />
              <path className="bf bx t2" d="M40 172 H246 M262 176 H372 M372 172 L446 192" />
              <path className="bf bx t2" d="M353 110 L348 82 L380 77 L385 109 M356 92 h10 M366 100 h12" />
              <path className="bf bx t3" d="M176 138 l28 -3 l5 15 l-30 4 Z M326 128 l32 3 l-4 17 l-27 -3 Z M236 150 l18 -2 l2 10 l-19 2 Z" />
              <path className="bf fl" d="M108 204 H204 V258 H108 Z" />
              <path className="bf bx t3" d="M102 214 L210 228 M104 250 L208 234 M118 204 L196 258" />
              <path className="bf fl" d="M356 204 H452 V258 H356 Z" />
              <path className="bf bx t3" d="M378 204 l16 26 l-13 9 l20 19 M394 230 l26 -9 M452 222 l-20 8" />
              <path className="bf bx t3" d="M458 208 l13 5 l-9 49 l-13 -5 Z" />
              <path className="bf fl" d="M258 292 V211 L303 206 V292 Z" />
              <path className="bf bx t3" d="M271 228 h17 v21 h-17 Z M274 235 h11 M274 241 h8" />
              <path className="bf bx t4" d="M244 292 v-6 h28 l7 4 h37 v2" />
              <path className="bf bx t4" d="M428 180 l-8 24 l11 13 l-7 27 M96 276 l13 -11 l-3 -13 M318 190 l6 14 l-5 9" />
              <path className="bf bx t4" d="M78 292 l4 -15 l3 12 l5 -20 l3 17 l5 -11 l2 17 M214 292 l3 -12 l4 9 l4 -17 l3 20 M326 292 l4 -18 l3 13 l5 -10 l2 15 M500 292 l4 -22 l3 16 l5 -26 l3 21 l5 -13 l2 24 M22 292 l3 -11 l4 8 l3 -15 l3 18" />
              <path className="bf bx t4" d="M490 178 l12 44 l-4 28" />
            </svg>
            <svg viewBox="0 0 560 330" aria-hidden="true" className="after">
              <path className="af th" d="M8 292 H552" />
              <path className="af th" d="M70 190 H490 M70 208 H490 M70 226 H490 M70 244 H490 M70 262 H490 M70 280 H490" />
              <path className="af" d="M70 172 V292 M490 172 V292" />
              <path className="af" d="M46 172 L128 108 H432 L514 172 Z" />
              <path className="af th" d="M108 124 H452 M87 140 H473 M67 156 H493" />
              <path className="af" d="M40 178 H520 M484 178 V290" />
              <path className="af" d="M352 108 V82 H384 V108 M347 82 H389" />
              <path className="af fl" d="M116 204 H196 V258 H116 Z M362 204 H442 V258 H362 Z" />
              <path className="af" d="M156 204 V258 M116 231 H196 M402 204 V258 M362 231 H442" />
              <path className="ax" d="M100 204 h12 v54 h-12 Z M200 204 h12 v54 h-12 Z M346 204 h12 v54 h-12 Z M446 204 h12 v54 h-12 Z" />
              <path className="ax fl" d="M258 208 H302 V292 H258 Z" />
              <path className="ax" d="M265 216 h30 v26 h-30 Z M265 250 h30 v34 h-30 Z M296 252 v4" />
              <path className="af" d="M314 216 h8 v12 h-8 Z" />
              <path className="af" d="M244 292 v-6 h72 v6" />
              <path className="af" d="M82 292 a15 15 0 0 1 30 0 M112 292 a11 11 0 0 1 22 0 M330 292 a11 11 0 0 1 22 0 M352 292 a16 16 0 0 1 32 0 M440 292 a13 13 0 0 1 26 0" />
              <path className="af" d="M526 292 V258 M508 242 a18 18 0 1 0 36 0 a18 18 0 1 0 -36 0" />
            </svg>
            <svg viewBox="0 0 560 330" role="img" aria-label="Front of a ranch house with six numbered exterior work zones: roof, paint and trim, windows, doors, gutters, landscaping" className="over">
              <path className="zone" data-z="1" d="M70 180 H490 V292 H70 Z" />
              <path className="zone" data-z="0" d="M46 172 L128 108 H432 L514 172 Z" />
              <path className="zone" data-z="2" d="M100 204 H212 V258 H100 Z M346 204 H458 V258 H346 Z" />
              <path className="zone" data-z="3" d="M258 208 H302 V292 H258 Z" />
              <path className="zone" data-z="4" d="M40 168 H520 V181 H40 Z M479 181 H490 V292 H479 Z" />
              <path className="zone" data-z="5" d="M8 268 H70 V297 H8 Z M490 268 H552 V297 H490 Z M70 276 H244 V297 H70 Z M316 276 H479 V297 H316 Z" />
              <g className="pin pd1" data-z="0"><circle cx="280" cy="140" r="11" /><text x="280" y="144" textAnchor="middle">1</text></g>
              <g className="pin pd2" data-z="1"><circle cx="234" cy="232" r="11" /><text x="234" y="236" textAnchor="middle">2</text></g>
              <g className="pin pd3" data-z="2"><circle cx="156" cy="231" r="11" /><text x="156" y="235" textAnchor="middle">3</text><circle cx="402" cy="231" r="11" /><text x="402" y="235" textAnchor="middle">3</text></g>
              <g className="pin pd4" data-z="3"><circle cx="280" cy="250" r="11" /><text x="280" y="254" textAnchor="middle">4</text></g>
              <g className="pin pd5" data-z="4"><circle cx="330" cy="176" r="11" /><text x="330" y="180" textAnchor="middle">5</text></g>
              <g className="pin pd6" data-z="5"><circle cx="36" cy="270" r="11" /><text x="36" y="274" textAnchor="middle">6</text></g>
            </svg>
        </div>
        <div className="layer" data-view="int" hidden>
          <svg viewBox="0 0 560 330" aria-hidden="true" className="base">
              <path className="bf wl" d="M60 40 H500 V290 H60 Z M210 40 V290 M60 165 H210 M210 150 H500 M350 40 V150 M430 40 V150 M430 95 H500 M370 150 V290" />
              <path className="bf dsh" d="M376 156 H494 V284 M376 172 H478 V284" />
              <path className="bf" d="M236 196 q10 -20 30 -10 q20 -6 18 14 q6 18 -16 18 q-22 8 -30 -6 q-8 -8 -2 -16 Z M318 262 q8 -12 20 -6 q10 4 4 14 q-10 8 -20 2 q-6 -4 -4 -10 Z" />
              <path className="bf" d="M356 46 h68 v24 h-68 Z M362 86 q8 -10 20 -4 q12 2 8 14 q-6 12 -20 8 q-12 -4 -8 -18 Z" />
              <path className="bf" d="M442 106 h24 v24 h-24 Z M442 106 l24 24 M466 106 l-24 24" />
              <path className="bf" d="M90 40 l8 18 l-6 10 M150 290 l-6 -16 l9 -9 M60 120 l12 6 l8 -5 M300 40 l-5 14 l7 8" />
              <text className="bt" x="430" y="278" textAnchor="middle">GALLEY KITCHEN</text>
              <text className="bt" x="300" y="250" textAnchor="middle">STAINED CARPET</text>
              <text className="bt" x="390" y="140" textAnchor="middle">LEAKING BATH</text>
              <text className="bt" x="135" y="142" textAnchor="middle">PEELING PAINT</text>
              <text className="bt" x="465" y="144" textAnchor="middle">DEAD FURNACE</text>
            </svg>
            <svg viewBox="0 0 560 330" aria-hidden="true" className="after">
              <path className="af wl" d="M60 40 H500 V290 H60 Z M210 40 V290 M60 165 H210 M210 150 H500 M350 40 V150 M430 40 V150 M430 95 H500" />
              <path className="af th" d="M214 172 H496 M214 194 H496 M214 216 H496 M214 238 H496 M214 260 H496" />
              <path className="ax" d="M384 156 H494 V284 M384 172 H478 V284 M420 159 h18 v10 h-18 Z" />
              <path className="ax fl" d="M392 226 h52 v24 h-52 Z" />
              <path className="af" d="M356 46 h68 v24 h-68 Z M362 52 h56 v12 h-56 Z M356 126 h40 v18 h-40 Z M405 135 a7 7 0 1 0 14 0 a7 7 0 1 0 -14 0" />
              <path className="af" d="M443 62 a7 7 0 1 0 14 0 a7 7 0 1 0 -14 0 M476 48 h16 v14 h-16 Z" />
              <path className="ax" d="M440 104 h22 v22 h-22 Z M470 136 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0" />
              <path className="af th" d="M150 40 V70 H210 M150 290 V260 H210 M300 40 V66 H350" />
              <path className="ax" d="M280 290 v-26 a26 26 0 0 1 26 26" />
              <text className="bt lt" x="430" y="278" textAnchor="middle">OPEN KITCHEN</text>
              <text className="bt lt" x="300" y="252" textAnchor="middle">NEW LVP FLOOR</text>
              <text className="bt lt" x="390" y="118" textAnchor="middle">NEW BATH</text>
              <text className="bt lt" x="135" y="142" textAnchor="middle">FRESH PAINT</text>
            </svg>
            <svg viewBox="0 0 560 330" role="img" aria-label="Floor plan of a three bedroom ranch with six numbered interior work zones: kitchen, baths, flooring, drywall and paint, mechanicals, doors and trim" className="over">
              <path className="zone" data-z="0" d="M370 150 H500 V290 H370 Z" />
              <path className="zone" data-z="1" d="M350 40 H430 V150 H350 Z M430 40 H500 V95 H430 Z" />
              <path className="zone" data-z="2" d="M210 150 H370 V290 H210 Z" />
              <path className="zone" data-z="3" d="M60 40 H210 V290 H60 Z" />
              <path className="zone" data-z="4" d="M430 95 H500 V150 H430 Z" />
              <path className="zone" data-z="5" d="M210 40 H350 V150 H210 Z" />
              <text className="bt" x="100" y="62" textAnchor="middle">BED 1</text>
              <text className="bt" x="100" y="188" textAnchor="middle">BED 2</text>
              <text className="bt" x="250" y="134" textAnchor="middle">BED 3</text>
              <text className="bt" x="246" y="278" textAnchor="middle">LIVING</text>
              <g className="pin pd1" data-z="0"><circle cx="435" cy="198" r="11" /><text x="435" y="202" textAnchor="middle">1</text></g>
              <g className="pin pd2" data-z="1"><circle cx="408" cy="96" r="11" /><text x="408" y="100" textAnchor="middle">2</text></g>
              <g className="pin pd3" data-z="2"><circle cx="318" cy="216" r="11" /><text x="318" y="220" textAnchor="middle">3</text></g>
              <g className="pin pd4" data-z="3"><circle cx="135" cy="105" r="11" /><text x="135" y="109" textAnchor="middle">4</text></g>
              <g className="pin pd5" data-z="4"><circle cx="484" cy="112" r="11" /><text x="484" y="116" textAnchor="middle">5</text></g>
              <g className="pin pd6" data-z="5"><circle cx="280" cy="90" r="11" /><text x="280" y="94" textAnchor="middle">6</text></g>
            </svg>
        </div>
        <span className="mono stag" style={{ left: 0 }} aria-hidden="true">RENOVATED</span>
        <span className="mono stag" style={{ right: 0 }} aria-hidden="true">AS-IS</span>
        <div className="hdl" aria-hidden="true"><span className="knob"><svg width="20" height="12" viewBox="0 0 20 12" fill="none" stroke="#0B0D0E" strokeWidth="2"><path d="M6 1 L1 6 L6 11 M14 1 L19 6 L14 11" /></svg></span></div>
        <input className="rng" type="range" min={0} max={100} step={1} defaultValue={55} aria-label="Drag to compare the house as-is with the renovated house" />
      </div>
      <div className="lines swap-b">
        {ZN.ext.map((n, i) => (
          <button key={n} type="button" className="leg"><span className="k">{i + 1}</span><span className="nm">{n}</span><span className="c">{p.ext[i]}</span></button>
        ))}
      </div>
      <div className="totals">
        <div><span className="mono">REHAB</span><b data-rehab="">$61.9k</b></div>
        <div><span className="mono">ARV</span><b className="acc" data-arv="">$249k</b></div>
        <div><span className="mono">BUILD</span><b data-weeks="">{p.weeks}</b></div>
      </div>
      <div className="verdict"><span className="wedge" aria-hidden="true" /><span data-verdict="" className="swap-b">{p.verdict}</span></div>
    </div>
  );
}
