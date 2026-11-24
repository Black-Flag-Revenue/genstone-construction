import Link from '@/components/A';
import { Breadcrumbs, Faq, Sections, JsonLd, Arrow, Img } from './ui';
import { PageHero, Process, Cta, ServiceCards, Strip } from './Blocks';
import { SITE, SERVICES, abs, type ServiceKey } from '@/lib/site';
import { STATES, getCity, comboPath, type PageDoc, type ServiceDoc } from '@/lib/content';
import { webPage } from '@/lib/seo';

export function CorePage({ doc, path, crumbs, image, imageAlt, before, after, cta = true, light = false }: {
  doc: PageDoc; path: string; crumbs: { name: string; path: string }[]; image?: string; imageAlt?: string;
  before?: React.ReactNode; after?: React.ReactNode; cta?: boolean; light?: boolean;
}) {
  return (
    <>
      <JsonLd data={webPage(path, doc.h1, doc.metaDescription)} />
      <PageHero crumbs={<Breadcrumbs items={crumbs} />} eyebrow={doc.eyebrow} title={doc.h1} lede={doc.lede} image={image} imageAlt={imageAlt} />
      {before}
      {doc.sections?.length > 0 && (
        <section className={`sec${light ? ' light' : ''}`} style={{ paddingTop: light ? 120 : 40 }}>
          <div className="wrap"><Sections sections={doc.sections} /></div>
        </section>
      )}
      {after}
      {doc.faqs && doc.faqs.length > 0 && (
        <section className="sec light">
          <div className="wrap wrap-n" style={{ maxWidth: 1000 }}>
            <p className="eyebrow">Questions</p>
            <h2 className="h2" style={{ marginBottom: 40 }}>Frequently asked</h2>
            <Faq items={doc.faqs} />
          </div>
        </section>
      )}
      {cta && <Cta />}
    </>
  );
}

/** Links to every city page for a combo service, grouped by state. */
export function CityIndex({ svc }: { svc: ServiceKey }) {
  return (
    <div className="grid-3" style={{ gap: '28px 40px' }}>
      {STATES.map((st) => {
        const cities = st.cities.filter((c) => getCity(st.slug, c.slug));
        if (!cities.length) return null;
        return (
          <div key={st.slug}>
            <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 10 }}><Link href={`/service-area/${st.slug}/`} style={{ textDecoration: 'none' }}>{st.name}</Link></h3>
            <div className="pills">
              {cities.map((c) => <Link key={c.slug} className="pill" style={{ fontSize: 13, padding: '7px 11px' }} href={comboPath(st.slug, c.slug, svc)}>{c.name}</Link>)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ServicePage({ doc, image }: { doc: ServiceDoc; image: string }) {
  const path = `/${doc.slug}/`;
  const svc = SERVICES.find((s) => s.key === doc.slug);
  return (
    <>
      <JsonLd data={[webPage(path, doc.h1, doc.metaDescription), {
        '@context': 'https://schema.org', '@type': 'Service', '@id': abs(path) + '#service', name: doc.h1, serviceType: doc.name,
        description: doc.metaDescription, provider: { '@id': abs('/#organization') },
        areaServed: STATES.map((s) => ({ '@type': 'State', name: s.name })), url: abs(path),
      }]} />
      <PageHero crumbs={<Breadcrumbs items={[{ name: 'Investor Services', path: '/investors/' }, { name: doc.name, path }]} />}
        eyebrow={doc.eyebrow} title={doc.h1} lede={doc.lede} image={image} imageAlt={`${doc.name} renovation`} />
      <Strip />
      <section className="sec light">
        <span className="corner wedge" aria-hidden="true" />
        <div className="wrap">
          <div className="head-row">
            <h2 className="h2" data-rv="mask" style={{ maxWidth: 700 }}><span className="ln"><span>What&rsquo;s included</span></span></h2>
            <p data-rv="up">Every project runs on the same scoping, documentation and draw process, from the first walk-through to the final draw.</p>
          </div>
          <div className="grid-3" data-rv="stag">
            {doc.included.map((x, i) => (
              <div key={x.title} className="card"><span className="k">{String(i + 1).padStart(2, '0')}</span><h3>{x.title}</h3><p>{x.body}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="sec"><div className="wrap"><Sections sections={doc.sections} /></div></section>
      <section className="sec ink3">
        <div className="wrap">
          <p className="eyebrow" data-rv="up">How it works</p>
          <h2 className="h2" data-rv="mask"><span className="ln"><span>One process, start to finish.</span></span></h2>
          <Process />
        </div>
      </section>
      {svc?.combo && (
        <section className="sec">
          <div className="wrap">
            <div className="head-row">
              <h2 className="h2" data-rv="mask" style={{ maxWidth: 760 }}><span className="ln"><span>{doc.name} by city</span></span></h2>
              <p data-rv="up">Housing stock, permits and weather change the scope. Pick your market for local detail.</p>
            </div>
            <CityIndex svc={svc.key} />
          </div>
        </section>
      )}
      <section className="sec light">
        <div className="wrap wrap-n" style={{ maxWidth: 1000 }}>
          <p className="eyebrow">Questions</p>
          <h2 className="h2" style={{ marginBottom: 40 }}>{doc.name} FAQs</h2>
          <Faq items={doc.faqs} />
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <h2 className="h2" style={{ marginBottom: 48 }}>Other investor services</h2>
          <ServiceCards exclude={doc.slug} />
        </div>
      </section>
      <Cta />
    </>
  );
}

export function PhotoBand({ name, alt }: { name: string; alt: string }) {
  return (
    <section className="sec-s" style={{ paddingTop: 0 }}>
      <div className="wrap"><div className="phero-img" style={{ aspectRatio: '21/9' }}><Img name={name} alt={alt} sizes="(max-width: 1280px) 100vw, 1200px" /></div></div>
    </section>
  );
}

export const callLine = <p className="mono" style={{ fontSize: 13, color: 'var(--mute)' }}>Or call <a href={SITE.phoneHref}>{SITE.phone}</a> <Arrow /></p>;
