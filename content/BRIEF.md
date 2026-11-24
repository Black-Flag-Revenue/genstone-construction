# Genstone Construction — content brief (read fully before writing)

You are writing pages for the rebuilt genstoneconstruction.com. The site must rank in Google for investor-renovation searches in every city listed in `content/markets.json`, and be the kind of page AI assistants quote. Every page is hand-written, long-form, specific and useful. No filler. No boilerplate. No two pages may share sentences.

## Who Genstone Construction is (facts you may use — use ONLY these about the company)

- Renovation contractor for real estate investors. HQ: 1267 Windham Parkway, Romeoville, IL 60446. Phone (312) 429-2637.
- Part of the Genstone Companies (Genstone Realty, Genstone Financial, Genstone Insurance, Genstone Property Management, Genstone Field Services, Title Clearing & Escrow). Genstone Financial offers DSCR rental loans, fix-and-flip loans, lines of credit and new construction loans. Field Services does property preservation, inspections, occupied maintenance, turn & make-ready, code compliance.
- Clients: individual investors, mortgage servicers, REITs, investment funds, banks (REO) and other mortgage lenders. Preferred contractor for Government-Sponsored Enterprises.
- FHA 203(k) Certified Contractor. Inc. 5000 (America's fastest-growing private companies) two years in a row. Best of Houzz 2025 Service.
- Work types: fix & flip, BRRRR, single-family rental, small multifamily (2–4 units), REO/bank-owned, FHA 203(k), rental turns.
- Process: FREE Pre-Offer Rehab Review (estimates repair costs, refines ARV, checks whether the numbers support the offer before capital is committed) → detailed scope document and estimate with labor, materials and draw schedule, often with multiple ARV plans/finish levels → a designated field manager / project manager from start to finish → permits, inspections, lien waivers and contractor compliance handled → progress, documentation and milestones visible without being on site → final billing.
- Team: Estimators, Field Managers, Repair Specialists, Billing. Executive team has 60+ years of combined construction experience (REO, fix-and-flip, single-family remodeling).
- Network: thousands of licensed and insured contractors — "national scale, local execution". Do NOT claim a local office in any city other than Romeoville, IL. Say Genstone coordinates vetted, licensed local contractors in the market.
- Payment: no upfront payment; construction draws tied to completed work; final payment after completion and the client's approval. Dumpster/debris costs are included in estimates.
- One-year workmanship warranty (tenant damage and normal wear are not covered).
- Featured past projects: Tampa, FL whole-home bungalow renovation; Barrington, IL kitchen/fireplace/bath; Woodridge, IL kitchen.

## Hard rules

1. (Only exception: the FHA 203(k) program thresholds Genstone's site already states — $5,000 minimum, $15,000 inspection threshold, $75,000 Limited cap.) NO invented statistics, prices, dollar figures, percentages, rankings, population counts, median prices, rent figures, days-on-market, or timelines in weeks. Qualitative only ("older", "a large share", "common", "tight"). If you are not certain a fact is true, leave it out.
2. Local facts must be real and well established: neighborhoods, housing eras and styles, foundation/basement types, climate, common building defects of that era (knob-and-tube, galvanized supply lines, cast-iron drains, lead paint pre-1978, asbestos in 1950s–70s materials, polybutylene, Chinese drywall in some 2001–2008 FL builds, slab moisture, expansive clay soils in TX, hurricane code in FL, frost depth in the north, etc.). Name the permitting body by its real common name when you know it (e.g., "City of Chicago Department of Buildings"); otherwise say "the city's building department".
3. No guarantee, disclaimer or legal-style language. Don't over-promise. Never say "guaranteed", "best", "#1", "cheapest", "fastest".
4. Banned words/phrases: nestled, vibrant, bustling, tapestry, hidden gem, look no further, whether you're, in today's market, game-changer, seamless, unlock, elevate, delve, navigate the complexities, peace of mind, one-stop shop, top-notch, we've got you covered, ever-evolving, landscape (metaphor), robust. No exclamation marks. Use em dashes sparingly (max one per section).
5. Write like an experienced rehab estimator talking to an investor: plain, specific, numbers-literate but without numbers. Second person ("you") is fine.
6. Every combo (city × service) block must be about THAT service in THAT city. It must reference the city's real housing stock/neighborhoods/climate/permits in a way that changes the advice for that strategy. A paragraph that would still be true if you swapped the city name is a failure — rewrite it.
7. Vary structure and openings. Do not start multiple combos the same way. Do not reuse a sentence anywhere.
8. Text format: plain text. Paragraphs separated by a blank line (`\n\n`). A bullet list is allowed as lines beginning `- `. No markdown headings, bold, or links inside body text.

## Combo services (6) — `combos` keys

| key | page target search | angle |
|---|---|---|
| `fix-flip` | "fix and flip contractor {city}", "house flipping contractor {city}" | buyer-facing finishes, comps, speed to list, carrying cost |
| `brrrr` | "BRRRR contractor {city}", "rehab for refinance {city}" | renovate to the refi appraisal, rental-grade durability |
| `rental-renovation` | "rental property renovation {city}", "single family rental rehab {city}" | SFR portfolio standards, turnover durability, tenant-ready |
| `multifamily-renovation` | "duplex/2–4 unit renovation contractor {city}" | the city's real small-multifamily stock (two-flats, triple-deckers, shotgun doubles, fourplexes…), phasing occupied units, shared systems |
| `fha-203k` | "FHA 203k contractor {city}" | homebuyers/agents/lenders; standard vs limited; which local houses fit; consultant, bids, draws |
| `reo-renovation` | "REO / bank-owned property renovation {city}" | servicers, banks, GSEs, vacant-property conditions in this city (freeze damage, mold, vandalism, code violations, vacant-building registration where real) |

## Schema — one file per city: `content/cities/{state-slug}/{city-slug}.json`

```json
{
  "slug": "chicago",
  "name": "Chicago",
  "state": "illinois",
  "county": "Cook County",
  "metro": "Chicago metro",
  "neighborhoods": ["8–12 real neighborhood or suburb names"],
  "nearby": ["4–8 real nearby towns/suburbs"],
  "title": "≤ 60 chars, e.g. Investor Renovation Contractor in Chicago, IL | Genstone",
  "metaDescription": "140–158 chars, specific, includes city",
  "h1": "e.g. Investor Renovation Contractor in Chicago",
  "intro": "140–200 words",
  "housingStock": "280–380 words — eras, styles, construction, what that means for a rehab",
  "commonIssues": [{"title": "short", "body": "60–110 words"}],   // exactly 5
  "investorMarket": "200–280 words — qualitative: which strategies fit which parts of town and why",
  "permits": "150–230 words — who issues permits, what work typically needs them, inspections, any well-known local requirements",
  "climate": "120–180 words — how weather affects rehab scope and scheduling here",
  "faqs": [{"q": "...", "a": "60–110 words"}],                       // exactly 4
  "combos": {
    "fix-flip":               COMBO,
    "brrrr":                  COMBO,
    "rental-renovation":      COMBO,
    "multifamily-renovation": COMBO,
    "fha-203k":               COMBO,
    "reo-renovation":         COMBO
  }
}
```

COMBO:
```json
{
  "title": "≤ 60 chars, e.g. Fix and Flip Contractor in Chicago, IL | Genstone",
  "metaDescription": "140–158 chars",
  "h1": "e.g. Fix and Flip Renovations in Chicago",
  "intro": "110–160 words",
  "sections": [ {"h2": "specific heading", "body": "150–230 words"} ],   // exactly 3
  "faqs": [ {"q": "...", "a": "60–100 words"} ]                         // exactly 3
}
```
Each COMBO ≈ 650–900 words. Each city file ≈ 5,500–7,000 words total.

## Schema — one file per state: `content/states/{state-slug}.json`

```json
{
  "slug": "illinois",
  "title": "≤ 60 chars",
  "metaDescription": "140–158 chars",
  "h1": "...",
  "intro": "150–220 words",
  "sections": [{"h2": "...", "body": "180–280 words"}],   // exactly 4: housing across the state; investor strategies by region; permits/licensing landscape (general, accurate); weather & seasonality
  "faqs": [{"q": "...", "a": "60–110 words"}]              // exactly 4
}
```

## Workflow

1. Read `content/markets.json` for your cities.
2. Write each city file, then run `node scripts/validate-content.mjs content/cities/{state}/{city}.json` and fix every error before moving on.
3. Write the state file(s) and validate them the same way.
4. Valid JSON only (escape quotes). UTF-8. Curly apostrophes are fine.
