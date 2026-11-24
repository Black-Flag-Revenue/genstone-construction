import type { AnchorHTMLAttributes } from 'react';
/** Plain anchor (no client-side prefetching) — static pages load straight from the CDN. */
export default function A({ href, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; prefetch?: boolean }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { prefetch, ...props } = rest as typeof rest & { prefetch?: boolean };
  return <a href={href} {...props} />;
}
