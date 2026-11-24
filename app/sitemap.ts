import type { MetadataRoute } from 'next';
import { SERVICES, COMBO_SERVICES, abs } from '@/lib/site';
import { liveCities, liveStates, getState, listGuides, cityPath, statePath, comboPath } from '@/lib/content';

export const dynamic = 'force-static';
const NOW = new Date().toISOString();
const u = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly') => ({ url: abs(path), lastModified: NOW, changeFrequency, priority });

export default function sitemap(): MetadataRoute.Sitemap {
  const core = ['/', '/investors/', '/why-us/', '/our-partners/', '/project-gallery/', '/investor-resources/', '/investor-resources/arv-calculator/',
    '/investor-resources/financing/', '/investor-faqs/', '/contractors/', '/contractors/resources-for-contractors/', '/contractors/pre-application-check-list/',
    '/contractor-application/', '/contractor-faqs/', '/contact/', '/service-area/', '/guides/', '/privacy-policy/', '/terms-of-service/'];
  return [
    ...core.map((p) => u(p, p === '/' ? 1 : p.includes('policy') || p.includes('terms') ? 0.2 : 0.8, p === '/' ? 'weekly' : 'monthly')),
    ...SERVICES.map((s) => u(`/${s.key}/`, 0.9)),
    ...listGuides().map((g) => u(`/guides/${g.slug}/`, 0.7)),
    ...liveStates().filter((s) => getState(s.slug)).map((s) => u(statePath(s.slug), 0.8)),
    ...liveCities().map((c) => u(cityPath(c.state.slug, c.slug), 0.8)),
    ...liveCities().flatMap((c) => COMBO_SERVICES.filter((s) => c.doc.combos?.[s.key]).map((s) => u(comboPath(c.state.slug, c.slug, s.key), 0.7))),
  ];
}
