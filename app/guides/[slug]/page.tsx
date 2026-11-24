import Link from '@/components/A';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Breadcrumbs, JsonLd, Faq, Sections } from '@/components/ui';
import { PageHero, Cta } from '@/components/Blocks';
import { listGuides, getGuide } from '@/lib/content';
import { meta } from '@/lib/seo';
import { SERVICES, abs } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() { return listGuides().map((g) => ({ slug: g.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const g = getGuide(slug);
  return g ? { ...meta({ title: g.title, description: g.metaDescription, path: `/guides/${slug}/` }), openGraph: { type: 'article', title: g.title, description: g.metaDescription, url: abs(`/guides/${slug}/`) } } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const g = getGuide(slug);
  if (!g) notFound();
  const path = `/guides/${slug}/`;
  const words = [g.dek, ...g.sections.map((s) => s.body), ...g.faqs.map((f) => f.a)].join(' ').split(/\s+/).length;
  const more = listGuides().filter((x) => x.slug !== slug).slice(0, 6);
  const related = SERVICES.filter((s) => g.related?.includes(s.key));
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'Article', '@id': abs(path) + '#article', headline: g.h1, description: g.metaDescription,
        mainEntityOfPage: abs(path), author: { '@id': abs('/#organization') }, publisher: { '@id': abs('/#organization') },
        datePublished: '2026-11-24', dateModified: '2026-11-24', wordCount: words, image: abs('/img/og-default.jpg'),
        about: related.map((s) => s.name),
      }} />
      <PageHero crumbs={<Breadcrumbs items={[{ name: 'Investor Resources', path: '/investor-resources/' }, { name: 'Guides', path: '/guides/' }, { name: g.h1, path }]} />}
        eyebrow={`Investor guide · ${Math.max(1, Math.round(words / 230))} min read`} title={g.h1} lede={g.dek}>
        <div className="btns in-2"><Link className="btn btn-ghost" href="#review">Get a free rehab review</Link></div>
      </PageHero>
      <section className="sec-s light">
        <div className="wrap wrap-n" style={{ maxWidth: 1000 }}>
          <p className="eyebrow">Key takeaways</p>
          <ul className="prose" style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {g.keyTakeaways.map((t) => <li key={t} style={{ position: 'relative', paddingLeft: 26, marginBottom: 12 }}>{t}</li>)}
          </ul>
        </div>
      </section>
      <section className="sec"><div className="wrap"><Sections sections={g.sections} /></div></section>
      <section className="sec light"><div className="wrap wrap-n" style={{ maxWidth: 1000 }}>
        <p className="eyebrow">Questions</p><h2 className="h2" style={{ marginBottom: 40 }}>FAQs</h2><Faq items={g.faqs} />
      </div></section>
      {related.length > 0 && <section className="sec"><div className="wrap"><h2 className="h2" style={{ marginBottom: 40 }}>Related services</h2>
        <div className="grid-3">{related.map((s) => <Link key={s.key} className="card" href={`/${s.key}/`}><span className="k">{s.short.toUpperCase()}</span><h3>{s.name}</h3><p>{s.blurb}</p><span className="go">Learn more →</span></Link>)}</div>
      </div></section>}
      <section className="sec ink3"><div className="wrap"><h2 className="h2" style={{ marginBottom: 40 }}>More guides</h2>
        <div className="grid-3">{more.map((x) => <Link key={x.slug} className="card" href={`/guides/${x.slug}/`}><span className="k">GUIDE</span><h3>{x.h1}</h3><span className="go">Read →</span></Link>)}</div>
      </div></section>
      <Cta />
    </>
  );
}
