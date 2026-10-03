/* =========================================================
   Lux Cipher — Interaction Layer (Soft UI Evolution)
   ========================================================= */

(function () {
  'use strict';

  /* ---------- SKELETON LOADER ---------- */
  window.addEventListener('load', () => {
    const loader = document.getElementById('skeletonLoader');
    if (loader) {
      setTimeout(() => loader.classList.add('hidden'), 300);
    }
  });

  /* ---------- THEME TOGGLE ---------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
  } else {
    root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }

  themeToggle?.addEventListener('click', (e) => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);

    // Ripple effect
    const rect = themeToggle.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position:fixed;left:${rect.left + rect.width/2}px;top:${rect.top + rect.height/2}px;
      width:10px;height:10px;border-radius:50%;pointer-events:none;
      background:radial-gradient(circle,rgba(135,206,235,0.5),transparent 70%);
      transform:translate(-50%,-50%) scale(0);transition:transform 600ms ease,opacity 600ms ease;
      z-index:9999;opacity:1;
    `;
    document.body.appendChild(ripple);
    requestAnimationFrame(() => {
      ripple.style.transform = 'translate(-50%,-50%) scale(80)';
      ripple.style.opacity = '0';
    });
    setTimeout(() => ripple.remove(), 700);
  });

  /* ---------- STATUS (Night Coder 9PM - 5AM VN) ---------- */
  function updateStatus() {
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.status-text');
    if (!statusDot || !statusText) return;

    const now = new Date();
    // UTC+7 for Vietnam
    const vnHour = (now.getUTCHours() + 7) % 24;
    const isOnline = vnHour >= 21 || vnHour < 5;

    if (isOnline) {
      statusDot.classList.remove('offline');
      statusText.textContent = 'Available · Open Source · CTF Player';
    } else {
      statusDot.classList.add('offline');
      statusText.textContent = 'Available · Open Source · CTF Player';
    }
  }
  updateStatus();
  setInterval(updateStatus, 60000);

  /* ---------- SCROLL PROGRESS ---------- */
  const progress = document.getElementById('scrollProgress');
  function updateProgress() {
    const h = document.documentElement;
    const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    if (progress) progress.style.width = scrolled + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ---------- NAVBAR SCROLL STATE ---------- */
  const navbar = document.getElementById('navbar');
  function updateNav() {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ---------- ACTIVE NAV LINK ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  function updateActiveLink() {
    let current = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }
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

  /* ---------- CURSOR GLOW ---------- */
  const cursorGlow = document.getElementById('cursorGlow');
  let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  function animateGlow() {
    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;
    if (cursorGlow) {
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
    }
    requestAnimationFrame(animateGlow);
  }
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    animateGlow();
  }

  /* ---------- REVEAL ON SCROLL ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------- STATS COUNTER ---------- */
  const statValues = document.querySelectorAll('.stat-value');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count || '0', 10);
      let current = 0;
      const step = Math.max(1, Math.floor(target / 40));
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
      const step = Math.max(1, Math.floor(targetPct / 50));
      const tick = () => {
        cur += step;
        if (cur >= targetPct) { cur = targetPct; }
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
    }, { threshold: 0.4 });
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
        setTimeout(typeChar, 22);
      } else {
        output += '\n';
        terminalEl.textContent = output;
        lineIdx++;
        charIdx = 0;
        setTimeout(typeChar, 320);
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

  /* ---------- MAGNETIC BUTTONS ---------- */
  const magneticEls = document.querySelectorAll('.btn-primary, .social-btn, .icon-btn');
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    magneticEls.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-2px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  /* ---------- HERO PARTICLES ---------- */
  const canvas = document.getElementById('heroParticles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let W, H;

    function resize() {
      W = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      H = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(1, 1);
      initParticles();
    }

    function initParticles() {
      particles = [];
      const count = Math.min(60, Math.floor((W * H) / 22000));
      const colors = ['#87CEEB', '#FFB6C1', '#90EE90'];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 2.2 + 0.6,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          color: colors[Math.floor(Math.random() * colors.length)],
          a: Math.random() * 0.5 + 0.3,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.a;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110 * window.devicePixelRatio) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = 0.08 * (1 - dist / (110 * window.devicePixelRatio));
            ctx.stroke();
          }
        }
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    draw();
  }

  /* ---------- SMOOTH SCROLL FOR HASH LINKS ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id && id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const top = target.getBoundingClientRect().top + window.scrollY - 90;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

})();
