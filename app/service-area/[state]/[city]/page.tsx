import Link from '@/components/A';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Breadcrumbs, JsonLd, Faq, Prose, Lines, slugify } from '@/components/ui';
import { PageHero, Cta, Strip, Process } from '@/components/Blocks';
import { liveCities, getCity, stateBySlug, cityPath, comboPath, statePath } from '@/lib/content';
import { meta, webPage } from '@/lib/seo';
import { COMBO_SERVICES, COMBO_LABEL, SERVICES, abs } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() { return liveCities().map((c) => ({ state: c.state.slug, city: c.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ state: string; city: string }> }): Promise<Metadata> {
  const { state, city } = await params; const d = getCity(state, city);
  return d ? meta({ title: d.title, description: d.metaDescription, path: cityPath(state, city) }) : {};
}

export default async function Page({ params }: { params: Promise<{ state: string; city: string }> }) {
  const { state, city } = await params;
  const st = stateBySlug(state); const d = getCity(state, city);
  if (!st || !d) notFound();
  const path = cityPath(state, city);
  const paras = d.intro.split(/\n\s*\n/);
  const siblings = st.cities.filter((c) => c.slug !== city && getCity(state, c.slug));
  return (
    <>
      <JsonLd data={[webPage(path, d.h1, d.metaDescription), {
        '@context': 'https://schema.org', '@type': 'Service', '@id': abs(path) + '#service', name: d.h1, serviceType: 'Investment property renovation',
        provider: { '@id': abs('/#organization') },
        areaServed: { '@type': 'City', name: `${d.name}, ${st.abbr}`, containedInPlace: { '@type': 'State', name: st.name } },
        hasOfferCatalog: { '@type': 'OfferCatalog', name: `Renovation services in ${d.name}`, itemListElement: COMBO_SERVICES.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: `${COMBO_LABEL[s.key]} in ${d.name}`, url: abs(comboPath(state, city, s.key)) } })) },
      }]} />
      <PageHero crumbs={<Breadcrumbs items={[{ name: 'Service Area', path: '/service-area/' }, { name: st.name, path: statePath(state) }, { name: d.name, path }]} />}
        eyebrow={`${d.name}, ${st.abbr}${d.county ? ' · ' + d.county : ''}`} title={d.h1} lede={paras[0]}
        facts={d.neighborhoods.slice(0, 6)} />
      <Strip />
      {paras.length > 1 && <section className="sec-s"><div className="wrap wrap-n" style={{ maxWidth: 900 }}><Prose text={paras.slice(1).join('\n\n')} /></div></section>}

      <section className="sec light">
        <span className="corner wedge" aria-hidden="true" />
        <div className="wrap">
          <div className="head-row"><h2 className="h2" data-rv="mask" style={{ maxWidth: 760 }}><Lines text={`Renovation services | in ${d.name}`} /></h2><p data-rv="up">Pick your strategy for {d.name}-specific scope, permitting and pricing considerations.</p></div>
          <div className="grid-3" data-rv="stag">
            {COMBO_SERVICES.map((s) => {
              const c = d.combos[s.key];
              return (
                <Link key={s.key} className="card" href={comboPath(state, city, s.key)}>
                  <span className="k">{s.short.toUpperCase()}</span>
                  <h3>{c?.h1 || `${COMBO_LABEL[s.key]} in ${d.name}`}</h3>
                  <p>{c?.metaDescription || s.blurb}</p>
                  <span className="go">{COMBO_LABEL[s.key]} in {d.name} →</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap toc-layout">
          <nav className="toc" aria-label="On this page"><p>ON THIS PAGE</p>
            {['Housing stock', 'What we find', 'Investor market', 'Permits', 'Weather & scheduling', 'FAQs'].map((t) => <a key={t} href={`#${slugify(t)}`}>{t}</a>)}
          </nav>
          <div>
            <section className="blk" id="housing-stock"><span className="num">01</span><h2>{d.name} housing stock and what it means for a rehab</h2><Prose text={d.housingStock} />
              <div className="pills" style={{ marginTop: 24 }}>{d.neighborhoods.map((n) => <span key={n} className="pill">{n}</span>)}</div></section>
            <section className="blk" id="what-we-find"><span className="num">02</span><h2>What renovations in {d.name} usually uncover</h2>
              {d.commonIssues.map((c, i) => (<div className="issue" key={c.title}><span className="n">{String(i + 1).padStart(2, '0')}</span><div><h3>{c.title}</h3><p>{c.body}</p></div></div>))}
            </section>
            <section className="blk" id="investor-market"><span className="num">03</span><h2>Where each strategy fits in {d.name}</h2><Prose text={d.investorMarket} /></section>
            <section className="blk" id="permits"><span className="num">04</span><h2>Permits and inspections in {d.name}</h2><Prose text={d.permits} /></section>
            <section className="blk" id="weather-scheduling"><span className="num">05</span><h2>Weather, seasons and scheduling</h2><Prose text={d.climate} /></section>
            <section className="blk" id="faqs"><span className="num">06</span><h2>{d.name} renovation FAQs</h2><Faq items={d.faqs} /></section>
          </div>
        </div>
      </section>

      <section className="sec ink3"><div className="wrap">
        <p className="eyebrow">How it works in {d.name}</p>
        <h2 className="h2" data-rv="mask"><Lines text="Same process, | every address." /></h2>
        <Process />
      </div></section>

      <section className="sec"><div className="wrap split">
        <div>
          <h2 className="h3" style={{ marginBottom: 18 }}>Also serving near {d.name}</h2>
          <p className="prose" style={{ fontSize: 16 }}>{d.nearby.join(' · ')}</p>
          <h2 className="h3" style={{ margin: '40px 0 18px' }}>Other services</h2>
          <div className="pills">{SERVICES.filter((s) => !s.combo).map((s) => <Link className="pill" key={s.key} href={`/${s.key}/`}>{s.name}</Link>)}</div>
        </div>
        <div>
          <h2 className="h3" style={{ marginBottom: 18 }}>More {st.name} cities</h2>
          <div className="pills">{siblings.map((c) => <Link className="pill" key={c.slug} href={cityPath(state, c.slug)}>{c.name}</Link>)}<Link className="pill" href={statePath(state)}>All of {st.name} →</Link></div>
        </div>
      </div></section>
      <Cta title={`Buying in ${d.name}? | Get the real | number.`} />
    </>
  );
}
