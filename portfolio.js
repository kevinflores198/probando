/* ════════════════════════════════════════════════════
   portfolio.js
════════════════════════════════════════════════════ */

/* ── YEAR ────────────────────────────────────────── */
document.getElementById('footer-year').textContent = new Date().getFullYear();

/* ── THEME ───────────────────────────────────────── */
const body  = document.body;
const html  = document.documentElement;
const btnTheme = document.getElementById('btn-theme');
const themeIcon = document.getElementById('theme-icon');
const videoDark  = document.getElementById('video-dark');
const videoLight = document.getElementById('video-light');

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  if (theme === 'dark') {
    themeIcon.className = 'fa-solid fa-moon';
    videoDark.classList.remove('hidden');
    videoLight.classList.add('hidden');
  } else {
    themeIcon.className = 'fa-solid fa-sun';
    videoLight.classList.remove('hidden');
    videoDark.classList.add('hidden');
  }
}

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

btnTheme.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

/* ── LANGUAGE ────────────────────────────────────── */
const btnLang = document.getElementById('btn-lang');
const langDropdown = document.getElementById('lang-dropdown');
const langLabel = document.getElementById('lang-label');

btnLang.addEventListener('click', (e) => {
  e.stopPropagation();
  langDropdown.classList.toggle('open');
});
document.addEventListener('click', () => langDropdown.classList.remove('open'));

function setLang(lang) {
  langLabel.textContent = lang.toUpperCase();
  localStorage.setItem('lang', lang);
  langDropdown.classList.remove('open');
  // Translations will be added in the next step
  // applyTranslations(lang);
}

const savedLang = localStorage.getItem('lang') || 'es';
langLabel.textContent = savedLang.toUpperCase();

/* ── NAVBAR ──────────────────────────────────────── */
const navbar    = document.getElementById('navbar');
const btnBurger = document.getElementById('btn-burger');
const navLinks  = document.getElementById('nav-links');
const backdrop  = document.getElementById('nav-backdrop');
const navClose  = document.getElementById('nav-close');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

function openMenu() {
  btnBurger.classList.add('open');
  navLinks.classList.add('mobile-open');
  if (backdrop) { backdrop.classList.add('visible'); }
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  btnBurger.classList.remove('open');
  navLinks.classList.remove('mobile-open');
  if (backdrop) { backdrop.classList.remove('visible'); }
  document.body.style.overflow = '';
}


btnBurger.addEventListener('click', (e) => {
  e.stopPropagation(); // 🔥 CLAVE
  navLinks.classList.contains('mobile-open') ? closeMenu() : openMenu();
});

document.addEventListener('click', (e) => {
  if (
    navLinks.classList.contains('mobile-open') &&
    !navLinks.contains(e.target) &&
    !btnBurger.contains(e.target)
  ) {
    closeMenu();
  }
});
if (backdrop) backdrop.addEventListener('click', closeMenu);
if (navClose) navClose.addEventListener('click', closeMenu);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
window.addEventListener('resize', () => { if (window.innerWidth > 768) closeMenu(); });

/* ── ACTIVE SECTION ──────────────────────────────── */
const sections   = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.classList.toggle('nav-active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-35% 0px -60% 0px', threshold: 0 });

sections.forEach(s => sectionObs.observe(s));

/* ── FABs (WhatsApp + top) ───────────────────────── */
const fabWa  = document.getElementById('fab-whatsapp');
const fabTop = document.getElementById('fab-top');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 200;
  fabWa.classList.toggle('visible', scrolled);
  fabTop.classList.toggle('visible', scrolled);
});

/* ── TYPEWRITER ──────────────────────────────────── */
const typeEl  = document.getElementById('typewriter');
const phrases = ['Web Developer', 'Full Stack Developer', 'Frontend Developer'];
let pIdx = 0, cIdx = 0, deleting = false;

function typeLoop() {
  const phrase = phrases[pIdx];

  if (!deleting) {
    typeEl.textContent = phrase.slice(0, cIdx + 1);
    cIdx++;
    if (cIdx === phrase.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
    setTimeout(typeLoop, 90);
  } else {
    typeEl.textContent = phrase.slice(0, cIdx - 1);
    cIdx--;
    if (cIdx === 0) {
      deleting = false;
      pIdx = (pIdx + 1) % phrases.length;
    }
    setTimeout(typeLoop, 45);
  }
}
typeLoop();

/* ── SCROLL REVEAL ───────────────────────────────── */
const revealEls = document.querySelectorAll(
  '.project-card, .edu-card, .testimonial-card, .contact-card, .why-item, .stat, .about-text'
);
revealEls.forEach(el => el.classList.add('reveal'));

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObs.observe(el));

/* ── MODALES ─────────────────────────────────────── */
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

// Abrir modales desde las cards
document.getElementById('open-modal1').addEventListener('click', () => openModal('modal1'));
document.getElementById('open-modal2').addEventListener('click', () => openModal('modal2'));
document.getElementById('open-modal3').addEventListener('click', () => openModal('modal3'));

// Cerrar con el botón ×
document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', () => closeModal(btn.dataset.close));
});

// Cerrar haciendo click en el overlay
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal(overlay.id);
  });
});

// Cerrar con Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => closeModal(m.id));
  }
});

/* ── SCROLL SEQUENCE ─────────────────────────────── */
const TOTAL_FRAMES = 90;

const seqOuter  = document.getElementById('seq-outer');
const progFill  = document.getElementById('seq-progress-fill');
const frameCtr  = document.getElementById('seq-frame-counter');
const canvas    = document.getElementById('seq-canvas');
const ctx       = canvas.getContext('2d');

