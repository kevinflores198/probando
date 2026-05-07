/* ════════════════════════════════════
   confiweb-new.js
════════════════════════════════════ */

// Year
document.getElementById('cw-year').textContent = new Date().getFullYear();

// ── NAVBAR ────────────────────────────
const cwNav      = document.getElementById('cw-nav');
const cwBurger   = document.getElementById('cw-burger');
const cwLinks    = document.getElementById('cw-links');
const cwBackdrop = document.getElementById('cw-backdrop');
const cwNavClose = document.getElementById('cw-nav-close');

window.addEventListener('scroll', () => {
  cwNav.classList.toggle('scrolled', window.scrollY > 60);
});

function cwOpen() {
  cwBurger.classList.add('open');
  cwLinks.classList.add('open');
  if (cwBackdrop) cwBackdrop.classList.add('visible');
  document.body.style.overflow = 'hidden';
}
function cwClose() {
  cwBurger.classList.remove('open');
  cwLinks.classList.remove('open');
  if (cwBackdrop) cwBackdrop.classList.remove('visible');
  document.body.style.overflow = '';
}

cwBurger.addEventListener('click', () => {
  cwLinks.classList.contains('open') ? cwClose() : cwOpen();
});
if (cwBackdrop) cwBackdrop.addEventListener('click', cwClose);
if (cwNavClose) cwNavClose.addEventListener('click', cwClose);
document.addEventListener('keydown', e => { if (e.key === 'Escape') cwClose(); });
cwLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', cwClose));
window.addEventListener('resize', () => { if (window.innerWidth > 768) cwClose(); });

// ── ACTIVE SECTION ───────────────────
const cwSections  = document.querySelectorAll('main section[id]');
const cwNavLinks  = document.querySelectorAll('.cw-links a[href^="#"]');

const cwSectionObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      cwNavLinks.forEach(a => {
        a.classList.toggle('cw-active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-35% 0px -60% 0px', threshold: 0 });

cwSections.forEach(s => cwSectionObs.observe(s));

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

