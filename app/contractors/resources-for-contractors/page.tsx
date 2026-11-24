import type { Metadata } from 'next';
import { getPage } from '@/lib/content';
import { meta } from '@/lib/seo';
import { CorePage } from '@/components/Templates';
import { ContractorBand } from '@/components/Extra';
const SLUG = 'resources-for-contractors';
const PATH = '/contractors/resources-for-contractors/';
export function generateMetadata(): Metadata { const d = getPage(SLUG)!; return meta({ title: d.title, description: d.metaDescription, path: PATH }); }
export default function Page() {
  const doc = getPage(SLUG)!;
  return <CorePage doc={doc} path={PATH} crumbs={[{ name: 'Contractors', path: '/contractors/' }, { name: 'Resources for Contractors', path: '/contractors/resources-for-contractors/' }]} image="drywall-finishing" imageAlt="Contractor finishing drywall" after={<ContractorBand />} />;
}