const CHAPTERS_DATA = [
  { id: 'seq-ch0', dot: 0, from: 0,    to: 0.33 },
  { id: 'seq-ch1', dot: 1, from: 0.33, to: 0.66 },
  { id: 'seq-ch2', dot: 2, from: 0.66, to: 1    },
];

const dots = document.querySelectorAll('.seq-dot');

// Chapter dots click → scroll to that progress
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const ch = parseInt(dot.dataset.ch);
    const pTarget = ch / CHAPTERS_DATA.length + 0.01;
    const rect    = seqOuter.getBoundingClientRect();
    const scrollable = seqOuter.offsetHeight - window.innerHeight;
    window.scrollTo({ top: seqOuter.offsetTop + scrollable * pTarget, behavior: 'smooth' });
  });
});

function easeInOut(t) {
  return t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
}
function lerp(a, b, t) {
  return a + (b - a) * t;
}

function drawFrame(p) {
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const N   = 80;
  const cx  = W / 2, cy = H / 2;

  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);

    // Formation A: fibonacci scatter (caos / concepto)
    const fibAng = t * Math.PI * 2 * 2.618;
    const fibRad = Math.sqrt(t) * Math.min(W, H) * 0.38;
    const ax = cx + Math.cos(fibAng) * fibRad;
    const ay = cy + Math.sin(fibAng) * fibRad;

    // Formation B: ring (diseño / estructura)
    const ringAng = t * Math.PI * 2;
    const bx = cx + Math.cos(ringAng) * Math.min(W, H) * 0.30;
    const by = cy + Math.sin(ringAng) * Math.min(W, H) * 0.30;

    // Formation C: grid (entrega / orden)
    const cols = 8, rows = 10;
    const col  = i % cols;
    const row  = Math.floor(i / cols);
    const gx   = cx - (cols - 1) * 28 / 2 + col * 28;
    const gy   = cy - (rows - 1) * 28 / 2 + row * 28;

    let px, py;
    if (p < 0.5) {
      const pp = easeInOut(p * 2);
      px = lerp(ax, bx, pp);
      py = lerp(ay, by, pp);
    } else {
      const pp = easeInOut((p - 0.5) * 2);
      px = lerp(bx, gx, pp);
      py = lerp(by, gy, pp);
    }

    // Color: warm amber → cool blue → white
    let r, g, b;
    if (p < 0.5) {
      r = Math.round(lerp(200, 100, p * 2));
      g = Math.round(lerp(140, 160, p * 2));
      b = Math.round(lerp(60, 220, p * 2));
    } else {
      r = Math.round(lerp(100, 230, (p - 0.5) * 2));
      g = Math.round(lerp(160, 220, (p - 0.5) * 2));
      b = Math.round(lerp(220, 200, (p - 0.5) * 2));
    }

    const alpha = 0.15 + p * 0.65;
    const size  = 2.5 + p * 1.8;

    ctx.beginPath();
    ctx.arc(px, py, size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
    ctx.fill();

    // Grid lines at the end
    if (p > 0.65 && col < cols - 1 && i + 1 < N) {
      const ni  = i + 1;
      const nc  = ni % cols;
      const nr  = Math.floor(ni / cols);
      if (nc === col + 1 && nr === row) {
        const ngx  = cx - (cols - 1) * 28 / 2 + nc * 28;
        const ngy  = cy - (rows - 1) * 28 / 2 + nr * 28;
        const pp2  = easeInOut((p - 0.5) * 2);
        const nbx  = cx + Math.cos(ni / (N-1) * Math.PI * 2) * Math.min(W,H) * 0.30;
        const nby  = cy + Math.sin(ni / (N-1) * Math.PI * 2) * Math.min(W,H) * 0.30;
        const npx  = lerp(nbx, ngx, pp2);
        const npy  = lerp(nby, ngy, pp2);

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(npx, npy);
        ctx.strokeStyle = `rgba(200,180,140,${(p - 0.65) * 2 * 0.3})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }

  // Accent glow at ring peak
  const glowAlpha = Math.max(0, 1 - Math.abs(p - 0.5) * 8) * 0.12;
  if (glowAlpha > 0) {
    const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 70);
    grd.addColorStop(0, `rgba(200,169,110,${glowAlpha})`);
    grd.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);
  }
}

let lastSeqFrame = -1;
let rafPending   = false;

function onScroll() {
  if (!rafPending) {
    rafPending = true;
    requestAnimationFrame(updateSeq);
  }
}

function updateSeq() {
  rafPending = false;

  if (!seqOuter) return;
  const rect      = seqOuter.getBoundingClientRect();
  const scrollable = seqOuter.offsetHeight - window.innerHeight;
  const scrolled   = -rect.top;
  const progress   = Math.max(0, Math.min(1, scrolled / scrollable));

  const fIdx = Math.round(progress * (TOTAL_FRAMES - 1));
  frameCtr.textContent = `F${String(fIdx + 1).padStart(3,'0')} / ${String(TOTAL_FRAMES).padStart(3,'0')}`;
  progFill.style.height = (progress * 100) + '%';

  if (fIdx !== lastSeqFrame) {
    lastSeqFrame = fIdx;
    drawFrame(progress);
  }

  // Update chapters & dots
  CHAPTERS_DATA.forEach((ch, i) => {
    const active = progress >= ch.from && progress < ch.to || (i === CHAPTERS_DATA.length - 1 && progress >= ch.from);
    document.getElementById(ch.id).classList.toggle('visible', active);
    dots[i].classList.toggle('active', active);
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
updateSeq(); // initial draw
