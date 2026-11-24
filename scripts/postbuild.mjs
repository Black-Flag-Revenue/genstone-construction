// Inlines the site stylesheet into every HTML page (removes the render-blocking CSS request)
// and writes the IndexNow key file.
import fs from 'node:fs';
import path from 'node:path';
const OUT = 'out';
const cssFiles = new Map();
function walk(dir, fn) { for (const e of fs.readdirSync(dir, { withFileTypes: true })) { const p = path.join(dir, e.name); e.isDirectory() ? walk(p, fn) : fn(p); } }
walk(path.join(OUT, '_next', 'static'), (p) => { if (p.endsWith('.css')) cssFiles.set('/' + path.relative(OUT, p).split(path.sep).join('/'), fs.readFileSync(p, 'utf8')); });
let pages = 0;
walk(OUT, (p) => {
  if (!p.endsWith('.html')) return;
  let html = fs.readFileSync(p, 'utf8');
  html = html.replace(/<link rel="stylesheet" href="([^"]+\.css)"[^>]*\/?>/g, (m, href) => {
    const css = cssFiles.get(href.split('?')[0]);
    return css ? `<style>${css.replace(/<\/style/gi, '<\\/style')}</style>` : m;
  });
  // drop preload hints for the CSS we just inlined
  html = html.replace(/<link rel="preload" href="[^"]+\.css"[^>]*\/?>/g, '');
  // ship zero framework JS: every interactive piece is server-rendered and driven by /site.js
  html = html.replace(/<link rel="preload" as="script"[^>]*\/?>/g, '');
  html = html.replace(/<script src="\/_next\/[^"]+"[^>]*><\/script>/g, '');
  html = html.replace(/<script id="_R_">[\s\S]*?<\/script>/g, '');
  html = html.replace(/<script>\(self\.__next_f[\s\S]*?<\/script>/g, '');
  html = html.replace(/<script>self\.__next_f[\s\S]*?<\/script>/g, '');
  html = html.replace(/<link rel="stylesheet" href="\/_next\/[^"]+\.css"[^>]*\/?>/g, '');
  fs.writeFileSync(p, html); pages++;
});
// remove client-router payload files (not used without the React runtime)
let removed = 0;
walk(OUT, (p) => { const b = path.basename(p); if (b === 'index.txt' || /^__next\..*\.txt$/.test(b)) { fs.unlinkSync(p); removed++; } });
for (const f of fs.readdirSync(path.join(OUT, '_next', 'static', 'chunks'))) if (f.endsWith('.js')) { fs.unlinkSync(path.join(OUT, '_next', 'static', 'chunks', f)); }
console.log(`postbuild: removed ${removed} router payload files`);
const key = 'b7f3c1e94a2d4e5f8c6a0d1e2f3a4b5c';
fs.writeFileSync(path.join(OUT, `${key}.txt`), key);
console.log(`postbuild: inlined CSS into ${pages} pages (${[...cssFiles.keys()].length} css files)`);
