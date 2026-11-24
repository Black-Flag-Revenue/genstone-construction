// 8-gram uniqueness across every city page and city×service page.
// For each page: share of its 8-word shingles that appear on no other page.
import fs from 'node:fs';
import path from 'node:path';
const pages = [];
const words = (t) => t.toLowerCase().replace(/[^a-z0-9' ]+/g, ' ').split(/\s+/).filter(Boolean);
for (const st of fs.readdirSync('content/cities')) for (const f of fs.readdirSync(path.join('content/cities', st))) {
  const d = JSON.parse(fs.readFileSync(path.join('content/cities', st, f), 'utf8'));
  const cityText = [d.intro, d.housingStock, d.investorMarket, d.permits, d.climate, ...d.commonIssues.map((c) => c.body), ...d.faqs.map((q) => q.q + ' ' + q.a)].join(' ');
  pages.push({ id: `${st}/${d.slug}`, text: cityText });
  for (const [k, c] of Object.entries(d.combos || {})) pages.push({ id: `${st}/${d.slug}/${k}`, text: [c.intro, ...c.sections.map((s) => s.h2 + ' ' + s.body), ...c.faqs.map((q) => q.q + ' ' + q.a)].join(' ') });
}
const owner = new Map();
const shingles = pages.map((p) => { const w = words(p.text); const s = new Set(); for (let i = 0; i + 8 <= w.length; i++) s.add(w.slice(i, i + 8).join(' ')); return s; });
shingles.forEach((s, i) => s.forEach((g) => owner.set(g, owner.has(g) && owner.get(g) !== i ? -1 : i)));
const scores = shingles.map((s, i) => { let u = 0; s.forEach((g) => { if (owner.get(g) === i) u++; }); return { id: pages[i].id, uniq: s.size ? u / s.size : 1, words: words(pages[i].text).length }; });
scores.sort((a, b) => a.uniq - b.uniq);
const avg = scores.reduce((n, s) => n + s.uniq, 0) / scores.length;
console.log(`pages: ${scores.length}  average uniqueness: ${(avg * 100).toFixed(1)}%  min: ${(scores[0].uniq * 100).toFixed(1)}%`);
console.log('lowest 10:'); scores.slice(0, 10).forEach((s) => console.log(`  ${(s.uniq * 100).toFixed(1)}%  ${s.words}w  ${s.id}`));
const words8 = scores.reduce((n, s) => n + s.words, 0); console.log(`total unique-page words: ${words8.toLocaleString()}`);
