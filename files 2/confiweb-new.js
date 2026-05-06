/* ════════════════════════════════════
   confiweb-new.js
════════════════════════════════════ */

// Year
document.getElementById('cw-year').textContent = new Date().getFullYear();

// ── NAVBAR ────────────────────────────
const cwNav    = document.getElementById('cw-nav');
const cwBurger = document.getElementById('cw-burger');
const cwLinks  = document.getElementById('cw-links');

window.addEventListener('scroll', () => {
  cwNav.classList.toggle('scrolled', window.scrollY > 60);
});

cwBurger.addEventListener('click', () => {
  cwBurger.classList.toggle('open');
  cwLinks.classList.toggle('open');
  document.body.style.overflow = cwLinks.classList.contains('open') ? 'hidden' : '';
});

cwLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    cwBurger.classList.remove('open');
    cwLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── LANG ─────────────────────────────
const cwLangBtn  = document.getElementById('cw-lang-btn');
const cwLangDrop = document.getElementById('cw-lang-drop');
const cwLangLabel = document.getElementById('cw-lang-label');

cwLangBtn.addEventListener('click', e => {
  e.stopPropagation();
  cwLangDrop.classList.toggle('open');
});
document.addEventListener('click', () => cwLangDrop.classList.remove('open'));

function cwLang(lang) {
  cwLangLabel.textContent = lang.toUpperCase();
  localStorage.setItem('cw-lang', lang);
  cwLangDrop.classList.remove('open');
  // translations hook: applyTranslations(lang)
}

const savedLang = localStorage.getItem('cw-lang') || 'es';
cwLangLabel.textContent = savedLang.toUpperCase();

// ── FABs ─────────────────────────────
const cwFab = document.getElementById('cw-fab');
const cwTop = document.getElementById('cw-top');

window.addEventListener('scroll', () => {
  const show = window.scrollY > 300;
  cwFab.classList.toggle('visible', show);
  cwTop.classList.toggle('visible', show);
});

// ── SCROLL REVEAL ─────────────────────
const revealEls = document.querySelectorAll(
  '.cw-service, .cw-case, .cw-price-card, .cw-maint-card, .cw-testi, .cw-step, .cw-prob-item, .cw-stat'
);
revealEls.forEach(el => el.classList.add('cw-reveal'));

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObs.observe(el));

// ── SMOOTH CLOSE MOBILE NAV ON RESIZE ─
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    cwBurger.classList.remove('open');
    cwLinks.classList.remove('open');
    document.body.style.overflow = '';
  }
});
