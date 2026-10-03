/* =========================================================
   Kawaii Pastel Pop — Lux Cipher
   Interactions · Sparkle Wave Theme Switch · Animations
   ========================================================= */

(function () {
  'use strict';

  /* ---------- SKELETON LOADER ---------- */
  window.addEventListener('load', () => {
    const loader = document.getElementById('skeletonLoader');
    if (loader) setTimeout(() => loader.classList.add('hidden'), 350);
  });

  /* =========================================================
     THEME TOGGLE — Option A: Kawaii Sparkle Wave
     ========================================================= */
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const themeWave = document.getElementById('themeWave');
  const sparkleLayer = document.getElementById('sparkleLayer');

  const savedTheme = localStorage.getItem('lux-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const setTheme = (theme) => root.setAttribute('data-theme', theme);

  if (savedTheme) setTheme(savedTheme);
  else setTheme(prefersDark ? 'dark' : 'light');

  // Sparkle shapes via clip-path
  const clipPaths = {
    star4:   'polygon(50% 0%, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0% 50%, 39% 39%)',
    star5:   'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
    heart:   'path("M12 21s-7-4.5-9.5-9C.5 8 3 4 6.5 4 8.7 4 10.3 5.3 12 7c1.7-1.7 3.3-3 5.5-3C21 4 23.5 8 21.5 12 19 16.5 12 21 12 21z")',
    circle:  'circle(50% at 50% 50%)',
    diamond: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
  };

  // Note: clip-path with 'path()' or 'circle()' needs CSS shape-outside syntax;
  // for div clip-path we use polygon approximations:
  const shapes = {
    star4:   clipPaths.star4,
    star5:   clipPaths.star5,
    circle:  'circle(50% at 50% 50%)',
    diamond: clipPaths.diamond,
    square:  'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%, 25% 25%, 75% 25%, 75% 75%, 25% 75%)', // starburst approx
  };
  const shapeKeys = Object.keys(shapes);

  const sparkleColors = [
    '#FFB6C1', // pink
    '#B3E5FC', // blue
    '#B9F6CA', // mint
    '#FFF9C4', // cream
    '#9D84B6', // purple
    '#FFFFFF', // white
  ];

  function burstSparkles(cx, cy) {
    const count = 42;
    const baseAngle = Math.random() * Math.PI * 2;

    for (let i = 0; i < count; i++) {
      const shapeKey = shapeKeys[Math.floor(Math.random() * shapeKeys.length)];
      const color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
      const angle = baseAngle + (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const distance = 100 + Math.random() * 240;
      const size = 8 + Math.random() * 16;
      const rotation = Math.random() * 540 - 270;
      const duration = 700 + Math.random() * 500;

      const el = document.createElement('div');
      el.className = 'theme-sparkle';
      el.style.left = cx + 'px';
      el.style.top = cy + 'px';
      el.style.width = size + 'px';
      el.style.height = size + 'px';
      el.style.background = color;
      el.style.clipPath = shapes[shapeKey];
      el.style.setProperty('--tx', (Math.cos(angle) * distance).toFixed(1) + 'px');
      el.style.setProperty('--ty', (Math.sin(angle) * distance).toFixed(1) + 'px');
      el.style.setProperty('--rot', rotation.toFixed(1) + 'deg');
      el.style.transitionDuration = duration + 'ms, ' + duration + 'ms';
      el.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.12))';

      sparkleLayer.appendChild(el);
      // Force reflow before adding burst class
      void el.offsetWidth;
      requestAnimationFrame(() => el.classList.add('burst'));

      setTimeout(() => el.remove(), duration + 100);
    }
  }

  themeToggle?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    const rect = themeToggle.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // 1. Prepare wave
    const waveColor = next === 'dark' ? '#2B1E3F' : '#FFD1DC';
    themeWave.style.left = cx + 'px';
    themeWave.style.top = cy + 'px';
    themeWave.style.width = '60px';
    themeWave.style.height = '60px';
    themeWave.style.background = waveColor;
    themeWave.classList.add('animating');

    // 2. Burst sparkles immediately
    burstSparkles(cx, cy);

    // 3. Switch theme mid-animation
    setTimeout(() => {
      setTheme(next);
      localStorage.setItem('lux-theme', next);
    }, 260);

    // 4. Reset wave
    setTimeout(() => {
      themeWave.classList.remove('animating');
    }, 850);
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

  /* ---------- HAMBURGER ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinksList = document.getElementById('navLinks');
  hamburger?.addEventListener('click', () => navLinksList?.classList.toggle('open'));
  navLinksList?.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => navLinksList.classList.remove('open'));
  });

  /* ---------- REVEAL ---------- */
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
        if (current >= target) { el.textContent = target + '+'; return; }
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
  const magneticEls = document.querySelectorAll('.btn-primary, .social-btn');
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    magneticEls.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px) translateY(-2px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  /* ---------- SPARKLE TRAIL ON CLICK ---------- */
  const trailColors = ['#FFB6C1', '#B3E5FC', '#B9F6CA', '#FFF9C4', '#9D84B6'];
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    if (!target.closest('a, button, .feature-card, .stat-card, .testi-card, .project-card')) return;

    for (let i = 0; i < 6; i++) {
      const s = document.createElement('div');
      const size = 6 + Math.random() * 8;
      const color = trailColors[Math.floor(Math.random() * trailColors.length)];
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

  /* ---------- SMOOTH SCROLL ---------- */
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
