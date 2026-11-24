import Link from '@/components/A';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Breadcrumbs, JsonLd, Faq, Sections, Lines } from '@/components/ui';
import { PageHero, Cta, Strip, Process } from '@/components/Blocks';
import { liveCities, getCity, getService, stateBySlug, cityPath, comboPath, statePath } from '@/lib/content';
import { meta, webPage } from '@/lib/seo';
import { COMBO_SERVICES, COMBO_LABEL, serviceByKey, abs } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() {
  return liveCities().flatMap((c) => COMBO_SERVICES.filter((s) => c.doc.combos?.[s.key]).map((s) => ({ state: c.state.slug, city: c.slug, service: s.key })));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string; city: string; service: string }> }): Promise<Metadata> {
  const { state, city, service } = await params; const c = getCity(state, city)?.combos?.[service];
  return c ? meta({ title: c.title, description: c.metaDescription, path: comboPath(state, city, service) }) : {};
}

export default async function Page({ params }: { params: Promise<{ state: string; city: string; service: string }> }) {
  const { state, city, service } = await params;
  const st = stateBySlug(state); const d = getCity(state, city); const svc = serviceByKey(service);
  const c = d?.combos?.[service];
  if (!st || !d || !c || !svc) notFound();
  const sdoc = getService(service);
  const path = comboPath(state, city, service);
  const otherCities = st.cities.filter((x) => x.slug !== city && getCity(state, x.slug));
  return (
    <>
      <JsonLd data={[webPage(path, c.h1, c.metaDescription), {
        '@context': 'https://schema.org', '@type': 'Service', '@id': abs(path) + '#service', name: c.h1, serviceType: svc.name, description: c.metaDescription,
        provider: { '@id': abs('/#organization') }, url: abs(path),
        areaServed: { '@type': 'City', name: `${d.name}, ${st.abbr}`, containedInPlace: { '@type': 'State', name: st.name } },
        isRelatedTo: { '@type': 'Service', name: svc.name, url: abs(`/${svc.key}/`) },
      }]} />
      <PageHero crumbs={<Breadcrumbs items={[{ name: 'Service Area', path: '/service-area/' }, { name: st.name, path: statePath(state) }, { name: d.name, path: cityPath(state, city) }, { name: svc.short, path }]} />}
        eyebrow={`${COMBO_LABEL[service]} · ${d.name}, ${st.abbr}`} title={c.h1} lede={c.intro} image={svc.image} imageAlt={`${svc.name} project`} />
      <Strip />
      <section className="sec"><div className="wrap"><Sections sections={c.sections} /></div></section>

      {sdoc && (
        <section className="sec light">
          <span className="corner wedge" aria-hidden="true" />
          <div className="wrap">
            <div className="head-row"><h2 className="h2" data-rv="mask" style={{ maxWidth: 760 }}><Lines text={`What every ${svc.short} | project includes`} /></h2>
              <p data-rv="up">The same standards apply on a {d.name} job as anywhere in our 35-state footprint. <Link href={`/${svc.key}/`} className="tlink">Read the full {svc.name} overview</Link></p></div>
            <div className="pills" data-rv="stag">{sdoc.included.map((x) => <span key={x.title} className="pill" style={{ fontSize: 16, padding: '14px 18px' }}>{x.title}</span>)}</div>
          </div>
        </section>
      )}

      <section className="sec ink3"><div className="wrap">
        <p className="eyebrow">How it works</p>
        <h2 className="h2" data-rv="mask"><Lines text={`Your ${d.name} project, | step by step.`} /></h2>
        <Process />
      </div></section>

      <section className="sec light"><div className="wrap wrap-n" style={{ maxWidth: 1000 }}>
        <p className="eyebrow">Questions</p><h2 className="h2" style={{ marginBottom: 40 }}>{svc.short} in {d.name}: FAQs</h2><Faq items={c.faqs} />
      </div></section>

      <section className="sec"><div className="wrap split">
        <div>
          <h2 className="h3" style={{ marginBottom: 18 }}>Other strategies in {d.name}</h2>
          <div className="pills">{COMBO_SERVICES.filter((s) => s.key !== service && d.combos[s.key]).map((s) => <Link className="pill" key={s.key} href={comboPath(state, city, s.key)}>{COMBO_LABEL[s.key]}</Link>)}
            <Link className="pill" href={cityPath(state, city)}>{d.name} overview →</Link></div>
        </div>
        <div>
          <h2 className="h3" style={{ marginBottom: 18 }}>{svc.short} elsewhere in {st.name}</h2>
          <div className="pills">{otherCities.map((x) => <Link className="pill" key={x.slug} href={comboPath(state, x.slug, service)}>{x.name}</Link>)}<Link className="pill" href={`/${svc.key}/`}>All {svc.short} markets →</Link></div>
        </div>
      </div></section>
      <Cta title={`${d.name} deal? | Get the real | number.`} />
    </>
  );
}
