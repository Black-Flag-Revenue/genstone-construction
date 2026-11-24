// Finds sentences (8+ words) that appear in more than one content file.
import fs from 'node:fs';
import path from 'node:path';
const files = [];
for (const dir of ['cities', 'states', 'services', 'guides', 'pages']) {
  const base = path.join('content', dir);
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => { const p = path.join(d, e.name); e.isDirectory() ? walk(p) : p.endsWith('.json') && !p.includes('privacy') && !p.includes('terms') && files.push(p); });
  walk(base);
}
const seen = new Map();
const strings = (o, out = []) => { if (typeof o === 'string') out.push(o); else if (o && typeof o === 'object') Object.values(o).forEach((v) => strings(v, out)); return out; };
for (const f of files) {
  const txt = strings(JSON.parse(fs.readFileSync(f, 'utf8'))).join(' ');
  for (const s of txt.split(/(?<=[.?])\s+/)) {
    const k = s.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
    if (k.split(' ').length < 8) continue;
    if (!seen.has(k)) seen.set(k, new Set());
    seen.get(k).add(f);
  }
}
const d = [...seen].filter(([, v]) => v.size > 1);
console.log(`files: ${files.length}  duplicated sentences: ${d.length}`);
if (process.argv[2] === '-v') d.slice(0, 400).forEach(([k, v]) => console.log(`${v.size}x | ${k.slice(0, 110)} | ${[...v].map((x) => x.replace('content/', '')).join(', ')}`));
