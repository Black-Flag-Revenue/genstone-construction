import { SITE, SERVICES, abs } from '@/lib/site';
import { STATES, getService, getCity, listGuides, cityPath, statePath, getPage } from '@/lib/content';
export const dynamic = 'force-static';

export function GET() {
  const L: string[] = [];
  L.push('# Genstone Construction', '');
  L.push(`> Renovation contractor for real estate investors, lenders and FHA 203(k) homebuyers, headquartered at ${SITE.street}, ${SITE.city}, ${SITE.region} ${SITE.zip} (${SITE.phone}). Part of the Genstone Companies. Serves 35 states with thousands of licensed and insured contractors, a free Pre-Offer Rehab Review, detailed scopes with multiple ARV plans, a designated field manager on every project, draws tied to completed work and a one-year workmanship warranty. FHA 203(k) Certified Contractor; preferred contractor for Government-Sponsored Enterprises; Inc. 5000 two years running; Best of Houzz 2025.`, '');
  L.push('Clients include individual investors, mortgage servicers, REITs, investment funds, banks (REO) and Government-Sponsored Enterprises. Genstone sister companies provide financing (Genstone Financial), brokerage (Genstone Realty), insurance, property management, field services and title (Title Clearing & Escrow).', '');
  L.push('## Services', '');
  for (const s of SERVICES) { const d = getService(s.key); L.push(`- [${s.name}](${abs(`/${s.key}/`)}): ${d?.metaDescription || s.blurb}`); }
  L.push('', '## Company', '');
  for (const [p, n] of [['/why-us/', 'why-us'], ['/our-partners/', 'our-partners'], ['/project-gallery/', 'project-gallery'], ['/investor-faqs/', 'investor-faqs'], ['/investor-resources/arv-calculator/', 'arv-calculator'], ['/investor-resources/financing/', 'financing'], ['/contractors/', 'contractors'], ['/contractor-faqs/', 'contractor-faqs'], ['/contact/', 'contact']] as const) {
    const d = getPage(n); if (d) L.push(`- [${d.h1}](${abs(p)}): ${d.metaDescription}`);
  }
  L.push('', '## Guides', '');
  for (const g of listGuides()) L.push(`- [${g.h1}](${abs(`/guides/${g.slug}/`)}): ${g.dek}`);
  L.push('', '## Service area', '');
  for (const st of STATES) {
    const cities = st.cities.filter((c) => getCity(st.slug, c.slug));
    if (!cities.length) continue;
    L.push(`- [${st.name}](${abs(statePath(st.slug))}): ${cities.map((c) => `[${c.name}](${abs(cityPath(st.slug, c.slug))})`).join(', ')}`);
  }
  L.push('', '## Optional', '', `- [Full text for AI assistants](${abs('/llms-full.txt')}): services, FAQs and guides in plain text`, `- [Sitemap](${abs('/sitemap.xml')})`, '');
  return new Response(L.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
