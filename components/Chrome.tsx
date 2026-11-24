import Link from '@/components/A';
import { SITE, SERVICES } from '@/lib/site';
import { STATES } from '@/lib/content';

const INVESTOR_LINKS = SERVICES.map((s) => ({ href: `/${s.key}/`, name: s.name, note: s.blurb }));

export function Header() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <div className="util">
        <div className="wrap">
          <span className="hide-s">Part of the Genstone Companies · Inc. 5000, two years running</span>
          <span style={{ display: 'flex', gap: 24 }}>
            <span className="hide-m">{SITE.street}, {SITE.city}, {SITE.region}</span>
            <a href={SITE.phoneHref}>{SITE.phone}</a>
          </span>
        </div>
      </div>
      <header className="hdr">
        <div className="wrap">
          <Link href="/" className="logo" aria-label="Genstone Construction home">
            <img src="/img/logo-genstone-construction-white.svg" alt="Genstone Construction" width="158" height="40" />
          </Link>
          <nav className="nav" aria-label="Primary">
            <div className="dd">
              <Link className="nl" href="/investors/">Investor Services</Link>
              <div className="ddm">
                {INVESTOR_LINKS.map((l) => (
                  <Link key={l.href} href={l.href}>{l.name}</Link>
                ))}
              </div>
            </div>
            <div className="dd">
              <Link className="nl" href="/why-us/">Why Genstone</Link>
              <div className="ddm">
                <Link href="/why-us/">Why Investors Choose Us</Link>
                <Link href="/project-gallery/">Project Gallery</Link>
                <Link href="/our-partners/">Our Partners</Link>
              </div>
            </div>
            <Link className="nl" href="/service-area/">Service Area</Link>
            <div className="dd">
              <Link className="nl" href="/investor-resources/">Resources</Link>
              <div className="ddm">
                <Link href="/investor-resources/arv-calculator/">ARV Calculator</Link>
                <Link href="/investor-resources/financing/">Financing</Link>
                <Link href="/investor-faqs/">Investor FAQs</Link>
                <Link href="/guides/">Investor Guides</Link>
              </div>
            </div>
            <div className="dd">
              <Link className="nl" href="/contractors/">Contractors</Link>
              <div className="ddm">
                <Link href="/contractors/">Join Our Network</Link>
                <Link href="/contractors/pre-application-check-list/">Pre-Application Checklist</Link>
                <Link href="/contractor-application/">Contractor Application</Link>
                <Link href="/contractors/resources-for-contractors/">Resources for Contractors</Link>
                <Link href="/contractor-faqs/">Contractor FAQs</Link>
              </div>
            </div>
          </nav>
          <Link className="btn btn-acc btn-sm" href="/pre-offer-rehab-review/#review">Free Rehab Review</Link>
          <details className="mnav">
            <summary aria-label="Open menu">
              <svg width="22" height="16" viewBox="0 0 22 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M0 1h22M0 8h22M0 15h22" /></svg>
            </summary>
            <div className="mpanel">
              <Link href="/investors/">Investor Services</Link>
              <div className="sub">{INVESTOR_LINKS.map((l) => <Link key={l.href} href={l.href}>{l.name}</Link>)}</div>
              <Link href="/service-area/">Service Area</Link>
              <Link href="/why-us/">Why Genstone</Link>
              <Link href="/project-gallery/">Project Gallery</Link>
              <Link href="/our-partners/">Our Partners</Link>
              <Link href="/investor-resources/">Investor Resources</Link>
              <Link href="/guides/">Investor Guides</Link>
              <Link href="/contractors/">Contractors</Link>
              <Link href="/contact/">Contact</Link>
              <a href={SITE.phoneHref}>Call {SITE.phone}</a>
            </div>
          </details>
        </div>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="fgrid">
          <div>
            <img src="/img/logo-genstone-construction-white.svg" alt="Genstone Construction" width="190" height="48" style={{ height: 48, width: 'auto' }} loading="lazy" />
            <p style={{ color: 'var(--mute)', fontSize: 15, lineHeight: 1.6, maxWidth: 340, margin: '18px 0 0' }}>{SITE.tagline} Renovation for real estate investors, lenders and FHA 203(k) buyers across 35 states.</p>
            <address className="mono" style={{ fontStyle: 'normal', fontSize: 13, color: 'var(--mute3)', lineHeight: 1.8, marginTop: 18 }}>
              {SITE.street}<br />{SITE.city}, {SITE.region} {SITE.zip}<br /><a href={SITE.phoneHref} style={{ display: 'inline', padding: 0 }}>{SITE.phone}</a>
            </address>
          </div>
          <div>
            <p className="fh">INVESTOR SERVICES</p>
            {SERVICES.slice(0, 6).map((s) => <Link key={s.key} href={`/${s.key}/`}>{s.name}</Link>)}
          </div>
          <div>
            <p className="fh">MORE SERVICES</p>
            {SERVICES.slice(6).map((s) => <Link key={s.key} href={`/${s.key}/`}>{s.name}</Link>)}
            <Link href="/service-area/">Service Area</Link>
            <Link href="/guides/">Investor Guides</Link>
          </div>
          <div>
            <p className="fh">COMPANY</p>
            <Link href="/why-us/">Why Genstone</Link>
            <Link href="/project-gallery/">Project Gallery</Link>
            <Link href="/our-partners/">Our Partners</Link>
            <Link href="/investor-resources/">Investor Resources</Link>
            <Link href="/investor-resources/arv-calculator/">ARV Calculator</Link>
            <Link href="/investor-faqs/">Investor FAQs</Link>
            <Link href="/contact/">Contact</Link>
          </div>
          <div>
            <p className="fh">CONTRACTORS</p>
            <Link href="/contractors/">Join Our Network</Link>
            <Link href="/contractors/pre-application-check-list/">Checklist</Link>
            <Link href="/contractor-application/">Apply</Link>
            <Link href="/contractors/resources-for-contractors/">Resources</Link>
            <Link href="/contractor-faqs/">Contractor FAQs</Link>
          </div>
        </div>
        <div className="fstates">
          <p className="fh">STATES WE SERVE</p>
          <div>{STATES.map((s) => <Link key={s.slug} href={`/service-area/${s.slug}/`}>{s.name}</Link>)}</div>
        </div>
        <div className="fbot">
          <span>© {new Date().getFullYear()} Genstone Construction · A Genstone Company</span>
          <span>
            Inc. 5000 · FHA 203(k) Certified · Best of Houzz 2025
            <Link href="/privacy-policy/">Privacy</Link>
            <Link href="/terms-of-service/">Terms</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
