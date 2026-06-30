/* Profile Script - Android Server Mini Design v2 */

const T_DEFAULT = 'Trần Thiên Ân | Profile';
const T_AWAY = 'Back soon, SuperDzAn!';
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('visibilitychange', () => {
  document.title = document.hidden ? T_AWAY : T_DEFAULT;
});

// ── SKELETON LOADER ──
(function skeletonLoader() {
  const sk = document.getElementById('skeleton');
  if (!sk || prefersReducedMotion) {
    if (sk) sk.remove();
    return;
  }
  const hideTimeout = setTimeout(() => {
    sk.classList.add('hidden');
    setTimeout(() => sk.remove(), 500);
  }, 800);
  window.addEventListener('load', () => {
    clearTimeout(hideTimeout);
    sk.classList.add('hidden');
    setTimeout(() => sk.remove(), 500);
  });
})();

// ── ACTIVITY STATUS ──
(function activityStatus() {
  const navText = document.getElementById('nav-status-text');
  const navDot = document.getElementById('nav-status-dot');
  if (!navText || !navDot) return;

  function update() {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).formatToParts(new Date());
    const hour = Number(parts.find(p => p.type === 'hour')?.value ?? 0);
    const totalMin = hour * 60 + Number(parts.find(p => p.type === 'minute')?.value ?? 0);
    const isOnline = totalMin >= 21 * 60 || totalMin <= 5 * 60;
    navText.textContent = isOnline ? 'Online' : 'Offline';
    navDot.classList.toggle('offline', !isOnline);
  }

  update();
  setInterval(update, 30000);
})();

// ── HAMBURGER MENU ──
(function hamburgerMenu() {
  const btn = document.getElementById('nav-hamburger');
  const links = document.getElementById('nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  });

  links.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.nav-inner') && links.classList.contains('open')) {
      links.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
})();

// ── NAVIGATION SCROLL STATE ──
(function navScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();

// ── ACTIVE NAV LINK ON SCROLL ──
(function navActive() {
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  if (!links.length || !sections.length) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 130;
    let current = '';

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }, { passive: true });
})();

// ── REVEAL ON SCROLL (with stagger) ──
(function revealScroll() {
  const els = document.querySelectorAll('.reveal-up');
  if (!els.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal-up'));
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 0.08}s`;
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => obs.observe(el));
})();

// ── SKILL BARS + COUNTER ──
(function skillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  const pcts = document.querySelectorAll('.skill-pct');
  if (!fills.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const idx = Array.from(fills).indexOf(entry.target);

      setTimeout(() => {
        const targetW = Number(entry.target.dataset.w || 0);
        entry.target.style.width = `${targetW}%`;

        if (pcts[idx]) {
          const targetCount = Number(pcts[idx].dataset.count || targetW);
          animateCounter(pcts[idx], targetCount);
        }
      }, idx * 120);

      obs.unobserve(entry.target);
    });
  }, { threshold: 0.3 });

  fills.forEach(el => obs.observe(el));

  function animateCounter(el, target) {
    let current = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = `${current}%`;
    }, 30);
  }
})();

// ── RIPPLE BUTTONS ──
(function rippleBtn() {
  document.querySelectorAll('.ripple').forEach(el => {
    el.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const circle = document.createElement('span');
      circle.className = 'ripple-circle';
      const size = Math.max(rect.width, rect.height);
      circle.style.width = circle.style.height = `${size}px`;
      circle.style.left = `${e.clientX - rect.left - size / 2}px`;
      circle.style.top = `${e.clientY - rect.top - size / 2}px`;
      this.appendChild(circle);
      circle.addEventListener('animationend', () => circle.remove());
    });
  });
})();

// ── FOOTER TERMINAL TYPING ──
(function terminalTyping() {
  const el = document.getElementById('terminal-typing');
  if (!el) return;
  const text = 'Are....you.....be.....my......night-friend?';
  let i = 0;

  function type() {
    if (document.hidden) {
      setTimeout(type, 220);
      return;
    }
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i += 1;
      setTimeout(type, 100);
      return;
    }
    setTimeout(() => {
      i = 0;
      el.textContent = '';
      type();
    }, 2500);
  }
  type();
})();

// ── SMOOTH SCROLL FOR ANCHOR LINKS ──
(function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
