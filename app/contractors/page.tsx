import type { Metadata } from 'next';
import { getPage } from '@/lib/content';
import { meta } from '@/lib/seo';
import { CorePage } from '@/components/Templates';
import { ContractorBand } from '@/components/Extra';
const SLUG = 'contractors';
const PATH = '/contractors/';
export function generateMetadata(): Metadata { const d = getPage(SLUG)!; return meta({ title: d.title, description: d.metaDescription, path: PATH }); }
export default function Page() {
  const doc = getPage(SLUG)!;
  return <CorePage doc={doc} path={PATH} crumbs={[{ name: 'Contractors', path: '/contractors/' }]} image="project-handshake" imageAlt="Genstone project manager with contractor partners" after={<ContractorBand />} />;
}
