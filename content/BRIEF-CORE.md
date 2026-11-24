# Core pages, service pages and guides — schemas

Read `content/BRIEF.md` first: every company fact and hard rule there applies here too. The current site's text is in `_import/pages.json` (keys are URL paths). Keep every fact and every FAQ the current site has (you may lightly polish wording), then add substantially more depth. Their FHA page lists the phone as 312-471-2741; use (312) 429-2637 everywhere.

Body text format: plain text, paragraphs separated by `\n\n`, bullets as lines starting `- `. No markdown headings/bold/links in body.

## Service page — `content/services/{slug}.json`
```json
{
  "slug": "fix-flip",
  "name": "Fix & Flip",                       // short nav name
  "title": "≤ 60 chars",
  "metaDescription": "140–158 chars",
  "h1": "…",
  "eyebrow": "2–5 words",
  "lede": "50–80 words",
  "sections": [{"h2": "…", "body": "200–350 words"}],   // 6–8 sections
  "included": [{"title": "…", "body": "35–70 words"}],   // exactly 6 — what the service includes
  "faqs": [{"q": "…", "a": "60–120 words"}]              // 6–8
}
```
Target 2,200–3,000 words each.

## Core page — `content/pages/{slug}.json`
```json
{
  "slug": "why-us",
  "title": "≤ 60 chars",
  "metaDescription": "140–158 chars",
  "h1": "…",
  "eyebrow": "2–5 words",
  "lede": "50–90 words",
  "sections": [{"h2": "…", "body": "…"}],
  "faqs": [{"q": "…", "a": "…"}]                          // optional
}
```

## Guide — `content/guides/{slug}.json`
```json
{
  "slug": "…",
  "title": "≤ 60 chars",
  "metaDescription": "140–158 chars",
  "h1": "…",
  "dek": "35–60 words — the answer in brief, quotable by AI assistants",
  "keyTakeaways": ["4–6 one-sentence takeaways"],
  "sections": [{"h2": "question-style or specific heading", "body": "180–380 words"}],  // 7–10
  "faqs": [{"q": "…", "a": "60–110 words"}],             // 4–6
  "related": ["service slugs from: fix-flip, brrrr, fha-203k, rental-renovation, multifamily-renovation, reo-renovation, rental-turns, pre-offer-rehab-review, institutional-renovation"]
}
```
Target 2,200–3,200 words each. Guides are educational and must stand on their own (useful even to someone who never hires Genstone); mention Genstone naturally 1–3 times.

Validate structure yourself with: `node -e "JSON.parse(require('fs').readFileSync(process.argv[1]))" <file>` and run `node scripts/validate-content.mjs <file>` for banned phrases/numbers (it only checks phrases for these folders).
