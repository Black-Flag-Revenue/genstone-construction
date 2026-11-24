import type { Metadata } from 'next';
import { getPage } from '@/lib/content';
import { meta } from '@/lib/seo';
import { CorePage } from '@/components/Templates';
import { FinancingBand } from '@/components/Extra';
const SLUG = 'financing';
const PATH = '/investor-resources/financing/';
export function generateMetadata(): Metadata { const d = getPage(SLUG)!; return meta({ title: d.title, description: d.metaDescription, path: PATH }); }
export default function Page() {
  const doc = getPage(SLUG)!;
  return <CorePage doc={doc} path={PATH} crumbs={[{ name: 'Investor Resources', path: '/investor-resources/' }, { name: 'Financing', path: '/investor-resources/financing/' }]} image="investor-financials" imageAlt="Investor reviewing financing numbers" before={<FinancingBand />} />;
}
