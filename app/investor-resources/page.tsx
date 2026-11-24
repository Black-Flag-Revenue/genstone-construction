import type { Metadata } from 'next';
import { getPage } from '@/lib/content';
import { meta } from '@/lib/seo';
import { CorePage } from '@/components/Templates';
import { ResourceCards } from '@/components/Extra';
const SLUG = 'investor-resources';
const PATH = '/investor-resources/';
export function generateMetadata(): Metadata { const d = getPage(SLUG)!; return meta({ title: d.title, description: d.metaDescription, path: PATH }); }
export default function Page() {
  const doc = getPage(SLUG)!;
  return <CorePage doc={doc} path={PATH} crumbs={[{ name: 'Investor Resources', path: '/investor-resources/' }]} image="calculator" imageAlt="Calculator and property paperwork" before={<ResourceCards />} />;
}
