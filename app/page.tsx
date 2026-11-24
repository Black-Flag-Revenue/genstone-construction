import Link from '@/components/A';
import type { Metadata } from 'next';
import { Arrow, Img, Lines, JsonLd } from '@/components/ui';
import { Strip, Process, Marquee, TileMap, Cta } from '@/components/Blocks';
import { ScopeBoard } from '@/components/home/ScopeBoard';
import { StrategyTabs, type Strat } from '@/components/home/StrategyTabs';
import { SITE, abs } from '@/lib/site';
import { STATES, listGuides } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Renovation Contractor for Real Estate Investors | Genstone Construction',
  description: 'Know the rehab before you make the offer. Free Pre-Offer Rehab Review, detailed scopes and one field manager for fix and flip, BRRRR, rentals, REO and 203(k).',
  alternates: { canonical: abs('/') },
  openGraph: { url: abs('/'), title: 'Genstone Construction | Renovation Contractor for Investors' },
};

const STRATS: Strat[] = [
  { num: '01', name: 'Fix & Flip', tag: 'FIX & FLIP', href: '/fix-flip/', head: 'Spend where buyers look. Skip where they don’t.',
    body: 'Flip margins live or die on scope discipline and days on market. We price finishes against your ARV, build to the comps and keep the schedule tight so carrying costs don’t eat the spread.',
    points: ['Finish level matched to neighborhood comps', 'Schedule built around your listing date', 'Change orders priced before work starts'], cta: 'Fix & flip renovations' },
  { num: '02', name: 'BRRRR', tag: 'BUY · REHAB · RENT · REFINANCE · REPEAT', href: '/brrrr/', head: 'Renovate to the appraisal you need for the refi.',
    body: 'The refinance is the whole game. We scope to the value that gets your capital back out, using durable rental-grade materials that keep turnover costs low once the tenant moves in.',
    points: ['Scope aimed at the refinance appraisal', 'Rental-grade, low-maintenance materials', 'Tenant-ready handoff to property management'], cta: 'BRRRR renovations' },
  { num: '03', name: 'Single-family rentals', tag: 'SINGLE-FAMILY RENTALS', href: '/rental-renovation/', head: 'Rent-ready, then built to last between turns.',
    body: 'For portfolio holders and funds, consistency matters more than flash. Repeatable scopes, predictable costs and a field manager who knows your standards on house number one and house number fifty.',
    points: ['Standardized scopes across your portfolio', 'Durable finishes that survive turnovers', 'One point of contact for every address'], cta: 'Rental property renovations' },
  { num: '04', name: 'Small multifamily', tag: '2–4 UNITS', href: '/multifamily-renovation/', head: 'Every unit turned without losing the whole building’s rent.',
    body: 'Duplexes through fourplexes bring shared systems, occupied units and tighter sequencing. We phase the work so the building keeps earning while it improves.',
    points: ['Unit-by-unit phasing to protect income', 'Shared systems scoped once, not per unit', 'Code and safety items flagged in the review'], cta: 'Small multifamily renovations' },
  { num: '05', name: 'Banks, REO & GSEs', tag: 'INSTITUTIONAL', href: '/reo-renovation/', head: 'Repair specialists for servicers, lenders and REO.',
    body: 'Mortgage servicers, banks, REITs and Government-Sponsored Enterprises use Genstone to get distressed assets market-ready. Preferred contractor status means our documentation is built for institutional review.',
    points: ['Preferred contractor for GSEs', 'Documentation built for institutional files', 'Coverage across 35 states'], cta: 'REO & bank-owned renovations' },
];

const ECO = [
  { k: 'YOU ARE HERE', b: 'Renovation', s: 'Scope, crews, field management', here: true },
  { k: 'GENSTONE FINANCIAL ↗', b: 'Financing', s: 'DSCR, fix & flip, lines of credit', href: '/investor-resources/financing/' },
  { k: 'GENSTONE REALTY', b: 'Brokerage', s: 'Acquisition, disposition, REO', href: '/our-partners/' },
  { k: 'TITLE CLEARING & ESCROW', b: 'Title', s: 'Closings, curative, lien releases', href: '/our-partners/' },
  { k: 'GENSTONE INSURANCE', b: 'Insurance', s: 'Vacant, flip and landlord coverage', href: '/our-partners/' },
  { k: 'PROPERTY MGMT + FIELD', b: 'Property mgmt', s: 'Leasing, turns, preservation', href: '/our-partners/' },
];

