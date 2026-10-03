/* =========================================================
   Kawaii Pastel Pop — Lux Cipher
   60fps Theme Transition · Kawaii Clock · Sparkle Wave
   ========================================================= */

(function () {
  'use strict';

  /* =========================================================
     SKELETON LOADER
     ========================================================= */
  window.addEventListener('load', () => {
    const loader = document.getElementById('skeletonLoader');
    if (loader) setTimeout(() => loader.classList.add('hidden'), 350);
  });

  /* =========================================================
     KAWAII CLOCK
     Uses requestAnimationFrame — only updates DOM when second changes
     ========================================================= */
  const clockDigits = {
    h1: document.querySelector('[data-slot="h1"]'),
    h2: document.querySelector('[data-slot="h2"]'),
    m1: document.querySelector('[data-slot="m1"]'),
    m2: document.querySelector('[data-slot="m2"]'),
    s1: document.querySelector('[data-slot="s1"]'),
    s2: document.querySelector('[data-slot="s2"]'),
  };
  const digitSlots = ['h1', 'h2', 'm1', 'm2', 's1', 's2'];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animateDigit(slot, newVal) {
    const el = clockDigits[slot];
    if (!el || el.textContent === newVal) return;

    if (prefersReducedMotion) {
      el.textContent = newVal;
      return;
    }

    el.classList.remove('swap');
    void el.offsetWidth; // force reflow to restart animation
    el.classList.add('swap');

    // Change text at midpoint of animation (when invisible)
    setTimeout(() => {
      if (el.textContent !== newVal) el.textContent = newVal;
    }, 170);

    setTimeout(() => el.classList.remove('swap'), 400);
  }

  let lastSecondRendered = -1;

  function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    const time = h + m + s; // e.g. "143207"

    for (let i = 0; i < 6; i++) {
      animateDigit(digitSlots[i], time[i]);
    }
  }

  function clockLoop() {
    const now = Date.now();
    const currentSecond = Math.floor(now / 1000);
    if (currentSecond !== lastSecondRendered) {
      lastSecondRendered = currentSecond;
      updateClock();
    }
    requestAnimationFrame(clockLoop);
  }

  // Start the clock immediately, then rAF loop
  updateClock();
  requestAnimationFrame(clockLoop);

  /* =========================================================
     THEME TOGGLE — 60fps Kawaii Sparkle Wave
     GPU-accelerated: transform + opacity only
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

  let themeAnimating = false;

  // Sparkle shapes via clip-path (polygon only for max compat)
  const sparkleShapes = [
    'polygon(50% 0%, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0% 50%, 39% 39%)', // 4-point star
    'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', // 5-point star
    'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', // diamond
    'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)', // octagon
  ];

  const sparkleColors = [
    '#FFB6C1', // pastel pink
    '#B3E5FC', // pastel blue
    '#B9F6CA', // pastel mint
    '#FFF9C4', // pastel cream
    '#9D84B6', // pastel purple
    '#FFFFFF', // white
  ];

  function burstSparkles(cx, cy) {
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 18 : 36;
    const baseAngle = Math.random() * Math.PI * 2;

    // Create fragment to batch DOM insertion
    const fragment = document.createDocumentFragment();
    const elements = [];

    for (let i = 0; i < count; i++) {
      const shape = sparkleShapes[i % sparkleShapes.length];
      const color = sparkleColors[i % sparkleColors.length];
      const angle = baseAngle + (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const distance = 90 + Math.random() * 220;
      const size = 8 + Math.random() * 14;
      const rotation = Math.random() * 540 - 270;
      const duration = 700 + Math.random() * 400;

      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      const el = document.createElement('div');
      el.className = 'theme-sparkle';
      el.style.width = size + 'px';
      el.style.height = size + 'px';
      el.style.background = color;
      el.style.clipPath = shape;
      el.style.webkitClipPath = shape;
      el.style.setProperty('--x', cx + 'px');
      el.style.setProperty('--y', cy + 'px');
      el.style.setProperty('--tx', tx.toFixed(1) + 'px');
      el.style.setProperty('--ty', ty.toFixed(1) + 'px');
      el.style.setProperty('--rot', rotation.toFixed(1) + 'deg');
      el.style.transitionDuration = duration + 'ms, ' + duration + 'ms';
      el.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.12))';
      el.dataset.removeAfter = String(duration + 100);

      fragment.appendChild(el);
      elements.push(el);
    }

    sparkleLayer.appendChild(fragment);

    // Batch: force reflow once, then trigger all animations via rAF
    void sparkleLayer.offsetWidth;
    requestAnimationFrame(() => {
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add('burst');
      }
    });

    // Cleanup
    setTimeout(() => {
      for (let i = 0; i < elements.length; i++) {
        elements[i].remove();
      }
    }, 1400);
  }

  function triggerWave(cx, cy, targetTheme) {
    // Compute max radius needed to cover screen from (cx, cy)
    const maxDist = Math.max(
      Math.hypot(cx, cy),
      Math.hypot(window.innerWidth - cx, cy),
      Math.hypot(cx, window.innerHeight - cy),
      Math.hypot(window.innerWidth - cx, window.innerHeight - cy)
    );
    const scale = (maxDist * 2) / 80 + 0.5;

    const waveColor = targetTheme === 'dark' ? '#2B1E3F' : '#FFD1DC';

    // Reset without transition
    themeWave.style.transition = 'none';
    themeWave.style.background = waveColor;
    themeWave.style.opacity = '1';
    themeWave.style.transform = `translate3d(${cx - 40}px, ${cy - 40}px, 0) scale(0)`;

    // Force reflow
    void themeWave.offsetWidth;

    // Start expansion
    themeWave.style.transition = 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)';
    requestAnimationFrame(() => {
      themeWave.style.transform = `translate3d(${cx - 40}px, ${cy - 40}px, 0) scale(${scale})`;
    });

    // After wave covers screen → switch theme + start fade
    setTimeout(() => {
      setTheme(targetTheme);
      localStorage.setItem('lux-theme', targetTheme);

      themeWave.style.transition = 'opacity 300ms ease-out';
      themeWave.style.opacity = '0';
    }, 620);

    // Reset wave after fully faded
    setTimeout(() => {
      themeWave.style.transition = 'none';
      themeWave.style.opacity = '0';
      themeWave.style.transform = 'translate3d(-200px, -200px, 0) scale(0)';
    }, 950);
  }

  themeToggle?.addEventListener('click', () => {
    if (themeAnimating) return;
    if (prefersReducedMotion) {
      // Skip animation if user prefers reduced motion
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      setTheme(next);
      localStorage.setItem('lux-theme', next);
      return;
    }

    themeAnimating = true;
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    const rect = themeToggle.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    triggerWave(cx, cy, next);
    burstSparkles(cx, cy);

    setTimeout(() => { themeAnimating = false; }, 950);
  });

  /* =========================================================
     SCROLL PROGRESS
     ========================================================= */
  const progress = document.getElementById('scrollProgress');
  let tickingScroll = false;
  const updateProgress = () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    if (progress) progress.style.width = scrolled + '%';
    tickingScroll = false;
  };
  window.addEventListener('scroll', () => {
    if (!tickingScroll) {
      tickingScroll = true;
      requestAnimationFrame(updateProgress);
    }
  }, { passive: true });
  updateProgress();

  /* =========================================================
     NAVBAR SCROLL STATE
     ========================================================= */
  const navbar = document.getElementById('navbar');
  let navbarScrolled = false;
  window.addEventListener('scroll', () => {
    const isScrolled = window.scrollY > 20;
    if (isScrolled !== navbarScrolled) {
      navbarScrolled = isScrolled;
      navbar?.classList.toggle('scrolled', isScrolled);
    }
  }, { passive: true });

  /* =========================================================
     ACTIVE NAV LINK
     ========================================================= */
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

  /* =========================================================
     HAMBURGER MENU
     ========================================================= */
  const hamburger = document.getElementById('hamburger');
  const navLinksList = document.getElementById('navLinks');
  hamburger?.addEventListener('click', () => navLinksList?.classList.toggle('open'));
  navLinksList?.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => navLinksList.classList.remove('open'));
  });

  /* =========================================================
     REVEAL ON SCROLL
     ========================================================= */
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

  /* =========================================================
     STATS COUNTER
     ========================================================= */
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

  /* =========================================================
     SKILL BARS
     ========================================================= */
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

  /* =========================================================
     TERMINAL TYPING
     ========================================================= */
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

  /* =========================================================
     BACK TO TOP
     ========================================================= */
  const backTop = document.getElementById('backToTop');
  let backTopShown = false;
  window.addEventListener('scroll', () => {
    const shouldShow = window.scrollY > 500;
    if (shouldShow !== backTopShown) {
      backTopShown = shouldShow;
      backTop?.classList.toggle('show', shouldShow);
    }
  }, { passive: true });
  backTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* =========================================================
     PARALLAX AVATAR
     ========================================================= */
  const avatarStage = document.querySelector('.avatar-stage');
  if (avatarStage && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const hero = document.getElementById('hero');
    let tickingParallax = false;
    let lastX = 0, lastY = 0;

    hero?.addEventListener('mousemove', (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (!tickingParallax) {
        tickingParallax = true;
        requestAnimationFrame(() => {
          const rect = hero.getBoundingClientRect();
          const x = (lastX - rect.left - rect.width / 2) / rect.width;
          const y = (lastY - rect.top - rect.height / 2) / rect.height;
          avatarStage.style.transform = `translate3d(${x * 18}px, ${y * 18}px, 0)`;
          tickingParallax = false;
        });
      }
    }, { passive: true });

    hero?.addEventListener('mouseleave', () => {
      avatarStage.style.transform = '';
    });
  }

  /* =========================================================
     MAGNETIC BUTTONS
     ========================================================= */
  const magneticEls = document.querySelectorAll('.btn-primary, .social-btn');
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    magneticEls.forEach((el) => {
      let tickingMag = false;
      let magX = 0, magY = 0;
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        magX = e.clientX - rect.left - rect.width / 2;
        magY = e.clientY - rect.top - rect.height / 2;
        if (!tickingMag) {
          tickingMag = true;
          requestAnimationFrame(() => {
            el.style.transform = `translate3d(${magX * 0.12}px, ${magY * 0.12 - 2}px, 0)`;
            tickingMag = false;
          });
        }
      }, { passive: true });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  /* =========================================================
     SPARKLE TRAIL ON CLICK
     ========================================================= */
  const trailColors = ['#FFB6C1', '#B3E5FC', '#B9F6CA', '#FFF9C4', '#9D84B6'];
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    if (!target.closest('a, button, .feature-card, .stat-card, .testi-card, .project-card')) return;
    if (prefersReducedMotion) return;

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
        transform:translate3d(-50%,-50%,0) scale(0);
        transition:transform 700ms cubic-bezier(0.22,1,0.36,1), opacity 700ms ease;
        opacity:1;
        will-change:transform,opacity;
      `;
      document.body.appendChild(s);

      requestAnimationFrame(() => {
        s.style.transform = `translate3d(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${Math.sin(angle) * dist}px), 0) scale(1) rotate(${Math.random() * 360}deg)`;
        s.style.opacity = '0';
      });
      setTimeout(() => s.remove(), 750);
    }
  });

  /* =========================================================
     SMOOTH SCROLL WITH NAV OFFSET
     ========================================================= */
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
