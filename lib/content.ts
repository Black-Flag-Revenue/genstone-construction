import fs from 'node:fs';
import path from 'node:path';
import markets from '@/content/markets.json';

const ROOT = path.join(process.cwd(), 'content');

export type QA = { q: string; a: string };
export type Section = { h2: string; body: string };
export type Combo = { title: string; metaDescription: string; h1: string; intro: string; sections: Section[]; faqs: QA[] };
export type City = {
  slug: string; name: string; state: string; county?: string; metro?: string;
  neighborhoods: string[]; nearby: string[];
  title: string; metaDescription: string; h1: string; intro: string;
  housingStock: string; commonIssues: { title: string; body: string }[];
  investorMarket: string; permits: string; climate: string; faqs: QA[];
  combos: Record<string, Combo>;
};
export type StateDoc = { slug: string; title: string; metaDescription: string; h1: string; intro: string; sections: Section[]; faqs: QA[] };
export type ServiceDoc = {
  slug: string; name: string; title: string; metaDescription: string; h1: string; eyebrow: string; lede: string;
  sections: Section[]; included: { title: string; body: string }[]; faqs: QA[];
};
export type PageDoc = { slug: string; title: string; metaDescription: string; h1: string; eyebrow?: string; lede?: string; sections: Section[]; faqs?: QA[] };
export type GuideDoc = {
  slug: string; title: string; metaDescription: string; h1: string; dek: string; keyTakeaways: string[];
  sections: Section[]; faqs: QA[]; related: string[];
};

export type MarketState = { slug: string; abbr: string; name: string; cities: { slug: string; name: string }[] };
export const STATES: MarketState[] = (markets as { states: MarketState[] }).states
  .slice()
  .sort((a, b) => a.name.localeCompare(b.name));

const cache = new Map<string, unknown>();
function readJson<T>(rel: string): T | null {
  if (cache.has(rel)) return cache.get(rel) as T;
  const f = path.join(ROOT, rel);
  if (!fs.existsSync(f)) return null;
  try {
    const v = JSON.parse(fs.readFileSync(f, 'utf8')) as T;
    cache.set(rel, v);
    return v;
  } catch {
    return null;
  }
}

export const stateBySlug = (s: string) => STATES.find((x) => x.slug === s);
export const getState = (s: string) => readJson<StateDoc>(`states/${s}.json`);
export const getCity = (state: string, city: string) => readJson<City>(`cities/${state}/${city}.json`);
export const getService = (s: string) => readJson<ServiceDoc>(`services/${s}.json`);
export const getPage = (s: string) => readJson<PageDoc>(`pages/${s}.json`);
export const getGuide = (s: string) => readJson<GuideDoc>(`guides/${s}.json`);

export function listGuides(): GuideDoc[] {
  const dir = path.join(ROOT, 'guides');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.json'))
    .map((f) => getGuide(f.replace(/\.json$/, '')))
    .filter((g): g is GuideDoc => !!g && !!g.slug)
    .sort((a, b) => a.h1.localeCompare(b.h1));
}

/** Cities that have a written content file, with their state. */
export function liveCities() {
  const out: { state: MarketState; slug: string; name: string; doc: City }[] = [];
  for (const st of STATES) for (const c of st.cities) {
    const doc = getCity(st.slug, c.slug);
    if (doc) out.push({ state: st, slug: c.slug, name: c.name, doc });
  }
  return out;
}
export const liveStates = () => STATES.filter((s) => s.cities.some((c) => getCity(s.slug, c.slug)));
export const cityPath = (state: string, city: string) => `/service-area/${state}/${city}/`;
export const statePath = (state: string) => `/service-area/${state}/`;
export const comboPath = (state: string, city: string, svc: string) => `/service-area/${state}/${city}/${svc}/`;
