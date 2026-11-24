// Validates Genstone content JSON files against content/BRIEF.md.
// Usage: node scripts/validate-content.mjs <file.json> [...]
import fs from 'node:fs';
import path from 'node:path';

const BANNED = ['nestled', 'vibrant', 'bustling', 'tapestry', 'hidden gem', 'look no further', "whether you're", 'whether you are',
  "in today's market", 'game-changer', 'game changer', 'seamless', 'unlock', 'elevate', 'delve', 'navigate the complexities',
  'peace of mind', 'one-stop shop', 'top-notch', "we've got you covered", 'ever-evolving', 'robust', 'guarantee'];
const COMBOS = ['fix-flip', 'brrrr', 'rental-renovation', 'multifamily-renovation', 'fha-203k', 'reo-renovation'];
const wc = (s) => (typeof s === 'string' ? s.trim().split(/\s+/).filter(Boolean).length : 0);

function check(file) {
  const errs = [];
  let d;
  try { d = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { return [`invalid JSON: ${e.message}`]; }
  const need = (cond, msg) => { if (!cond) errs.push(msg); };
  const range = (label, s, lo, hi) => { const n = wc(s); need(n >= lo && n <= hi * 1.15, `${label}: ${n} words (want ${lo}-${hi})`); };
  const len = (label, s, lo, hi) => need(typeof s === 'string' && s.length >= lo && s.length <= hi, `${label}: ${s ? s.length : 0} chars (want ${lo}-${hi})`);
  const text = JSON.stringify(d).toLowerCase();
  for (const b of BANNED) if (text.includes(b)) errs.push(`banned phrase: "${b}"`);
  if (/!/.test(JSON.stringify(d).replace(/"[^"]*https?:[^"]*"/g, ''))) errs.push('exclamation mark found');
  // FHA 203(k) program thresholds stated on Genstone's own site are allowed.
  const money = JSON.stringify(d).replace(/\$(75,000|5,000|15,000)/g, '');
  if (/\$\s?\d|\d+\s?%|\d+\s?percent/i.test(money)) errs.push('dollar figure or percentage found (only the 203(k) $5,000/$15,000/$75,000 thresholds are allowed)');

  const isCity = file.includes(`${path.sep}cities${path.sep}`) || file.includes('/cities/');
  if (isCity) {
    need(d.slug && d.name && d.state, 'slug/name/state required');
    need(Array.isArray(d.neighborhoods) && d.neighborhoods.length >= 8, 'neighborhoods: need 8-12');
    need(Array.isArray(d.nearby) && d.nearby.length >= 4, 'nearby: need 4-8');
    len('title', d.title, 25, 62); len('metaDescription', d.metaDescription, 130, 160);
    range('intro', d.intro, 140, 200); range('housingStock', d.housingStock, 280, 380);
    range('investorMarket', d.investorMarket, 200, 280); range('permits', d.permits, 150, 230); range('climate', d.climate, 120, 180);
    need(Array.isArray(d.commonIssues) && d.commonIssues.length === 5, 'commonIssues: exactly 5');
    (d.commonIssues || []).forEach((c, i) => range(`commonIssues[${i}]`, c.body, 60, 110));
    need(Array.isArray(d.faqs) && d.faqs.length === 4, 'faqs: exactly 4');
    (d.faqs || []).forEach((f, i) => range(`faqs[${i}]`, f.a, 60, 110));
    for (const k of COMBOS) {
      const c = (d.combos || {})[k];
      if (!c) { errs.push(`combos.${k} missing`); continue; }
      len(`${k}.title`, c.title, 25, 62); len(`${k}.metaDescription`, c.metaDescription, 130, 160);
      need(c.h1, `${k}.h1 missing`); range(`${k}.intro`, c.intro, 110, 160);
      need(Array.isArray(c.sections) && c.sections.length === 3, `${k}.sections: exactly 3`);
      (c.sections || []).forEach((s, i) => { need(s.h2, `${k}.sections[${i}].h2`); range(`${k}.sections[${i}]`, s.body, 150, 230); });
      need(Array.isArray(c.faqs) && c.faqs.length === 3, `${k}.faqs: exactly 3`);
      (c.faqs || []).forEach((f, i) => range(`${k}.faqs[${i}]`, f.a, 60, 100));
      if (d.name && !JSON.stringify(c).includes(d.name)) errs.push(`${k}: never mentions ${d.name}`);
    }
  } else if (file.includes('/states/')) {
    len('title', d.title, 25, 62); len('metaDescription', d.metaDescription, 130, 160); need(d.h1, 'h1');
    range('intro', d.intro, 150, 220);
    need(Array.isArray(d.sections) && d.sections.length === 4, 'sections: exactly 4');
    (d.sections || []).forEach((s, i) => range(`sections[${i}]`, s.body, 180, 280));
    need(Array.isArray(d.faqs) && d.faqs.length === 4, 'faqs: exactly 4');
    (d.faqs || []).forEach((f, i) => range(`faqs[${i}]`, f.a, 60, 110));
  }
  const total = wc(JSON.stringify(d).replace(/"[a-zA-Z0-9]+":/g, ' ').replace(/[{}\[\]",]/g, ' '));
  return { errs, total };
}

let bad = 0;
for (const f of process.argv.slice(2)) {
  const r = check(f);
  const errs = Array.isArray(r) ? r : r.errs;
  if (errs.length) { bad++; console.log(`✗ ${f}\n  - ${errs.join('\n  - ')}`); }
  else console.log(`✓ ${f} (${r.total} words)`);
}
process.exit(bad ? 1 : 0);
