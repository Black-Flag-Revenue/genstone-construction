/* Genstone Construction — all client behaviour in one small file (no framework). */
(function () {
  var d = document, h = d.documentElement, W = window;
  var reduce = W.matchMedia && W.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || d).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };

  /* ---------- scroll reveals ---------- */
  if (!reduce && 'IntersectionObserver' in W) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.setAttribute('data-in', ''); io.unobserve(e.target); } });
    }, { threshold: 0.06, rootMargin: '0px 0px -6% 0px' });
    $$('[data-rv]').forEach(function (el) { io.observe(el); });
  } else {
    $$('[data-rv]').forEach(function (el) { el.setAttribute('data-in', ''); });
  }

  /* ---------- Google Tag Manager, deferred until interaction ---------- */
  var g = 0;
  function gtm() {
    if (g) return; g = 1;
    W.dataLayer = W.dataLayer || []; W.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    var s = d.createElement('script'); s.async = 1; s.src = 'https://www.googletagmanager.com/gtm.js?id=' + (h.getAttribute('data-gtm') || 'GTM-W5BBK5L'); d.head.appendChild(s);
  }
  ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(function (e) { addEventListener(e, gtm, { once: true, passive: true }); });
  setTimeout(gtm, 5000);

  /* ---------- tweens ---------- */
  var easeOut = function (k) { return 1 - Math.pow(1 - k, 3); };
  var inOut = function (k) { return k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; };
  function tween(obj, key, to, ms, ease, apply) {
    cancelAnimationFrame(obj['_r' + key]);
    var from = obj[key], t0 = 0;
    if (reduce || ms <= 1) { obj[key] = to; apply(to); return; }
    function step(ts) {
      if (!t0) t0 = ts;
      var k = Math.min(1, (ts - t0) / ms);
      obj[key] = from + (to - from) * ease(k); apply(obj[key]);
      if (k < 1) obj['_r' + key] = requestAnimationFrame(step);
    }
    obj['_r' + key] = requestAnimationFrame(step);
  }
  function restart(el, a, b) { el.classList.remove(a, b); void el.offsetWidth; el.classList.add(el._f ? a : b); el._f = !el._f; }

  /* ---------- generic tabs: [data-tabs] > [role=tab][data-panel] ---------- */
  $$('[data-tabs]').forEach(function (root) {
    var tabs = $$('[role=tab][data-panel]', root);
    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        if (t.getAttribute('aria-selected') === 'true') return;
        tabs.forEach(function (x) {
          var on = x === t, p = d.getElementById(x.getAttribute('data-panel'));
          x.setAttribute('aria-selected', on); x.classList.toggle('on', on);
          if (p) {
            p.hidden = !on;
            $$('input,select,textarea', p).forEach(function (f) { f.disabled = !on; });
            if (on) { var anim = $('.sp-in', p) || p; restart(anim, 'swap-a', 'swap-b'); }
          }
        });
      });
    });
  });

  /* ---------- scope board ---------- */
  var board = $('[data-board]');
  if (board) {
    var data = JSON.parse($('script[type="application/json"]', board).textContent);
    var st = { plan: 1, view: 'ext', pos: 55, rehab: data.plans[1].rehab, arv: data.plans[1].arv };
    var stage = $('.stage', board), rng = $('.rng', board);
    var rehabEl = $('[data-rehab]', board), arvEl = $('[data-arv]', board), weeksEl = $('[data-weeks]', board), verdict = $('[data-verdict]', board);
    var linesBox = $('.lines', board);
    var setPos = function (v) { stage.style.setProperty('--pos', v.toFixed(2) + '%'); rng.value = Math.round(v); };
    var fmtR = function (v) { return '$' + (v / 1000).toFixed(1) + 'k'; };
    var fmtA = function (v) { return '$' + Math.round(v / 1000) + 'k'; };
    var timer;
    function renderLines() {
      var p = data.plans[st.plan];
      $$('.leg', linesBox).forEach(function (b, i) {
        $('.nm', b).textContent = data.zones[st.view][i];
        $('.c', b).textContent = p[st.view][i];
      });
      $$('.seg', board).forEach(function (s) { $('.sub', s).textContent = s.getAttribute('data-view') === 'ext' ? p.extSub : p.intSub; });
    }
    function hot(i) {
      $$('.layer:not([hidden]) .zone', board).forEach(function (z) { z.classList.toggle('hot', +z.getAttribute('data-z') === i); });
      $$('.layer:not([hidden]) .pin', board).forEach(function (z) { z.classList.toggle('hot', +z.getAttribute('data-z') === i); });
      $$('.leg', board).forEach(function (l, k) { l.classList.toggle('hot', k === i); });
    }
    $$('.plan', board).forEach(function (b, i) {
      b.addEventListener('click', function () {
        if (i === st.plan) return;
        st.plan = i;
        $$('.plan', board).forEach(function (x, k) { x.classList.toggle('on', k === i); x.setAttribute('aria-selected', k === i); });
        var p = data.plans[i];
        tween(st, 'rehab', p.rehab, 650, easeOut, function (v) { rehabEl.textContent = fmtR(v); });
        tween(st, 'arv', p.arv, 650, easeOut, function (v) { arvEl.textContent = fmtA(v); });
        weeksEl.textContent = p.weeks; verdict.textContent = p.verdict;
        renderLines(); restart(linesBox, 'swap-a', 'swap-b'); restart(verdict, 'swap-a', 'swap-b');
      });
    });
    $$('.seg', board).forEach(function (b) {
      b.addEventListener('click', function () {
        var v = b.getAttribute('data-view'); if (v === st.view) return;
        clearTimeout(timer); st.view = v; board.classList.remove('intro');
        $$('.seg', board).forEach(function (x) { var on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-selected', on); });
        $$('.layer', board).forEach(function (l) { l.hidden = l.getAttribute('data-view') !== v; });
        hot(-1); renderLines(); restart(linesBox, 'swap-a', 'swap-b');
        st.pos = 12; setPos(12); tween(st, 'pos', 55, 900, inOut, setPos);
      });
    });
    $$('.leg', board).forEach(function (l, i) {
      ['mouseenter', 'focus'].forEach(function (e) { l.addEventListener(e, function () { hot(i); }); });
      ['mouseleave', 'blur'].forEach(function (e) { l.addEventListener(e, function () { hot(-1); }); });
    });
    rng.addEventListener('input', function () { clearTimeout(timer); cancelAnimationFrame(st._rpos); st.pos = +rng.value; setPos(st.pos); });
    if (!reduce) {
      board.classList.add('intro');
      st.pos = 0; setPos(0); rehabEl.textContent = fmtR(0); arvEl.textContent = fmtA(0); st.rehab = 0; st.arv = 0;
      setTimeout(function () {
        tween(st, 'rehab', data.plans[1].rehab, 1100, easeOut, function (v) { rehabEl.textContent = fmtR(v); });
        tween(st, 'arv', data.plans[1].arv, 1100, easeOut, function (v) { arvEl.textContent = fmtA(v); });
      }, 1500);
      timer = setTimeout(function () { tween(st, 'pos', 55, 1700, inOut, setPos); }, 2000);
    }
  }

  /* ---------- forms → /api/lead ---------- */
  $$('form[data-lead]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var fd = new FormData(f);
      if (fd.get('company_website')) return;
      var btn = $('button[type=submit]', f), err = $('.ferr', f), label = btn.firstChild.textContent;
      var files = [], total = 0, pending = [];
      $$('input[type=file]', f).forEach(function (inp) {
        var file = inp.files && inp.files[0]; fd.delete(inp.name);
        if (!file) return; total += file.size;
        pending.push(file.arrayBuffer().then(function (buf) {
          var bin = '', u = new Uint8Array(buf);
          for (var i = 0; i < u.length; i += 0x8000) bin += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000));
          files.push({ field: inp.name, filename: file.name, content: btoa(bin) });
        }));
      });
      if (total > 3.5 * 1024 * 1024) { err.textContent = 'Attachments are over 3.5 MB combined. Please compress them, or email documents after submitting.'; err.hidden = false; return; }
      btn.disabled = true; btn.firstChild.textContent = 'Sending… '; err.hidden = true;
      Promise.all(pending).then(function () {
        var payload = {}; fd.forEach(function (v, k) { payload[k] = v; });
        payload.kind = f.getAttribute('data-lead'); payload.page = location.pathname; if (files.length) payload.attachments = files;
        return fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      }).then(function (r) {
        if (!r.ok) throw 0;
        f.innerHTML = '<p class="fok" role="status">' + (f.getAttribute('data-ok') || 'Got it. We’ll be in touch shortly.') + '</p>';
        (W.dataLayer = W.dataLayer || []).push({ event: 'lead_submit', lead_kind: payload.kind });
      }).catch(function () {
        btn.disabled = false; btn.firstChild.textContent = label;
        err.textContent = 'That didn’t go through. Please call (312) 429-2637 and we’ll take it by phone.'; err.hidden = false;
      });
    });
  });

  /* ---------- ARV calculator ---------- */
  var calc = $('[data-calc]');
  if (calc) {
    var num = function (s) { return Number(String(s || '').replace(/[^0-9.]/g, '')) || 0; };
    var money = function (n) { return isFinite(n) ? n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }) : '—'; };
    var val = function (n) { var el = $('[name="' + n + '"]', calc); return el ? num(el.value) : 0; };
    var method = 'comps';
    function run() {
      var arv = 0;
      if (method === 'comps') { var c = [val('comp1'), val('comp2'), val('comp3')].filter(Boolean); arv = c.length ? c.reduce(function (a, b) { return a + b; }, 0) / c.length : 0; }
      if (method === 'sqft') arv = val('ppsf') * val('sqft');
      if (method === 'valueadd') arv = val('asIs') + val('lift');
      var repair = val('repair'), rule = Math.min(100, Math.max(1, val('rule') || 70)) / 100;
      var maxBid = arv * rule - repair, price = val('price') || Math.max(0, maxBid);
      var profit = arv - price - repair, roi = price + repair > 0 ? profit / (price + repair) : NaN;
      $('[data-out=arv]', calc).textContent = money(arv);
      $('[data-out=max]', calc).textContent = money(maxBid);
      $('[data-out=profit]', calc).textContent = money(profit);
      $('[data-out=roi]', calc).textContent = isFinite(roi) ? (roi * 100).toFixed(1) + '%' : '—';
      $('[data-out=rule]', calc).textContent = Math.round(rule * 100) + '%';
    }
    $$('[data-method]', calc).forEach(function (b) {
      b.addEventListener('click', function () {
        method = b.getAttribute('data-method');
        $$('[data-method]', calc).forEach(function (x) { var on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-checked', on); });
        $$('[data-mgroup]', calc).forEach(function (gp) { gp.hidden = gp.getAttribute('data-mgroup') !== method; });
        run();
      });
    });
    calc.addEventListener('input', run); calc.addEventListener('submit', function (e) { e.preventDefault(); }); run();
  }
})();
