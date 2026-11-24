// Verifies every internal href in out/ resolves to a built file.
import fs from 'node:fs';
import path from 'node:path';
const OUT = 'out'; const bad = new Map(); let n = 0, pages = 0;
function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else if (p.endsWith('.html')) check(p); } }
function exists(href) {
  const u = href.split('#')[0].split('?')[0]; if (!u) return true;
  const f = path.join(OUT, decodeURIComponent(u));
  return fs.existsSync(f) && fs.statSync(f).isFile() || fs.existsSync(path.join(f, 'index.html')) || fs.existsSync(f + '.html');
}
function check(file) {
  pages++;
  const html = fs.readFileSync(file, 'utf8');
  for (const m of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) { n++; if (!exists(m[1])) { const k = m[1]; bad.set(k, (bad.get(k) || new Set()).add(file.replace(OUT, ''))); } }
}
walk(OUT);
console.log(`checked ${n} internal links on ${pages} pages; broken targets: ${bad.size}`);
for (const [k, v] of [...bad].slice(0, 25)) console.log(`  ${k}  (on ${v.size} pages, e.g. ${[...v][0]})`);
process.exit(bad.size ? 1 : 0);
