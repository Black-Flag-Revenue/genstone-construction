import type { Metadata } from 'next';
import { getPage } from '@/lib/content';
import { meta } from '@/lib/seo';
import { CorePage } from '@/components/Templates';
import { ContractorBand } from '@/components/Extra';
const SLUG = 'pre-application-checklist';
const PATH = '/contractors/pre-application-check-list/';
export function generateMetadata(): Metadata { const d = getPage(SLUG)!; return meta({ title: d.title, description: d.metaDescription, path: PATH }); }
export default function Page() {
  const doc = getPage(SLUG)!;
  return <CorePage doc={doc} path={PATH} crumbs={[{ name: 'Contractors', path: '/contractors/' }, { name: 'Pre-Application Checklist', path: '/contractors/pre-application-check-list/' }]}   after={<ContractorBand />} />;
}
