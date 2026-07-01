/* Profile Script — v6.1 Premium Visual Refinements */

const NO_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let isMobile = window.innerWidth < 640;
window.addEventListener('resize', () => { isMobile = window.innerWidth < 640; });

// ── SKELETON ──
(function skel() {
  const el = document.getElementById('skel');
  if (!el || NO_MOTION) { if (el) el.remove(); return; }
  const hide = () => { el.classList.add('hide'); setTimeout(() => el.remove(), 400); };
  let done = false;
  const timer = setTimeout(() => { if (!done) { done = true; hide(); } }, 800);
  window.addEventListener('load', () => { if (!done) { done = true; clearTimeout(timer); hide(); } }, { once: true });
})();

// ── THEME ──
(function theme() {
  const btn = document.getElementById('theme-btn');
  const html = document.documentElement;
  if (!btn) return;
  const saved = localStorage.getItem('theme');
  if (saved) html.setAttribute('data-theme', saved);

  // Use existing theme overlay from HTML
  const overlay = document.getElementById('theme-overlay');
  if (!overlay) return;

  let transitioning = false;
  btn.addEventListener('click', () => {
    if (transitioning) return;
    transitioning = true;
    const cur = html.getAttribute('data-theme') || 'light';
    const next = cur === 'dark' ? 'light' : 'dark';

    // Add transition class
    html.classList.add('theme-transitioning');

    // Show overlay
    overlay.className = 'theme-overlay ' + next + ' active';

    // After overlay covers screen, switch theme
    setTimeout(() => {
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);

      // Fade out overlay
      setTimeout(() => {
        overlay.classList.remove('active');
        setTimeout(() => {
          html.classList.remove('theme-transitioning');
          transitioning = false;
        }, 400);
      }, 50);
    }, 200);
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
    const st = window.scrollY;
    const dh = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = dh > 0 ? (st / dh) * 100 + '%' : '0%';
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// ── CURSOR GLOW ──
(function cursorGlow() {
  if (NO_MOTION || isMobile) return;
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;
  let mx = 0, my = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; glow.classList.add('active'); });
  document.addEventListener('mouseleave', () => glow.classList.remove('active'));
  function animate() {
    cx += (mx - cx) * 0.08;
    cy += (my - cy) * 0.08;
    glow.style.left = cx + 'px';
    glow.style.top = cy + 'px';
    requestAnimationFrame(animate);
  }
  animate();
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
(function navScroll() {
  const n = document.getElementById('nav');
  if (!n) return;
  window.addEventListener('scroll', () => n.classList.toggle('scrolled', window.scrollY > 40), { passive: true });
})();

// ── NAV ACTIVE ──
(function navActive() {
  const links = document.querySelectorAll('.nav-link');
  const secs = document.querySelectorAll('section[id]');
  if (!links.length || !secs.length) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY + 120;
    let cur = '';
    secs.forEach(s => { if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) cur = s.id; });
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
      const parent = e.target.closest('.proj-grid,.about-layout,.skills-layout,.why-grid,.contact-layout,.tl,.info-stack,.stats-row,.about-cards,.skill-bars,.tp-grid,.extra-tags,.about-tags,.contact-cards');
      if (parent) {
        const siblings = Array.from(parent.querySelectorAll('.reveal'));
        const idx = siblings.indexOf(e.target);
        e.target.style.transitionDelay = `${idx * 0.05}s`;
      }
      e.target.classList.add('show');
      obs.unobserve(e.target);
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
  els.forEach(el => obs.observe(el));
})();

// ── SKILL BARS ──
(function skills() {
  const fills = document.querySelectorAll('.skill-fill');
  const pcts = document.querySelectorAll('.skill-pct');
  if (!fills.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const i = Array.from(fills).indexOf(e.target);
      setTimeout(() => {
        const w = Number(e.target.dataset.w || 0);
        e.target.style.width = w + '%';
        if (pcts[i]) {
          const n = Number(pcts[i].dataset.n || w);
          let c = 0;
          const step = Math.max(1, Math.ceil(n / 30));
          const t = setInterval(() => { c += step; if (c >= n) { c = n; clearInterval(t); } pcts[i].textContent = c + '%'; }, 30);
        }
      }, i * 100);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.25 });
  fills.forEach(el => obs.observe(el));
})();

// ── TERMINAL ──
(function term() {
  const el = document.getElementById('term-txt');
  if (!el) return;
  const phrases = [
    'Are....you.....be.....my......night-friend?',
    'console.log("Hello, World!");',
    'sudo nmap -sV target.com',
    'pip install deniagpt',
    'git commit -m "init"',
    'python3 exploit.py --target',
  ];
  let pi = 0, ci = 0;
  const type = () => {
    if (document.hidden) { setTimeout(type, 200); return; }
    const phrase = phrases[pi];
    if (ci <= phrase.length) {
      el.textContent = phrase.slice(0, ci);
      ci++;
      setTimeout(type, 80 + Math.random() * 40);
      return;
    }
    setTimeout(() => {
      ci = 0;
      pi = (pi + 1) % phrases.length;
      el.textContent = '';
      type();
    }, 2000);
  };
  type();
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
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 300), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// ── STATS COUNTER ──
(function statCount() {
  const nums = document.querySelectorAll('.stat-num');
  if (!nums.length || NO_MOTION) { nums.forEach(el => el.textContent = el.dataset.target); return; }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const target = Number(e.target.dataset.target || 0);
      let cur = 0;
      const step = Math.max(1, Math.ceil(target / 20));
      const t = setInterval(() => {
        cur += step;
        if (cur >= target) { cur = target; clearInterval(t); }
        e.target.textContent = cur;
      }, 35);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.5 });
  nums.forEach(el => obs.observe(el));
})();

