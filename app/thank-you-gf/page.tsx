import Link from '@/components/A';
import type { Metadata } from 'next';
import { meta } from '@/lib/seo';
export const metadata: Metadata = meta({ title: 'Thank You | Genstone Construction', description: 'Thanks for contacting Genstone Construction. Our team will be in touch shortly about your renovation project.', path: '/thank-you-gf/', noindex: true });
export default function Page() {
  return (
    <section className="phero"><div className="wrap">
      <p className="eyebrow">Received</p>
      <h1 className="h1-s">Thank you. We&rsquo;ll be in touch shortly.</h1>
      <div className="btns"><Link className="btn btn-acc" href="/">Back to home</Link><Link className="btn btn-ghost" href="/guides/">Read investor guides</Link></div>
    </div></section>
  );
}
