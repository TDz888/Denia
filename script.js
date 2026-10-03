/* =========================================================
   Kawaii Pastel Pop — Lux Cipher
   Interactions · Theme switch · Animations
   ========================================================= */

(function () {
  'use strict';

  /* ---------- SKELETON LOADER ---------- */
  window.addEventListener('load', () => {
    const loader = document.getElementById('skeletonLoader');
    if (loader) setTimeout(() => loader.classList.add('hidden'), 350);
  });

  /* ---------- THEME TOGGLE (with wave animation) ---------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const themeWave = document.getElementById('themeWave');
  const savedTheme = localStorage.getItem('lux-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const setTheme = (theme) => root.setAttribute('data-theme', theme);

  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme(prefersDark ? 'dark' : 'light');
  }

  themeToggle?.addEventListener('click', (e) => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    const rect = themeToggle.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // Set wave color to the theme we're switching TO
    const waveColor = next === 'dark' ? '#2B1E3F' : '#FFD1DC';
    themeWave.style.left = cx + 'px';
    themeWave.style.top = cy + 'px';
    themeWave.style.width = '40px';
    themeWave.style.height = '40px';
    themeWave.style.background = waveColor;
    themeWave.classList.add('animating');

    setTimeout(() => {
      setTheme(next);
      localStorage.setItem('lux-theme', next);
    }, 240);

    setTimeout(() => {
      themeWave.classList.remove('animating');
    }, 780);
  });

  /* ---------- SCROLL PROGRESS ---------- */
  const progress = document.getElementById('scrollProgress');
  const updateProgress = () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    if (progress) progress.style.width = scrolled + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ---------- NAVBAR SCROLL ---------- */
  const navbar = document.getElementById('navbar');
  const updateNav = () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ---------- ACTIVE NAV LINK ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const updateActiveLink = () => {
    let current = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 140;
      if (window.scrollY >= top) current = sec.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  };
  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  /* ---------- HAMBURGER MENU ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinksList = document.getElementById('navLinks');
  hamburger?.addEventListener('click', () => {
    navLinksList?.classList.toggle('open');
  });
  navLinksList?.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => navLinksList.classList.remove('open'));
  });

  /* ---------- REVEAL ON SCROLL ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------- STATS COUNTER ---------- */
  const statValues = document.querySelectorAll('.stat-value');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count || '0', 10);
      let current = 0;
      const step = Math.max(1, Math.floor(target / 35));
      const tick = () => {
        current += step;
        if (current >= target) {
          el.textContent = target + '+';
          return;
        }
        el.textContent = current + '+';
        requestAnimationFrame(tick);
      };
      tick();
      statObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  statValues.forEach((el) => statObserver.observe(el));

  /* ---------- SKILL BARS ---------- */
  const skillBlocks = document.querySelectorAll('.skill-block');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const block = entry.target;
      const fill = block.querySelector('.skill-fill');
      const pct = block.querySelector('.skill-pct');
      const targetPct = parseInt(pct?.dataset.target || '0', 10);

      if (fill) fill.style.width = fill.dataset.width || '0%';

      let cur = 0;
      const step = Math.max(1, Math.floor(targetPct / 45));
      const tick = () => {
        cur += step;
        if (cur >= targetPct) cur = targetPct;
        if (pct) pct.textContent = cur + '%';
        if (cur < targetPct) requestAnimationFrame(tick);
      };
      tick();
      skillObserver.unobserve(block);
    });
  }, { threshold: 0.4 });
  skillBlocks.forEach((b) => skillObserver.observe(b));

  /* ---------- TERMINAL TYPING ---------- */
  const terminalEl = document.getElementById('terminalTyping');
  const terminalLines = [
    '$ whoami',
    '  → lux_cipher',
    '$ sudo nmap -sV localhost',
    '  → scan complete · 0 vulnerabilities found',
    '$ pip install deniagpt',
    '  → Successfully installed deniagpt',
    '$ ./build --portfolio',
    '  → ready to deploy ✓',
  ];

  if (terminalEl) {
    const termObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          typeLines();
          termObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });
    termObserver.observe(terminalEl);
  }

  function typeLines() {
    let lineIdx = 0;
    let charIdx = 0;
    let output = '';

    function typeChar() {
      if (lineIdx >= terminalLines.length) return;
      const line = terminalLines[lineIdx];
      if (charIdx < line.length) {
        output += line[charIdx];
        terminalEl.textContent = output;
        charIdx++;
        setTimeout(typeChar, 20);
      } else {
        output += '\n';
        terminalEl.textContent = output;
        lineIdx++;
        charIdx = 0;
        setTimeout(typeChar, 300);
      }
    }
    typeChar();
  }

  /* ---------- BACK TO TOP ---------- */
  const backTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backTop?.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });
  backTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- PARALLAX AVATAR ---------- */
  const avatarStage = document.querySelector('.avatar-stage');
  if (avatarStage && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const hero = document.getElementById('hero');
    hero?.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      avatarStage.style.transform = `translate(${x * 18}px, ${y * 18}px)`;
    });
    hero?.addEventListener('mouseleave', () => {
      avatarStage.style.transform = '';
    });
  }

  /* ---------- MAGNETIC BUTTONS ---------- */
  const magneticEls = document.querySelectorAll('.btn-primary, .social-btn, .theme-toggle');
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    magneticEls.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        if (!el.classList.contains('theme-toggle')) {
          el.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px) translateY(-2px)`;
        }
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  /* ---------- SPARKLE TRAIL ON CLICK ---------- */
  const sparkleColors = ['#FFB6C1', '#B3E5FC', '#B9F6CA', '#FFF9C4', '#9D84B6'];
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    if (!target.closest('a, button, .feature-card, .stat-card, .testi-card, .price-card')) return;

    for (let i = 0; i < 6; i++) {
      const s = document.createElement('div');
      const size = 6 + Math.random() * 8;
      const color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
      const angle = (Math.PI * 2 * i) / 6 + Math.random() * 0.5;
      const dist = 30 + Math.random() * 30;

      s.style.cssText = `
        position:fixed;
        left:${e.clientX}px;top:${e.clientY}px;
        width:${size}px;height:${size}px;
        background:${color};
        clip-path:polygon(50% 0%, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0% 50%, 39% 39%);
        pointer-events:none;
        z-index:9999;
        transform:translate(-50%,-50%) scale(0);
        transition:transform 700ms cubic-bezier(0.22,1,0.36,1), opacity 700ms ease;
        opacity:1;
      `;
      document.body.appendChild(s);

      requestAnimationFrame(() => {
        s.style.transform = `translate(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${Math.sin(angle) * dist}px)) scale(1) rotate(${Math.random() * 360}deg)`;
        s.style.opacity = '0';
      });
      setTimeout(() => s.remove(), 750);
    }
  });

  /* ---------- SMOOTH SCROLL (offset for fixed nav) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id && id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const top = target.getBoundingClientRect().top + window.scrollY - 110;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

})();
