import type { Metadata } from 'next';
import { abs } from './site';

export function meta({ title, description, path, image, noindex }: { title: string; description: string; path: string; image?: string; noindex?: boolean }): Metadata {
  const t = title.includes('Genstone') ? title : `${title} | Genstone Construction`;
  return {
    title: t,
    description,
    alternates: { canonical: abs(path) },
    openGraph: { title: t, description, url: abs(path), ...(image ? { images: [{ url: image }] } : {}) },
    twitter: { title: t, description },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export const webPage = (path: string, name: string, description: string, type = 'WebPage') => ({
  '@context': 'https://schema.org', '@type': type, '@id': abs(path) + '#webpage', url: abs(path), name, description,
  isPartOf: { '@id': abs('/#website') }, publisher: { '@id': abs('/#organization') }, inLanguage: 'en-US',
});
