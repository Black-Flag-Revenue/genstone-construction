import Link from '@/components/A';
import type { Metadata } from 'next';
import { Breadcrumbs, JsonLd } from '@/components/ui';
import { PageHero, Cta } from '@/components/Blocks';
import { listGuides } from '@/lib/content';
import { meta, webPage } from '@/lib/seo';

const PATH = '/guides/';
export const metadata: Metadata = meta({ title: 'Investor Renovation Guides | Genstone Construction', description: 'Long-form guides for real estate investors: rehab estimating, ARV, BRRRR, FHA 203(k), REO, permits, lead paint, draws, rental turns and small multifamily.', path: PATH });

export default function Page() {
  const guides = listGuides();
  return (
    <>
      <JsonLd data={webPage(PATH, 'Investor renovation guides', 'Long-form renovation guides for real estate investors.', 'CollectionPage')} />
      <PageHero crumbs={<Breadcrumbs items={[{ name: 'Investor Resources', path: '/investor-resources/' }, { name: 'Guides', path: PATH }]} />}
        eyebrow="Investor guides" title="What estimators know, | written down." lede="Practical, long-form guides on the parts of a renovation that decide whether a deal works: scoping, pricing, ARV, financing programs, permits and the paperwork in between." />
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap grid-3" data-rv="stag">
          {guides.map((g, i) => (
            <Link key={g.slug} className="card" href={`/guides/${g.slug}/`}>
              <span className="k">GUIDE {String(i + 1).padStart(2, '0')}</span><h3>{g.h1}</h3><p>{g.dek}</p><span className="go">Read →</span>
            </Link>
          ))}
        </div>
      </section>
      <Cta />
    </>
  );
}
