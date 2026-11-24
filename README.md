# genstoneconstruction.com

Static Next.js 16 site for Genstone Construction. It ships plain HTML with inlined CSS and one small script (`/site.js`), with no framework JavaScript at runtime.

## Deploy (Vercel)

`vercel.json` already sets everything up: framework `null`, build `npm run build`, output `out`, trailing slashes and redirects. Import the repo and deploy.

Set these environment variables so the forms deliver email through Resend:

| Variable | Example |
|---|---|
| `RESEND_API_KEY` | `re_…` |
| `LEAD_TO_EMAIL` | `leads@genstoneconstruction.com,ops@…` |
| `LEAD_FROM_EMAIL` | `Genstone Website <web@send.genstoneconstruction.com>` (must be a verified Resend domain) |

Every form (rehab review, contact, contractor application with document uploads) posts to `api/lead.js`.

Set the primary domain to `www.genstoneconstruction.com`. Canonicals, the sitemap and schema all use `www`. Point the apex domain at it with a redirect.

## Content

All copy lives in `content/` as JSON and is rendered by the routes in `app/`.

- `content/markets.json`: the 35 states and 123 cities
- `content/cities/{state}/{city}.json`: the city page plus six city × service pages
- `content/states/`, `content/services/`, `content/pages/`, `content/guides/`
- `content/BRIEF.md`: the writing rules (company facts, banned phrases, no invented numbers)

Checks:

```bash
npm run validate              # schema, word counts, banned phrases, numbers
node scripts/uniqueness.mjs   # 8-gram uniqueness across all location pages
```

## SEO

- `sitemap.xml` (all `www` URLs), `robots.txt`, `llms.txt` and `llms-full.txt`
- JSON-LD on every page: GeneralContractor, WebSite, BreadcrumbList, Service with areaServed, FAQPage, Article
- Breadcrumbs, canonical tags and Open Graph tags on every page
- Every URL from the old WordPress site is kept, and the old footer paths redirect
- IndexNow pings Bing and its partners after each push (`.github/workflows/indexnow.yml`)
- Google Tag Manager `GTM-W5BBK5L` loads after the first interaction so it never blocks paint

## Images

`npm run images` converts `_import/img/` originals to responsive WebP files in `public/img/`.
