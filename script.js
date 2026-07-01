/* Profile Script — v5 Premium Redesign */

const NO_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── SKELETON ──
(function skel() {
  const el = document.getElementById('skel');
  if (!el || NO_MOTION) { if (el) el.remove(); return; }
  const hide = () => { el.classList.add('hide'); setTimeout(() => el.remove(), 400); };
  let done = false;
  const timer = setTimeout(() => { if (!done) { done = true; hide(); } }, 1000);
  window.addEventListener('load', () => { if (!done) { done = true; clearTimeout(timer); hide(); } }, { once: true });
})();

// ── THEME ──
(function theme() {
  const btn = document.getElementById('theme-btn');
  const html = document.documentElement;
  if (!btn) return;

  const saved = localStorage.getItem('theme');
  if (saved) html.setAttribute('data-theme', saved);

  requestAnimationFrame(() => html.classList.add('theme-ready'));

  btn.addEventListener('click', () => {
    const cur = html.getAttribute('data-theme') || 'light';
    const next = cur === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
})();

// ── STATUS ──
(function status() {
  const t = document.getElementById('status-text');
  const d = document.getElementById('status-dot');
  if (!t || !d) return;
  const fn = () => {
    const p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Ho_Chi_Minh', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
    const h = Number(p.find(x => x.type === 'hour')?.value ?? 0);
    const m = Number(p.find(x => x.type === 'minute')?.value ?? 0);
    const on = h * 60 + m >= 21 * 60 || h * 60 + m <= 5 * 60;
    t.textContent = on ? 'Online' : 'Offline';
    d.classList.toggle('off', !on);
  };
  fn(); setInterval(fn, 30000);
})();

// ── SCROLL PROGRESS ──
(function scrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + '%';
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// ── HAMBURGER ──
(function ham() {
  const b = document.getElementById('nav-ham');
  const l = document.getElementById('nav-links');
  if (!b || !l) return;
  const close = () => { l.classList.remove('open'); b.classList.remove('open'); b.setAttribute('aria-expanded', 'false'); };
  b.addEventListener('click', () => { const o = l.classList.toggle('open'); b.classList.toggle('open', o); b.setAttribute('aria-expanded', String(o)); });
  l.querySelectorAll('.nav-link').forEach(a => a.addEventListener('click', close));
  document.addEventListener('click', e => { if (!e.target.closest('.nav-inner') && l.classList.contains('open')) close(); });
})();

// ── NAV SCROLL ──
(function navS() {
  const n = document.getElementById('nav');
  if (!n) return;
  window.addEventListener('scroll', () => n.classList.toggle('scrolled', window.scrollY > 60), { passive: true });
})();

// ── NAV ACTIVE ──
(function navA() {
  const links = document.querySelectorAll('.nav-link');
  const secs = document.querySelectorAll('section[id]');
  if (!links.length || !secs.length) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY + 130; let cur = '';
    secs.forEach(s => { const t = s.offsetTop, h = s.offsetHeight; if (y >= t && y < t + h) cur = s.id; });
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur));
  }, { passive: true });
})();

// ── REVEAL ──
(function reveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const p = e.target.closest('.proj-grid') || e.target.closest('.about-grid') || e.target.closest('.skills-layout') || e.target.closest('.why-grid') || e.target.closest('.contact-grid') || e.target.closest('.timeline') || e.target.closest('.tag-group') || e.target.parentElement;
      const s = Array.from(p.querySelectorAll('.reveal'));
      e.target.style.transitionDelay = `${s.indexOf(e.target) * 0.06}s`;
      e.target.classList.add('show');
      obs.unobserve(e.target);
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });
  els.forEach(el => obs.observe(el));
})();

// ── SKILL BARS ──
(function skills() {
  const fills = document.querySelectorAll('.sk-fill');
  const vals = document.querySelectorAll('.sk-val');
  if (!fills.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const i = Array.from(fills).indexOf(e.target);
      setTimeout(() => {
        const w = Number(e.target.dataset.w || 0);
        e.target.style.width = w + '%';
        if (vals[i]) {
          const n = Number(vals[i].dataset.n || w); let c = 0;
          const st = Math.ceil(n / 35);
          const t = setInterval(() => { c += st; if (c >= n) { c = n; clearInterval(t); } vals[i].textContent = c + '%'; }, 30);
        }
      }, i * 120);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.3 });
  fills.forEach(el => obs.observe(el));
})();

// ── TERMINAL ──
(function term() {
  const el = document.getElementById('term-txt');
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

// ── BACK TO TOP ──
(function backTop() {
  const btn = document.getElementById('back-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ── STATS COUNTER ──
(function statCount() {
  const nums = document.querySelectorAll('.stat-num');
  if (!nums.length || NO_MOTION) {
    nums.forEach(el => { el.textContent = el.dataset.target; });
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const target = Number(e.target.dataset.target || 0);
      let cur = 0;
      const step = Math.max(1, Math.ceil(target / 25));
      const t = setInterval(() => {
        cur += step;
        if (cur >= target) { cur = target; clearInterval(t); }
        e.target.textContent = cur;
      }, 40);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.5 });
  nums.forEach(el => obs.observe(el));
})();

// ── RIPPLE EFFECT ──
(function ripple() {
  const els = document.querySelectorAll('.card, .c-card, .skill, .info-card, .btn, .why-card, .ts-item, .tl-card');
  if (NO_MOTION) return;
  els.forEach(el => {
    el.style.position = 'relative';
    el.style.overflow = 'hidden';
    el.addEventListener('click', function(e) {
      const r = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      r.style.cssText = `position:absolute;pointer-events:none;width:${size}px;height:${size}px;left:${x}px;top:${y}px;border-radius:50%;background:currentColor;opacity:0.12;transform:scale(0);transition:transform 0.5s cubic-bezier(0.16,1,0.3,1),opacity 0.5s ease;`;
      this.appendChild(r);
      requestAnimationFrame(() => { r.style.transform = 'scale(1)'; r.style.opacity = '0'; });
      setTimeout(() => r.remove(), 600);
    });
  });
})();

// ── PARTICLES ──
(function particles() {
  if (NO_MOTION) return;
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];
  const PARTICLE_COUNT = 40;

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }

  function createParticle() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.3 + 0.1,
      color: isDark ? '0,176,155' : '0,110,94',
    };
  }

  function init() {
    resize();
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(createParticle());
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.opacity})`;
      ctx.fill();
    });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${particles[i].color},${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  init();
  draw();

  // Update colors on theme change
  const observer = new MutationObserver(() => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const color = isDark ? '0,176,155' : '0,110,94';
    particles.forEach(p => p.color = color);
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
})();

// ── MAGNETIC HOVER FOR BUTTONS ──
(function magnetic() {
  if (NO_MOTION) return;
  const btns = document.querySelectorAll('.btn');
  btns.forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      this.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
})();