export default function Home() {
  const guides = listGuides().slice(0, 4);
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'WebSite', '@id': abs('/#website'), url: SITE.url, name: SITE.name, publisher: { '@id': abs('/#organization') } }} />

      {/* HERO */}
      <section className="hero">
        <div className="hw wedge" aria-hidden="true" />
        <div className="wrap" style={{ position: 'relative' }}>
          <p className="eyebrow in-1">Renovation contractor for real estate investors</p>
          <h1 className="h1 hl"><span className="ln"><span>Know the rehab <span className="acc">before</span></span></span><span className="ln"><span>you make the offer.</span></span></h1>
          <div className="hero-grid">
            <div className="hero-copy in-2">
              <p>Send us the address. Our estimators price the repairs, tighten your ARV and tell you whether the numbers support an offer. It&rsquo;s free, and it happens before a dollar of your capital is on the line. Then we build it, with one field manager from first walk to final punch.</p>
              <div className="hero-ctas">
                <Link className="btn btn-acc" href="#review">Get your free Pre-Offer Rehab Review <Arrow /></Link>
                <a className="btn btn-ghost" href={SITE.phoneHref}>Call {SITE.phone} <Arrow /></a>
              </div>
              <div className="facts" style={{ maxWidth: 460 }}>
                <Link href="/fix-flip/">Fix &amp; Flip</Link><Link href="/brrrr/">BRRRR</Link><Link href="/rental-renovation/">Single-family rental</Link>
                <Link href="/multifamily-renovation/">Small multifamily</Link><Link href="/fha-203k/">FHA 203(k)</Link><Link href="/reo-renovation/">REO</Link>
              </div>
            </div>
            <ScopeBoard />
          </div>
        </div>
      </section>

      <Strip />

      {/* STRATEGIES */}
      <section id="services" className="sec light">
        <span className="corner wedge" aria-hidden="true" />
        <div className="wrap">
          <div className="head-row">
            <h2 className="h2" data-rv="mask" style={{ maxWidth: 760 }}><Lines text="Built around your exit, | not our menu." /></h2>
            <p data-rv="up">A flip, a hold and a 203(k) buyer need different finishes, different budgets and different timelines. Pick the strategy and we scope to it.</p>
          </div>
          <StrategyTabs items={STRATS} />
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="sec">
        <div className="wrap">
          <p className="eyebrow" data-rv="up">Why Genstone</p>
          <h2 className="h2" data-rv="mask" style={{ maxWidth: 960 }}><Lines text="From address to keys, | one team owns the number." /></h2>
          <Process />
          <div className="pills" data-rv="stag" style={{ marginTop: 56, paddingTop: 40, borderTop: '1px solid var(--line)', alignItems: 'center' }}>
            <span className="mono" style={{ fontSize: 12, color: 'var(--mute)', letterSpacing: '.12em', marginRight: 12 }}>THE CREW BEHIND YOUR NUMBER</span>
            <span className="pill">Estimators</span><span className="pill">Field managers</span><span className="pill">Repair specialists</span><span className="pill">Billing</span>
            <Link className="tlink" href="/why-us/" style={{ marginLeft: 'auto' }}>Why investors choose us</Link>
          </div>
        </div>
      </section>

      <Marquee />

      {/* REAL WORK */}
      <section className="sec">
        <div className="wrap">
          <div className="head-row">
            <h2 className="h2" data-rv="mask"><Lines text="Real finishes, | real addresses." /></h2>
            <p data-rv="up">A few recent Genstone renovations, from a Tampa bungalow to kitchens and baths in Chicago&rsquo;s suburbs.</p>
          </div>
          <div className="grid-3" data-rv="stag">
            {[
              ['project-tampa-kitchen', 'Tampa, FL', 'Tampa Elegant Transformation', 'Whole-home bungalow renovation with a white shaker kitchen and waterfall island.'],
              ['project-barrington-bath', 'Barrington, IL', 'Barrington Modern Warmth', 'Fireplace, kitchen and bath with natural wood and matte black fixtures.'],
              ['project-woodridge-kitchen', 'Woodridge, IL', 'Woodridge Kitchen Renewal', 'Walnut-stained shaker cabinets, a large island and new recessed lighting.'],
            ].map(([img, loc, t, d]) => (
              <Link key={img} href="/project-gallery/" className="card card-img">
                <div className="ci"><Img name={img} alt={`${t} — ${loc}`} sizes="(max-width: 640px) 100vw, 400px" /></div>
                <div className="cb"><span className="k">{loc.toUpperCase()}</span><h3>{t}</h3><p>{d}</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTPRINT */}
      <section className="sec ink3">
        <div className="wrap split" style={{ alignItems: 'center' }}>
          <div>
            <p className="eyebrow" data-rv="up">Scope &amp; footprint</p>
            <h2 className="h2" data-rv="mask"><Lines text="35 states. | One standard." /></h2>
            <p className="lede" data-rv="up">Headquartered in Romeoville, Illinois, with thousands of licensed and insured contractors working to one scoping, documentation and draw process. Pick a state to see the cities we cover and what renovating there actually involves.</p>
            <div className="pills" style={{ marginTop: 32 }} data-rv="stag">
              {STATES.slice(0, 12).map((s) => <Link key={s.slug} className="pill" href={`/service-area/${s.slug}/`}>{s.name}</Link>)}
              <Link className="pill" href="/service-area/" style={{ borderColor: 'var(--acc)' }}>All 35 states →</Link>
            </div>
          </div>
          <div><TileMap /></div>
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section className="sec">
        <div className="wrap">
          <div className="head-row">
            <h2 className="h2" data-rv="mask" style={{ maxWidth: 760 }}><Lines text="One family of companies. | One deal file." /></h2>
            <p data-rv="up">Genstone Construction sits inside the Genstone Companies, so the rehab, the money and the paperwork can live under one roof.</p>
          </div>
          <div className="eco" data-rv="stag">
            {ECO.map((e) => e.here ? (
              <div key={e.b} className="here"><span className="k">{e.k}</span><div><b>{e.b}</b><small>{e.s}</small></div></div>
            ) : (
              <Link key={e.b} href={e.href!}><span className="k">{e.k}</span><div><b>{e.b}</b><small>{e.s}</small></div></Link>
            ))}
          </div>
        </div>
      </section>

      {/* 203K */}
      <section id="fha" className="sec light">
        <div className="wrap row" style={{ alignItems: 'center', gap: 72 }}>
          <div className="stamp" data-rv="stamp"><span>FHA CERTIFIED</span><b>203(k)</b><span>CONTRACTOR</span></div>
          <div style={{ flex: '1 1 480px', minWidth: 0 }}>
            <p className="eyebrow" data-rv="up">For homebuyers &amp; refinancers</p>
            <h2 className="h2" data-rv="mask" style={{ fontSize: 'clamp(32px,3.6vw,50px)' }}><Lines text="Buying a house that needs work? | Finance the fix in the same loan." /></h2>
            <p className="lede" data-rv="up">An FHA 203(k) loan rolls the purchase or refinance and the renovation into one mortgage. The program has rules on scope, bids and draws. We&rsquo;re a certified 203(k) contractor and manage the renovation side so your lender gets what it needs.</p>
            <div className="btns"><Link className="btn btn-ink" href="/fha-203k/">Learn about 203(k) renovations <Arrow /></Link></div>
          </div>
        </div>
      </section>

      {/* GUIDES */}
      <section id="resources" className="sec-s light" style={{ paddingTop: 0, paddingBottom: 120 }}>
        <div className="wrap">
          <div style={{ borderTop: '2px solid var(--ink)', paddingTop: 48, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 24, flexWrap: 'wrap' }}>
            <h2 className="h3" data-rv="mask" style={{ fontSize: 40, fontWeight: 900 }}><Lines text="Run the numbers yourself." /></h2>
            <Link className="tlink" href="/guides/">All investor guides</Link>
          </div>
          <div className="grid-4" style={{ marginTop: 40 }} data-rv="stag">
            <Link className="card" href="/investor-resources/arv-calculator/"><span className="k">TOOL</span><h3>ARV Calculator</h3><p>Estimate after-repair value, your maximum bid and return before you call us.</p><span className="go">Open the calculator →</span></Link>
            {guides.slice(0, 3).map((g) => (
              <Link className="card" key={g.slug} href={`/guides/${g.slug}/`}><span className="k">GUIDE</span><h3>{g.h1}</h3><p>{g.dek.slice(0, 120)}{g.dek.length > 120 ? '…' : ''}</p><span className="go">Read the guide →</span></Link>
            ))}
          </div>
        </div>
      </section>

      {/* CONTRACTORS */}
      <section id="contractors" className="sec" style={{ overflow: 'hidden' }}>
        <div className="ghost-word" aria-hidden="true">TRADES WANTED · TRADES WANTED</div>
        <div className="wrap row" style={{ position: 'relative', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ maxWidth: 640 }}>
            <p className="eyebrow" data-rv="up">For contractors</p>
            <h2 className="h2" data-rv="mask" style={{ fontSize: 'clamp(32px,3.8vw,52px)' }}><Lines text="Steady investor work. | Get on the Genstone bench." /></h2>
            <p className="lede" data-rv="up">We bring the scope, the client and the field management; you bring the trade. Check the requirements, then apply to the network.</p>
          </div>
          <div data-rv="stag" style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: '0 0 340px', maxWidth: '100%' }}>
            <Link className="btn btn-acc" href="/contractor-application/" style={{ justifyContent: 'space-between' }}>Contractor application <Arrow /></Link>
            <Link className="btn btn-ghost" href="/contractors/pre-application-check-list/" style={{ justifyContent: 'space-between' }}>Pre-application checklist <Arrow /></Link>
            <Link className="btn btn-ghost" href="/contractor-faqs/" style={{ justifyContent: 'space-between' }}>Contractor FAQs <Arrow /></Link>
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
