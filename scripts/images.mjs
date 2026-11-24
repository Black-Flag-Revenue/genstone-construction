// Converts imported originals into responsive WebP files in public/img.
import sharp from 'sharp';
import fs from 'node:fs';
const SRC = '_import/img/';
const OUT = 'public/img/';
fs.mkdirSync(OUT, { recursive: true });
const MAP = {
  'project-tampa-kitchen': '2026_08_Tampa-2.jpg',
  'project-barrington-bath': '2026_08_Barrington-2.jpg',
  'project-woodridge-kitchen': '2026_08_Woodridge-Kitchen-3.jpg',
  'crew-kitchen-install': '2026_09_Guy-in-Overalls-Fixing-Kitchen.jpg',
  'drywall-finishing': '2026_09_construction-worker-smoothing-plaster-on-wall-indo-2026-03-27-02-05-02-utc.jpg',
  'interior-mid-renovation': '2026_09_home-renovations.jpg',
  'ranch-for-sale': '2026_09_fha-loans.jpg',
  'brick-house-for-sale': '2026_09_small-modest-home-forsale.jpg',
  'house-for-sale-sign': '2026_09_House-with-For-Sale-Sign.jpg',
  'townhome-row': '2026_08_field-services.jpg',
  'finish-selections': '2026_09_home-renovation-choices.jpg',
  'blueprint-review': '2026_09_architects-reviewing-blueprints-at-an-office-works-2026-01-09-07-44-32-utc.jpg',
  'plans-and-tablet': '2026_09_renovations.jpg',
  'project-handshake': '2026_09_project-management.jpg',
  'investor-meeting': '2026_09_investor-faq-hero.jpg',
  'construction-plans': '2026_08_Construction-Plans.jpg',
  'investor-financials': '2026_08_Financials-on-Computer-Screens.jpg',
  'keys-handoff': '2026_09_already-own-a-property.jpg',
  'genstone-companies': '2026_09_genstone-companies.jpg',
  'field-visit': '2026_08_Friendly-Service-Exchange.jpg',
  'calculator': '2026_08_financial.jpg',
};
const BADGES = {
  'badge-houzz-2025': '2026_08_2025BestofHouzzService-1.png',
  'badge-fha-203k': '2026_08_203k-logo-with-orange-background-1.png',
  'badge-inc-5000': '2026_09_Inc.-5000-Color-Medallion-Logo-1.png',
};
const meta = {};
for (const [name, file] of Object.entries(MAP)) {
  const img = sharp(SRC + file);
  const { width, height } = await img.metadata();
  meta[name] = { w: width, h: height, widths: [] };
  for (const w of [480, 960, 1600]) {
    if (w > width && w !== 480) continue;
    await sharp(SRC + file).resize({ width: Math.min(w, width) }).webp({ quality: 72, effort: 6 }).toFile(`${OUT}${name}-${w}.webp`);
    meta[name].widths.push(w);
  }
}
for (const [name, file] of Object.entries(BADGES)) {
  await sharp(SRC + file).resize({ width: 240 }).webp({ quality: 85, alphaQuality: 90 }).toFile(`${OUT}${name}.webp`);
  const m = await sharp(`${OUT}${name}.webp`).metadata();
  meta[name] = { w: m.width, h: m.height, widths: [] };
}
// partner logos (svg) and white construction logo
for (const n of ['Realty', 'Financial', 'Insurance', 'Property-Management', 'Field-Services', 'Construction']) {
  const f = `${SRC}2026_08_Genstone_${n}_Horizontal.svg`;
  if (fs.existsSync(f)) fs.copyFileSync(f, `${OUT}logo-genstone-${n.toLowerCase()}.svg`);
}
const logo = fs.readFileSync(`${SRC}2026_08_Genstone_Construction_Horizontal.svg`, 'utf8')
  .replace(/#18211f/gi, '#ffffff').replace(/#00569e/gi, '#ffffff');
fs.writeFileSync(`${OUT}logo-genstone-construction-white.svg`, logo);
await sharp(SRC + '2026_08_TCEVectorBlack-18.png').resize({ width: 320 }).webp({ quality: 85 }).toFile(`${OUT}logo-title-clearing-escrow.webp`);
fs.writeFileSync('lib/image-meta.json', JSON.stringify(meta, null, 1));
console.log('images:', Object.keys(meta).length);
