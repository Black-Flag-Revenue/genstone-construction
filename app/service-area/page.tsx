import Link from '@/components/A';
import type { Metadata } from 'next';
import { Breadcrumbs, JsonLd, Lines } from '@/components/ui';
import { PageHero, TileMap, Cta, Strip } from '@/components/Blocks';
import { STATES, getCity, cityPath, statePath } from '@/lib/content';
import { meta, webPage } from '@/lib/seo';
import { COMBO_SERVICES } from '@/lib/site';

const PATH = '/service-area/';
export const metadata: Metadata = meta({
  title: 'Service Area: 35 States & 123 Cities | Genstone Construction',
  description: 'Genstone Construction renovates investment properties in 35 states. Find your state and city for local fix and flip, BRRRR, rental, 2–4 unit, REO and 203(k) work.',
  path: PATH,
});

export default function Page() {
  const total = STATES.reduce((n, s) => n + s.cities.filter((c) => getCity(s.slug, c.slug)).length, 0);
  return (
    <>
      <JsonLd data={webPage(PATH, 'Genstone Construction service area', 'States and cities served by Genstone Construction.', 'CollectionPage')} />
      <PageHero crumbs={<Breadcrumbs items={[{ name: 'Service Area', path: PATH }]} />} eyebrow="Scope & footprint"
        title="35 states. | One renovation standard."
        lede={`Headquartered in Romeoville, Illinois, Genstone coordinates thousands of licensed and insured contractors under one scoping, documentation and draw process. Pick a state, then a city, for what renovating there actually involves. ${total} city guides and counting.`}>
        <div className="btns in-2"><Link className="btn btn-acc" href="#states">Browse states</Link><Link className="btn btn-ghost" href="#review">Get a free rehab review</Link></div>
      </PageHero>
      <Strip />
      <section className="sec ink3"><div className="wrap split" style={{ alignItems: 'center' }}>
        <div><p className="eyebrow">Footprint map</p><h2 className="h2" data-rv="mask"><Lines text="Click a state." /></h2>
          <p className="lede">Orange states are active markets. Each state page covers housing stock, permitting, weather and the cities we serve there.</p></div>
        <TileMap />
      </div></section>
      <section id="states" className="sec">
        <div className="wrap">
          <h2 className="h2" style={{ marginBottom: 56 }}>Every state and city</h2>
          <div className="grid-3" style={{ gap: '44px 40px' }}>
            {STATES.map((st) => (
              <div key={st.slug}>
                <h3 style={{ fontSize: 24, marginBottom: 12 }}><Link href={statePath(st.slug)} style={{ textDecoration: 'none' }}>{st.name} <span className="acc">→</span></Link></h3>
                <div className="pills">
                  {st.cities.filter((c) => getCity(st.slug, c.slug)).map((c) => <Link key={c.slug} className="pill" href={cityPath(st.slug, c.slug)}>{c.name}</Link>)}
                </div>
              </div>
            ))}
          </div>
          <p className="mono" style={{ marginTop: 64, fontSize: 13, color: 'var(--mute)' }}>Every city page links to local {COMBO_SERVICES.map((s) => s.short).join(', ')} pages.</p>
        </div>
      </section>
      <Cta />
    </>
  );
}
