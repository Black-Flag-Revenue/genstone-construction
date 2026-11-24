import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header, Footer } from '@/components/Chrome';
import { MotionScript } from '@/components/Motion';
import { JsonLd } from '@/components/ui';
import { SITE, abs } from '@/lib/site';
import { STATES } from '@/lib/content';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'Renovation Contractor for Real Estate Investors | Genstone Construction', template: '%s' },
  description: 'Investor renovation contractor for fix and flip, BRRRR, rentals, 2–4 unit, REO and FHA 203(k) projects across 35 states. Free Pre-Offer Rehab Review.',
  applicationName: SITE.name,
  formatDetection: { telephone: false },
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }], apple: '/apple-touch-icon.png' },
  openGraph: { siteName: SITE.name, type: 'website', locale: 'en_US', images: [{ url: '/img/og-default.jpg', width: 1200, height: 630, alt: 'Genstone Construction' }] },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
};

export const viewport: Viewport = { themeColor: '#0B0D0E', width: 'device-width', initialScale: 1 };

const org = {
  '@context': 'https://schema.org',
  '@type': ['GeneralContractor', 'HomeAndConstructionBusiness'],
  '@id': abs('/#organization'),
  name: SITE.name,
  url: SITE.url,
  logo: abs('/img/logo-genstone-construction.svg'),
  image: abs('/img/og-default.jpg'),
  slogan: SITE.tagline,
  telephone: SITE.phoneE164,
  address: { '@type': 'PostalAddress', streetAddress: SITE.street, addressLocality: SITE.city, addressRegion: SITE.region, postalCode: SITE.zip, addressCountry: 'US' },
  geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
  areaServed: STATES.map((s) => ({ '@type': 'State', name: s.name })),
  parentOrganization: { '@type': 'Organization', name: 'Genstone Companies', url: SITE.companiesUrl },
  award: ['Inc. 5000 (two consecutive years)', 'Best of Houzz 2025 Service'],
  hasCredential: [{ '@type': 'EducationalOccupationalCredential', name: 'FHA 203(k) Certified Contractor' }],
  knowsAbout: ['Fix and flip renovation', 'BRRRR renovation', 'Single-family rental renovation', 'Small multifamily renovation', 'REO property renovation', 'FHA 203(k) renovation', 'Rental turns and make-ready', 'After repair value (ARV)'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-gtm={SITE.gtm}>
      <head>
        <link rel="preload" href="/fonts/archivo-var.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={org} />
        <MotionScript />
      </body>
    </html>
  );
}
