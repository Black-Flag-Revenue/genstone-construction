import Link from '@/components/A';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Breadcrumbs, JsonLd, Sections, Faq } from '@/components/ui';
import { PageHero, TileMap, Cta, Strip } from '@/components/Blocks';
import { liveStates, getState, getCity, stateBySlug, cityPath, comboPath, statePath } from '@/lib/content';
import { meta, webPage } from '@/lib/seo';
import { COMBO_SERVICES, abs } from '@/lib/site';

export const dynamicParams = false;
import type { StateDoc } from '@/lib/content';
/** State copy, with a minimal fallback while the long-form state file is still being written. */
function doc(state: string): StateDoc | null {
  const st = stateBySlug(state); if (!st) return null;
  return getState(state) || { slug: state, title: `${st.name} Investor Renovation Contractor | Genstone`, metaDescription: `Genstone Construction renovates investment properties across ${st.name}: fix and flip, BRRRR, rentals, 2–4 unit, REO and FHA 203(k). Free Pre-Offer Rehab Review.`,
    h1: `Investor Renovations in ${st.name}`, intro: `Genstone Construction coordinates licensed, insured local contractors across ${st.name} under one scoping, documentation and draw process.`, sections: [], faqs: [] };
}
export function generateStaticParams() { return liveStates().map((s) => ({ state: s.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params; const d = doc(state);
  return d ? meta({ title: d.title, description: d.metaDescription, path: statePath(state) }) : {};
}

export default async function Page({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const st = stateBySlug(state); const d = doc(state);
  if (!st || !d) notFound();
  const path = statePath(state);
  const cities = st.cities.map((c) => ({ ...c, doc: getCity(state, c.slug) })).filter((c) => c.doc);
  return (
    <>
      <JsonLd data={[webPage(path, d.h1, d.metaDescription), {
        '@context': 'https://schema.org', '@type': 'Service', name: `Investor renovation services in ${st.name}`, provider: { '@id': abs('/#organization') },
        areaServed: { '@type': 'State', name: st.name }, serviceType: 'Investment property renovation',
      }]} />
      <PageHero crumbs={<Breadcrumbs items={[{ name: 'Service Area', path: '/service-area/' }, { name: st.name, path }]} />}
        eyebrow={`${st.name} · ${cities.length} ${cities.length === 1 ? 'city' : 'cities'}`} title={d.h1} lede={d.intro.split(/\n\s*\n/)[0]} />
      <Strip />
      <section className="sec light">
        <span className="corner wedge" aria-hidden="true" />
        <div className="wrap">
          <div className="head-row"><h2 className="h2" style={{ maxWidth: 760 }}>Cities we serve in {st.name}</h2><p>Each city page covers local housing stock, permitting and weather, with pages for every investment strategy.</p></div>
          <div className="grid-3" data-rv="stag">
            {cities.map((c) => (
              <div key={c.slug} className="card">
                <span className="k">{(c.doc!.county || st.name).toUpperCase()}</span>
                <h3><Link href={cityPath(state, c.slug)} style={{ textDecoration: 'none' }}>{c.name}, {st.abbr}</Link></h3>
                <p>{c.doc!.metaDescription}</p>
                <div className="pills" style={{ marginTop: 6 }}>
                  {COMBO_SERVICES.map((s) => <Link key={s.key} className="pill" style={{ fontSize: 12.5, padding: '6px 10px' }} href={comboPath(state, c.slug, s.key)}>{s.short}</Link>)}
                </div>
                <Link className="go" href={cityPath(state, c.slug)}>{c.name} renovation guide →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      {d.intro.split(/\n\s*\n/).length > 1 && (
        <section className="sec-s"><div className="wrap wrap-n" style={{ maxWidth: 900 }}><div className="prose">{d.intro.split(/\n\s*\n/).slice(1).map((p, i) => <p key={i}>{p}</p>)}</div></div></section>
      )}
      <section className="sec"><div className="wrap"><Sections sections={d.sections} /></div></section>
      <section className="sec ink3"><div className="wrap split" style={{ alignItems: 'center' }}>
        <div><p className="eyebrow">Footprint</p><h2 className="h2">{st.name} is one of 35 states we serve.</h2><p className="lede">Neighboring markets run on the same scope, draw and documentation standards.</p></div>
        <TileMap current={state} />
      </div></section>
      <section className="sec light"><div className="wrap wrap-n" style={{ maxWidth: 1000 }}>
        <p className="eyebrow">Questions</p><h2 className="h2" style={{ marginBottom: 40 }}>{st.name} renovation FAQs</h2><Faq items={d.faqs} />
      </div></section>
      <Cta />
    </>
  );
}
