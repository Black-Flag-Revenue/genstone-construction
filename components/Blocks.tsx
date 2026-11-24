import Link from '@/components/A';
import { Arrow, Img, Lines } from './ui';
import { LeadForm } from './LeadForm';
import { SITE, SERVICES } from '@/lib/site';
import { STATES } from '@/lib/content';

export function PageHero({ crumbs, eyebrow, title, lede, image, imageAlt, children, facts }: {
  crumbs?: React.ReactNode; eyebrow?: string; title: string; lede?: string; image?: string; imageAlt?: string;
  children?: React.ReactNode; facts?: string[];
}) {
  return (
    <section className="phero">
      <div className="hw wedge" aria-hidden="true" />
      <div className="wrap">
        {crumbs}
        <div className={image ? 'phero-grid' : ''}>
          <div>
            {eyebrow && <p className="eyebrow in-1">{eyebrow}</p>}
            <h1 className="h1-s hl"><Lines text={title} /></h1>
            {lede && <p className="lede in-2">{lede}</p>}
            {children ?? (
              <div className="btns in-2">
                <Link className="btn btn-acc" href="#review">Get a free Pre-Offer Rehab Review <Arrow /></Link>
                <a className="btn btn-ghost" href={SITE.phoneHref}>Call {SITE.phone} <Arrow /></a>
              </div>
            )}
            {facts && <div className="facts in-2">{facts.map((f) => <span key={f}>{f}</span>)}</div>}
          </div>
          {image && <div className="phero-img in-3"><Img name={image} alt={imageAlt || ''} priority sizes="(max-width: 980px) 100vw, 44vw" /></div>}
        </div>
      </div>
    </section>
  );
}

export function Strip() {
  return (
    <section aria-label="Credentials" className="strip">
      <div className="wrap" data-rv="stag">
        <div><b>Inc. 5000</b><span>America&rsquo;s fastest-growing private companies, two years in a row</span></div>
        <div><b>FHA 203(k)</b><span>Certified contractor for renovation loans</span></div>
        <div><b>GSE preferred</b><span>Preferred contractor for Government-Sponsored Enterprises</span></div>
        <div><b>Best of Houzz</b><span>2025 Service award</span></div>
      </div>
    </section>
  );
}

export function Process() {
  const steps = [
    ['Free Pre-Offer Rehab Review', 'Repair costs estimated, ARV refined and the deal checked against your offer before you commit capital.'],
    ['Scope + multiple ARV plans', 'A detailed scope with labor, materials and a draw schedule, with more than one finish level so you choose the spend that fits the exit.'],
    ['One field manager, start to finish', 'A designated field manager runs your project and your crews. Permits, inspections and lien waivers are handled inside the process.'],
    ['Pay as work is completed', 'No upfront payment. Draws are tied to completed work, and final payment comes after completion and your approval.'],
  ];
  return (
    <div className="proc" data-rv="proc">
      <div className="pline" aria-hidden="true" />
      {steps.map(([t, d], i) => (
        <div className="step" key={t}>
          <div className="node">{String(i + 1).padStart(2, '0')}</div>
          <h3>{t}</h3>
          <p>{d}</p>
        </div>
      ))}
    </div>
  );
}

export function Marquee() {
  const items = ['Individual investors', 'Mortgage servicers', 'REITs & investment funds', 'Banks & REO lenders', 'Government-Sponsored Enterprises'];
  const row = (hidden: boolean) => items.map((t) => (
    <span key={t + hidden} style={{ display: 'contents' }}><span aria-hidden={hidden || undefined}>{t}</span><i aria-hidden="true" /></span>
  ));
  return (
    <section className="marq-wrap" aria-label="Who we work for">
      <div className="marq">{row(false)}{row(true)}</div>
    </section>
  );
}

export function ServiceCards({ exclude, light = false, base }: { exclude?: string; light?: boolean; base?: string }) {
  const list = SERVICES.filter((s) => s.key !== exclude && (!base || s.combo));
  return (
    <div className="grid-3" data-rv="stag">
      {list.map((s) => (
        <Link key={s.key} className="card card-img" href={base ? `${base}${s.key}/` : `/${s.key}/`}>
          <div className="ci"><Img name={s.image} alt="" sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 400px" /></div>
          <div className="cb">
            <span className="k">{s.short.toUpperCase()}</span>
            <h3>{s.name}</h3>
            <p>{s.blurb}</p>
            <span className="go">Learn more →</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

/* Tile cartogram of the U.S. — col,row per state. */
const TILE: Record<string, [number, number]> = {
  AK: [0, 0], ME: [11, 0], VT: [10, 1], NH: [11, 1], WI: [6, 1],
  WA: [1, 2], ID: [2, 2], MT: [3, 2], ND: [4, 2], MN: [5, 2], IL: [6, 2], MI: [7, 2], NY: [9, 2], MA: [10, 2],
  OR: [1, 3], NV: [2, 3], WY: [3, 3], SD: [4, 3], IA: [5, 3], IN: [6, 3], OH: [7, 3], PA: [8, 3], NJ: [9, 3], CT: [10, 3], RI: [11, 3],
  CA: [1, 4], UT: [2, 4], CO: [3, 4], NE: [4, 4], MO: [5, 4], KY: [6, 4], WV: [7, 4], VA: [8, 4], MD: [9, 4], DE: [10, 4],
  AZ: [2, 5], NM: [3, 5], KS: [4, 5], AR: [5, 5], TN: [6, 5], NC: [7, 5], SC: [8, 5], DC: [9, 5],
  OK: [4, 6], LA: [5, 6], MS: [6, 6], AL: [7, 6], GA: [8, 6],
  HI: [0, 7], TX: [4, 7], FL: [9, 7],
};
export function TileMap({ current }: { current?: string }) {
  const served = new Map(STATES.map((s) => [s.abbr, s]));
  const cells = Object.entries(TILE);
  return (
    <>
      <div className="tmap" data-rv="tiles" role="list" aria-label="States Genstone Construction serves">
        {Array.from({ length: 8 * 12 }).map((_, idx) => {
          const col = idx % 12, row = Math.floor(idx / 12);
          const hit = cells.find(([, [c, r]]) => c === col && r === row);
          if (!hit) return <span key={idx} aria-hidden="true" />;
          const [ab] = hit;
          const st = served.get(ab);
          return st ? (
            <a key={ab} role="listitem" className={`tile${current === st.slug ? ' cur' : ''}`} href={`/service-area/${st.slug}/`} title={`${st.name} renovation contractor`} aria-label={st.name}>{ab}</a>
          ) : <span key={ab} className="tile" aria-hidden="true">{ab}</span>;
        })}
      </div>
      <div className="legend"><span><i style={{ background: 'var(--acc)' }} />Active footprint — click a state</span><span><i style={{ background: '#1C2124' }} />Ask us</span></div>
    </>
  );
}

export function Cta({ title = 'Send the address. | Get the real | number.', text }: { title?: string; text?: string }) {
  return (
    <section id="review" className="cta">
      <div className="cw" aria-hidden="true" />
      <div className="wrap">
        <div style={{ flex: '1 1 480px', minWidth: 0 }}>
          <h2 data-rv="mask"><Lines text={title} /></h2>
          <p data-rv="up">{text || 'The Pre-Offer Rehab Review is free. You get repair costs, a refined ARV and a straight answer on whether the deal works at your price.'}</p>
          <a className="ph" href={SITE.phoneHref}>{SITE.phone}</a>
        </div>
        <div style={{ flex: '0 1 500px', minWidth: 0, width: '100%' }} data-rv="up">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
