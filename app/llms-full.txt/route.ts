import { SERVICES, abs } from '@/lib/site';
import { getService, listGuides, getPage } from '@/lib/content';
export const dynamic = 'force-static';

export function GET() {
  const L: string[] = ['# Genstone Construction — full reference', ''];
  for (const s of SERVICES) {
    const d = getService(s.key); if (!d) continue;
    L.push(`## ${d.h1}`, `URL: ${abs(`/${s.key}/`)}`, '', d.lede, '');
    for (const x of d.sections) L.push(`### ${x.h2}`, '', x.body, '');
    for (const f of d.faqs) L.push(`Q: ${f.q}`, `A: ${f.a}`, '');
  }
  for (const n of ['investor-faqs', 'contractor-faqs', 'why-us']) {
    const d = getPage(n); if (!d) continue;
    L.push(`## ${d.h1}`, '');
    for (const x of d.sections) L.push(`### ${x.h2}`, '', x.body, '');
    for (const f of d.faqs || []) L.push(`Q: ${f.q}`, `A: ${f.a}`, '');
  }
  for (const g of listGuides()) {
    L.push(`## ${g.h1}`, `URL: ${abs(`/guides/${g.slug}/`)}`, '', g.dek, '');
    for (const x of g.sections) L.push(`### ${x.h2}`, '', x.body, '');
  }
  return new Response(L.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
