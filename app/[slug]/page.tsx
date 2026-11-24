import { notFound } from 'next/navigation';
import Link from '@/components/A';
import type { Metadata } from 'next';
import { getPage, getService } from '@/lib/content';
import { SERVICES } from '@/lib/site';
import { meta } from '@/lib/seo';
import { CorePage, ServicePage } from '@/components/Templates';
import { Img, Prose, Arrow } from '@/components/ui';
import { ContactForms, ContractorApplication } from '@/components/Forms';
import { SITE } from '@/lib/site';

const CORE: Record<string, { crumbs: { name: string; path: string }[]; image?: string; alt?: string }> = {
  investors: { crumbs: [{ name: 'Investor Services', path: '/investors/' }], image: 'construction-plans', alt: 'Renovation plans being reviewed' },
  'why-us': { crumbs: [{ name: 'Why Genstone', path: '/why-us/' }], image: 'project-handshake', alt: 'Genstone project manager meeting investors on site' },
  'our-partners': { crumbs: [{ name: 'Our Partners', path: '/our-partners/' }], image: 'genstone-companies', alt: 'The Genstone family of companies' },
  'project-gallery': { crumbs: [{ name: 'Project Gallery', path: '/project-gallery/' }] },
  'investor-faqs': { crumbs: [{ name: 'Investor Resources', path: '/investor-resources/' }, { name: 'Investor FAQs', path: '/investor-faqs/' }], image: 'investor-meeting', alt: 'Investors reviewing a renovation plan' },
  'contractor-faqs': { crumbs: [{ name: 'Contractors', path: '/contractors/' }, { name: 'Contractor FAQs', path: '/contractor-faqs/' }] },
  'contractor-application': { crumbs: [{ name: 'Contractors', path: '/contractors/' }, { name: 'Contractor Application', path: '/contractor-application/' }] },
  contact: { crumbs: [{ name: 'Contact', path: '/contact/' }] },
  'privacy-policy': { crumbs: [{ name: 'Privacy Policy', path: '/privacy-policy/' }] },
  'terms-of-service': { crumbs: [{ name: 'Terms of Service', path: '/terms-of-service/' }] },
};

export const dynamicParams = false;
export function generateStaticParams() {
  return [...SERVICES.map((s) => ({ slug: s.key })), ...Object.keys(CORE).map((slug) => ({ slug }))];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = getService(slug) || getPage(slug);
  if (!d) return {};
  return meta({ title: d.title, description: d.metaDescription, path: `/${slug}/` });
}

const GALLERY = [
  { img: 'project-tampa-kitchen', loc: 'Tampa, FL', rooms: 'Bathroom · Kitchen · Living room' },
  { img: 'project-barrington-bath', loc: 'Barrington, IL', rooms: 'Bathroom · Kitchen · Living room' },
  { img: 'project-woodridge-kitchen', loc: 'Woodridge, IL', rooms: 'Kitchen' },
];
const PARTNERS = [
  ['logo-genstone-realty.svg', 'Genstone Realty'], ['logo-genstone-financial.svg', 'Genstone Financial'], ['logo-genstone-insurance.svg', 'Genstone Insurance'],
  ['logo-genstone-property-management.svg', 'Genstone Property Management'], ['logo-genstone-field-services.svg', 'Genstone Field Services'], ['logo-title-clearing-escrow.webp', 'Title Clearing & Escrow'],
];

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const svc = SERVICES.find((s) => s.key === slug);
  if (svc) {
    const doc = getService(slug);
    if (!doc) notFound();
    return <ServicePage doc={doc} image={svc.image} />;
  }
  const doc = getPage(slug);
  const cfg = CORE[slug];
  if (!doc || !cfg) notFound();
  const path = `/${slug}/`;

  if (slug === 'project-gallery') {
    const [intro, ...projects] = doc.sections;
    return (
      <CorePage doc={{ ...doc, sections: [] }} path={path} crumbs={cfg.crumbs} before={
        <section className="sec" style={{ paddingTop: 20 }}>
          <div className="wrap">
            {intro && <div className="wrap-n" style={{ marginBottom: 80, padding: 0 }}><h2 className="h3" style={{ marginBottom: 20 }}>{intro.h2}</h2><Prose text={intro.body} /></div>}
            {projects.map((p, i) => {
              const g = GALLERY[i];
              return (
                <article key={p.h2} className="split" style={{ marginBottom: 96, alignItems: 'center' }} data-rv="up">
                  {g && <div className="phero-img" style={{ order: i % 2 }}><Img name={g.img} alt={`${p.h2}, ${g.loc}`} /></div>}
                  <div>
                    {g && <p className="eyebrow">{g.loc} · {g.rooms}</p>}
                    <h2 className="h3" style={{ fontSize: 34, marginBottom: 22 }}>{p.h2}</h2>
                    <Prose text={p.body} />
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      } />
    );
  }

  if (slug === 'our-partners') {
    return (
      <CorePage doc={doc} path={path} crumbs={cfg.crumbs} image={cfg.image} imageAlt={cfg.alt} before={
        <section className="sec-s light">
          <div className="wrap">
            <div className="grid-3" data-rv="stag">
              {PARTNERS.map(([f, n]) => (
                <div key={n} className="card" style={{ alignItems: 'flex-start', minHeight: 150, justifyContent: 'center' }}>
                  <img src={`/img/${f}`} alt={n} loading="lazy" style={{ height: 44, width: 'auto', maxWidth: '100%' }} />
                </div>
              ))}
            </div>
          </div>
        </section>
      } />
    );
  }

  if (slug === 'contact') {
    return (
      <CorePage doc={doc} path={path} crumbs={cfg.crumbs} cta={false} before={
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap split">
            <ContactForms />
            <div>
              <h2 className="h3" style={{ marginBottom: 18 }}>Talk to an estimator</h2>
              <a href={SITE.phoneHref} className="disp" style={{ fontSize: 40, textDecoration: 'none', display: 'inline-block', borderBottom: '3px solid var(--acc)' }}>{SITE.phone}</a>
              <address className="mono" style={{ fontStyle: 'normal', marginTop: 28, color: 'var(--mute3)', lineHeight: 1.8, fontSize: 14 }}>Genstone Construction<br />{SITE.street}<br />{SITE.city}, {SITE.region} {SITE.zip}</address>
              <div className="btns"><Link className="btn btn-ghost" href="/pre-offer-rehab-review/">Free Pre-Offer Rehab Review <Arrow /></Link></div>
              <div style={{ marginTop: 40 }}><Link className="tlink" href="/contractors/pre-application-check-list/">Contractors: start with the pre-application checklist</Link></div>
            </div>
          </div>
        </section>
      } />
    );
  }

  if (slug === 'contractor-application') {
    return (
      <CorePage doc={doc} path={path} crumbs={cfg.crumbs} cta={false} before={
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap split">
            <ContractorApplication />
            <div className="card" style={{ position: 'sticky', top: 110 }}>
              <span className="k">BEFORE YOU APPLY</span>
              <h3>Have these five documents ready</h3>
              <Prose text={'- General contractor license\n- Certificate of insurance\n- Workers’ compensation certificate or waiver\n- Completed current W-9\n- Signed mutual non-disclosure agreement'} />
              <Link className="go" href="/contractors/pre-application-check-list/">See the full checklist →</Link>
            </div>
          </div>
        </section>
      } />
    );
  }

  return <CorePage doc={doc} path={path} crumbs={cfg.crumbs} image={cfg.image} imageAlt={cfg.alt} cta={!slug.includes('policy') && !slug.includes('terms')} />;
}
