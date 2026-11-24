export const SITE = {
  url: 'https://www.genstoneconstruction.com',
  name: 'Genstone Construction',
  legalName: 'Genstone Construction',
  tagline: 'Building Quality. Delivering Results.',
  phone: '(312) 429-2637',
  phoneHref: 'tel:+13124292637',
  phoneE164: '+1-312-429-2637',
  street: '1267 Windham Parkway',
  city: 'Romeoville',
  region: 'IL',
  zip: '60446',
  geo: { lat: 41.6556, lng: -88.0623 },
  gtm: 'GTM-W5BBK5L',
  financingUrl: 'https://genstonefinancial.com',
  companiesUrl: 'https://genstonecompanies.com',
  ogImage: '/img/og-default.jpg',
};

export const abs = (path: string) => SITE.url + (path.startsWith('/') ? path : '/' + path);

export type ServiceKey =
  | 'fix-flip' | 'brrrr' | 'rental-renovation' | 'multifamily-renovation' | 'fha-203k' | 'reo-renovation'
  | 'rental-turns' | 'pre-offer-rehab-review' | 'institutional-renovation';

/** All service pages. `combo: true` services also get a page in every city. */
export const SERVICES: { key: ServiceKey; name: string; short: string; combo: boolean; image: string; blurb: string }[] = [
  { key: 'fix-flip', name: 'Fix & Flip', short: 'Fix & Flip', combo: true, image: 'crew-kitchen-install', blurb: 'Buyer-facing finishes priced against your ARV and a schedule built around the listing date.' },
  { key: 'brrrr', name: 'BRRRR', short: 'BRRRR', combo: true, image: 'drywall-finishing', blurb: 'Renovate to the appraisal the refinance needs with rental-grade materials that last between tenants.' },
  { key: 'rental-renovation', name: 'Rental Renovations', short: 'Rentals', combo: true, image: 'finish-selections', blurb: 'Repeatable scopes and durable finishes for single-family rental portfolios and funds.' },
  { key: 'multifamily-renovation', name: 'Small Multifamily (2–4 Units)', short: '2–4 Units', combo: true, image: 'townhome-row', blurb: 'Duplex to fourplex renovations phased so the building keeps earning while it improves.' },
  { key: 'fha-203k', name: 'FHA 203(k) Renovations', short: 'FHA 203(k)', combo: true, image: 'ranch-for-sale', blurb: 'Certified 203(k) contractor for buyers, agents and lenders financing the fix in the same loan.' },
  { key: 'reo-renovation', name: 'REO & Bank-Owned', short: 'REO', combo: true, image: 'interior-mid-renovation', blurb: 'Repairs for servicers, banks and GSEs that bring vacant, distressed assets to market.' },
  { key: 'rental-turns', name: 'Rental Turns & Make-Ready', short: 'Rental Turns', combo: false, image: 'keys-handoff', blurb: 'Fast, documented turns between tenants so vacancy days stay short.' },
  { key: 'pre-offer-rehab-review', name: 'Free Pre-Offer Rehab Review', short: 'Rehab Review', combo: false, image: 'brick-house-for-sale', blurb: 'Repair costs, a refined ARV and a straight answer on the offer, before you commit capital.' },
  { key: 'institutional-renovation', name: 'Institutional Clients', short: 'Institutional', combo: false, image: 'blueprint-review', blurb: 'Servicers, REITs, funds, banks and GSEs: documentation built for institutional files.' },
];
export const COMBO_SERVICES = SERVICES.filter((s) => s.combo);
export const serviceByKey = (k: string) => SERVICES.find((s) => s.key === k);

/** Combo-page search phrasing per service, used for headings and link text. */
export const COMBO_LABEL: Record<string, string> = {
  'fix-flip': 'Fix and Flip Contractor',
  brrrr: 'BRRRR Renovation Contractor',
  'rental-renovation': 'Rental Property Renovation',
  'multifamily-renovation': 'Duplex & 2–4 Unit Renovation',
  'fha-203k': 'FHA 203(k) Contractor',
  'reo-renovation': 'REO & Bank-Owned Renovation',
};
