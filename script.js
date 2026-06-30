/* Profile Script - Redesigned v3 */

const T_DEFAULT = 'Trần Thiên Ân | Profile';
const T_AWAY   = 'Back soon, SuperDzAn!';
const NO_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('visibilitychange', () => {
  document.title = document.hidden ? T_AWAY : T_DEFAULT;
});

// ── SKELETON ──
(function skeleton() {
  const el = document.getElementById('skeleton');
  if (!el || NO_MOTION) { if (el) el.remove(); return; }

  const hide = () => { el.classList.add('hide'); setTimeout(() => el.remove(), 450); };

  const timer = setTimeout(hide, 900);
  window.addEventListener('load', () => { clearTimeout(timer); hide(); }, { once: true });
})();

// ── STATUS ──
(function status() {
  const text = document.getElementById('status-text');
  const dot  = document.getElementById('status-dot');
  if (!text || !dot) return;

  const update = () => {
    const p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Ho_Chi_Minh', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
    const h = Number(p.find(x => x.type === 'hour')?.value ?? 0);
    const m = Number(p.find(x => x.type === 'minute')?.value ?? 0);
    const on = h * 60 + m >= 21 * 60 || h * 60 + m <= 5 * 60;
    text.textContent = on ? 'Online' : 'Offline';
    dot.classList.toggle('off', !on);
  };
  update();
  setInterval(update, 30000);
})();

// ── HAMBURGER ──
(function ham() {
  const btn   = document.getElementById('nav-ham');
  const links = document.getElementById('nav-links');
  if (!btn || !links) return;

  const close = () => { links.classList.remove('open'); btn.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); };

  btn.addEventListener('click', () => {
    const op = links.classList.toggle('open');
    btn.classList.toggle('open', op);
    btn.setAttribute('aria-expanded', String(op));
  });

  links.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', close));
  document.addEventListener('click', e => { if (!e.target.closest('.nav-inner') && links.classList.contains('open')) close(); });
})();

// ── NAV SCROLL ──
(function navScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 60); }, { passive: true });
})();

// ── NAV ACTIVE ──
(function navActive() {
  const links = document.querySelectorAll('.nav-link');
  const secs  = document.querySelectorAll('section[id]');
  if (!links.length || !secs.length) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY + 140;
    let cur = '';
    secs.forEach(s => { const t = s.offsetTop, h = s.offsetHeight; if (y >= t && y < t + h) cur = s.id; });
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur));
  }, { passive: true });
})();

// ── REVEAL (stagger) ──
(function reveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const parent = entry.target.closest('.proj-grid') || entry.target.closest('.about-grid') || entry.target.closest('.skills-list') || entry.target.closest('.contact-grid') || entry.target.parentElement;
      const sibs = Array.from(parent.querySelectorAll('.reveal'));
      const idx = sibs.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 0.07}s`;
      entry.target.classList.add('show');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => obs.observe(el));
})();

// ── SKILL BARS + COUNTER ──
(function skills() {
  const fills = document.querySelectorAll('.skill-fill');
  const vals  = document.querySelectorAll('.skill-val');
  if (!fills.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const idx = Array.from(fills).indexOf(entry.target);
      setTimeout(() => {
        const w = Number(entry.target.dataset.w || 0);
        entry.target.style.width = w + '%';
        if (vals[idx]) {
          const n = Number(vals[idx].dataset.n || w);
          let c = 0;
          const step = Math.ceil(n / 35);
          const t = setInterval(() => { c += step; if (c >= n) { c = n; clearInterval(t); } vals[idx].textContent = c + '%'; }, 30);
        }
      }, idx * 120);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.3 });

  fills.forEach(el => obs.observe(el));
})();

// ── TERMINAL TYPING ──
(function terminal() {
  const el = document.getElementById('terminal-text');
  if (!el) return;
  const txt = 'Are....you.....be.....my......night-friend?';
  let i = 0;

  const tick = () => {
    if (document.hidden) { setTimeout(tick, 220); return; }
    if (i <= txt.length) { el.textContent = txt.slice(0, i); i += 1; setTimeout(tick, 100); return; }
    setTimeout(() => { i = 0; el.textContent = ''; tick(); }, 2500);
  };
  tick();
})();

// ── SMOOTH SCROLL ──
(function smooth() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
})();