// ── RIPPLE ──
(function ripple() {
  if (NO_MOTION) return;
  const els = document.querySelectorAll('.proj-card,.ccard,.skill-row,.info-pill,.why-card,.tp-item,.tl-content,.btn,.ab-card,.stat-card');
  els.forEach(el => {
    el.style.position = 'relative';
    el.style.overflow = 'hidden';
    el.addEventListener('click', function(e) {
      const r = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      const dark = document.documentElement.getAttribute('data-theme') === 'dark';
      const color = dark ? '129,140,248' : '99,102,241';
      r.style.cssText = `position:absolute;pointer-events:none;width:${size}px;height:${size}px;left:${x}px;top:${y}px;border-radius:50%;background:rgba(${color},0.12);transform:scale(0);transition:transform .6s cubic-bezier(.4,0,.2,1),opacity .6s ease;`;
      this.appendChild(r);
      requestAnimationFrame(() => { r.style.transform = 'scale(1)'; r.style.opacity = '0'; });
      setTimeout(() => r.remove(), 700);
    });
  });
})();

// ── MAGNETIC BUTTONS ──
(function magnetic() {
  if (NO_MOTION || isMobile) return;
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.2;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.2;
      this.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('mouseleave', function() { this.style.transform = ''; });
  });
})();

// ── HERO PARTICLES ──
(function heroParticles() {
  if (NO_MOTION || isMobile) return;
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];
  const COUNT = 35;

  function getColors() {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    return dark ? ['129,140,248', '34,211,238', '251,191,36'] : ['99,102,241', '6,182,212', '245,158,11'];
  }

  function resize() { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; }

  function createP() {
    const colors = getColors();
    return {
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.4 + 0.1,
    };
  }

  function init() { resize(); particles = []; for (let i = 0; i < COUNT; i++) particles.push(createP()); }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.opacity})`;
      ctx.fill();
    });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${particles[i].color},${0.1 * (1 - dist / 100)})`;
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

  const obs = new MutationObserver(() => {
    const colors = getColors();
    particles.forEach(p => p.color = colors[Math.floor(Math.random() * colors.length)]);
  });
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
})();

// ── TILT EFFECT ON CARDS ──
(function tilt() {
  if (NO_MOTION || isMobile) return;
  document.querySelectorAll('.proj-card,.why-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      this.style.transform = `translateY(-4px) perspective(800px) rotateX(${-y * 3.5}deg) rotateY(${x * 3.5}deg)`;
    });
    card.addEventListener('mouseleave', function() { this.style.transform = ''; });
  });
})();
