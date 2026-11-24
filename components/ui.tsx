import Link from '@/components/A';
import meta from '@/lib/image-meta.json';
import { abs } from '@/lib/site';
import type { QA } from '@/lib/content';

type Meta = Record<string, { w: number; h: number; widths: number[] }>;
const M = meta as Meta;

/** Responsive WebP image from public/img. */
export function Img({ name, alt, sizes = '(max-width: 980px) 100vw, 50vw', priority = false, className }: {
  name: string; alt: string; sizes?: string; priority?: boolean; className?: string;
}) {
  const m = M[name];
  if (!m) return null;
  const largest = m.widths[m.widths.length - 1];
  const srcSet = m.widths.map((w) => `/img/${name}-${w}.webp ${Math.min(w, m.w)}w`).join(', ');
  const ratio = m.h / m.w;
  const w = Math.min(largest, m.w);
  return (
    <img
      src={`/img/${name}-${largest}.webp`}
      srcSet={srcSet}
      sizes={sizes}
      width={w}
      height={Math.round(w * ratio)}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      {...(priority ? { fetchPriority: 'high' as const } : {})}
      className={className}
    />
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

export const Arrow = () => (
  <svg className="arr" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

/** Plain text with blank-line paragraphs and "- " bullets → HTML. */
export function Prose({ text, className = 'prose' }: { text: string; className?: string }) {
  const blocks = (text || '').split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  return (
    <div className={className}>
      {blocks.map((b, i) => {
        const lines = b.split('\n').map((l) => l.trim()).filter(Boolean);
        if (lines.every((l) => l.startsWith('- '))) {
          return <ul key={i}>{lines.map((l, j) => <li key={j}>{l.slice(2)}</li>)}</ul>;
        }
        if (lines.length > 1 && lines.slice(1).every((l) => l.startsWith('- '))) {
          return (
            <div key={i}>
              <p>{lines[0]}</p>
              <ul>{lines.slice(1).map((l, j) => <li key={j}>{l.slice(2)}</li>)}</ul>
            </div>
          );
        }
        return <p key={i}>{lines.join(' ')}</p>;
      })}
    </div>
  );
}

/** Two-line headline split for the masked line reveal. */
export function Lines({ text }: { text: string }) {
  const parts = text.split(' | ');
  return <>{parts.map((p, i) => <span className="ln" key={i}><span>{p}</span></span>)}</>;
}

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const all = [{ name: 'Home', path: '/' }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="crumbs">
          {all.map((c, i) => (
            <li key={c.path}>
              {i === all.length - 1 ? <span aria-current="page">{c.name}</span> : <Link href={c.path}>{c.name}</Link>}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        itemListElement: all.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.path) })),
      }} />
    </>
  );
}

export function Faq({ items, schema = true }: { items: QA[]; schema?: boolean }) {
  if (!items?.length) return null;
  return (
    <>
      <div className="faq">
        {items.map((f, i) => (
          <details key={i} open={i === 0}>
            <summary>{f.q}</summary>
            <div className="a"><Prose text={f.a} className="" /></div>
          </details>
        ))}
      </div>
      {schema && (
        <JsonLd data={{
          '@context': 'https://schema.org', '@type': 'FAQPage',
          mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        }} />
      )}
    </>
  );
}

export const slugify = (s: string) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Long-form sections with a sticky table of contents. */
export function Sections({ sections, numbered = true, light = false }: { sections: { h2: string; body: string }[]; numbered?: boolean; light?: boolean }) {
  if (!sections?.length) return null;
  return (
    <div className="toc-layout">
      <nav className="toc" aria-label="On this page">
        <p>ON THIS PAGE</p>
        {sections.map((s) => <a key={s.h2} href={`#${slugify(s.h2)}`}>{s.h2}</a>)}
      </nav>
      <div>
        {sections.map((s, i) => (
          <section className="blk" key={s.h2} id={slugify(s.h2)} aria-labelledby={`h-${slugify(s.h2)}`}>
            {numbered && <span className="num">{String(i + 1).padStart(2, '0')}</span>}
            <h2 id={`h-${slugify(s.h2)}`}>{s.h2}</h2>
            <Prose text={s.body} className={light ? 'prose' : 'prose'} />
          </section>
        ))}
      </div>
    </div>
  );
}
