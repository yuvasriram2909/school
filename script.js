/* ============================================================
   YUVA'S SCHOOL – Premium Interactive JavaScript
   ============================================================ */

'use strict';

/* ══════════════════════════════════════════════════════════════
   1. PRELOADER
══════════════════════════════════════════════════════════════ */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('done');
    document.body.style.overflow = '';
    initScrollReveal();
    initCounters();
  }, 2400);
  document.body.style.overflow = 'hidden';
});

/* ══════════════════════════════════════════════════════════════
   2. CUSTOM CURSOR / MOUSE GLOW
══════════════════════════════════════════════════════════════ */
const cursorGlow = document.getElementById('cursor-glow');
const cursorDot  = document.getElementById('cursor-dot');
let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

// Smooth glow follow
(function animateGlow() {
  glowX += (mouseX - glowX) * 0.08;
  glowY += (mouseY - glowY) * 0.08;
  cursorGlow.style.left = glowX + 'px';
  cursorGlow.style.top  = glowY + 'px';
  requestAnimationFrame(animateGlow);
})();

// Cursor scale on interactive elements
document.querySelectorAll('a, button, .tilt-card, .filter-btn, .gallery-item').forEach(el => {
  el.addEventListener('mouseenter', () => cursorDot.style.transform = 'translate(-50%,-50%) scale(2.5)');
  el.addEventListener('mouseleave', () => cursorDot.style.transform = 'translate(-50%,-50%) scale(1)');
});

/* ══════════════════════════════════════════════════════════════
   3. NAVBAR
══════════════════════════════════════════════════════════════ */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
const allNavLinks = document.querySelectorAll('.nav-link, .nav-cta');

// Scroll style
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  toggleScrollTop();
  highlightActiveNav();
});

// Hamburger
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close on link click (mobile)
allNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Active nav highlight
function highlightActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

/* ══════════════════════════════════════════════════════════════
   4. PARTICLES IN HERO
══════════════════════════════════════════════════════════════ */
function createParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 10 + 8}s;
      animation-delay: ${Math.random() * 8}s;
    `;
    container.appendChild(p);
  }
}
createParticles();

/* ══════════════════════════════════════════════════════════════
   5. SCROLL REVEAL
══════════════════════════════════════════════════════════════ */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════════════════════════
   6. ANIMATED COUNTERS
══════════════════════════════════════════════════════════════ */
function initCounters() {
  const counters = document.querySelectorAll('.stat-num');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
  const target  = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

/* ══════════════════════════════════════════════════════════════
   7. 3D TILT EFFECT
══════════════════════════════════════════════════════════════ */
function initTilt() {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width  / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -8;
      const rotateY = ((x - cx) / cx) *  8;
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
initTilt();

/* ══════════════════════════════════════════════════════════════
   8. RIPPLE EFFECT
══════════════════════════════════════════════════════════════ */
document.querySelectorAll('.btn-ripple').forEach(btn => {
  btn.addEventListener('click', function(e) {
    this.classList.remove('rippling');
    void this.offsetWidth; // reflow
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top  - size / 2;
    this.style.setProperty('--ripple-x', x + 'px');
    this.style.setProperty('--ripple-y', y + 'px');
    this.style.setProperty('--ripple-size', size + 'px');
    this.classList.add('rippling');
  });
});

/* ══════════════════════════════════════════════════════════════
   9. GALLERY FILTER + LIGHTBOX
══════════════════════════════════════════════════════════════ */
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lb-img');
const lbClose  = document.getElementById('lb-close');
const lbPrev   = document.getElementById('lb-prev');
const lbNext   = document.getElementById('lb-next');
let currentLbIndex = 0;
let visibleImages = [];

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    galleryItems.forEach(item => {
      if (filter === 'all' || item.dataset.cat === filter) {
        item.classList.remove('hidden');
        item.style.animation = 'fadeInScale 0.4s ease forwards';
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// Lightbox open
galleryItems.forEach((item, i) => {
  item.addEventListener('click', () => {
    visibleImages = [...galleryItems].filter(el => !el.classList.contains('hidden'));
    currentLbIndex = visibleImages.indexOf(item);
    openLightbox(currentLbIndex);
  });
});

function openLightbox(idx) {
  const img = visibleImages[idx].querySelector('img');
  lbImg.src = img.src;
  lbImg.alt = img.alt;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

lbPrev.addEventListener('click', (e) => { e.stopPropagation(); currentLbIndex = (currentLbIndex - 1 + visibleImages.length) % visibleImages.length; openLightbox(currentLbIndex); });
lbNext.addEventListener('click', (e) => { e.stopPropagation(); currentLbIndex = (currentLbIndex + 1) % visibleImages.length; openLightbox(currentLbIndex); });

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft')  { currentLbIndex = (currentLbIndex - 1 + visibleImages.length) % visibleImages.length; openLightbox(currentLbIndex); }
  if (e.key === 'ArrowRight') { currentLbIndex = (currentLbIndex + 1) % visibleImages.length; openLightbox(currentLbIndex); }
});

/* ══════════════════════════════════════════════════════════════
   10. TESTIMONIALS AUTO-SLIDER
══════════════════════════════════════════════════════════════ */
const track    = document.getElementById('testimonials-track');
const prevBtn  = document.getElementById('testi-prev');
const nextBtn  = document.getElementById('testi-next');
const dotsWrap = document.getElementById('testi-dots');
const cards    = track.querySelectorAll('.testimonial-card');
let currentTesti = 0;
let autoSlide;
let cardsPerView = getCardsPerView();

function getCardsPerView() {
  return window.innerWidth < 600 ? 1 : window.innerWidth < 900 ? 2 : 3;
}

// Build dots
function buildDots() {
  dotsWrap.innerHTML = '';
  const total = Math.ceil(cards.length / cardsPerView);
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('div');
    dot.classList.add('testi-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToTesti(i));
    dotsWrap.appendChild(dot);
  }
}
buildDots();

function updateDots() {
  dotsWrap.querySelectorAll('.testi-dot').forEach((d, i) => {
    d.classList.toggle('active', i === Math.floor(currentTesti / cardsPerView));
  });
}

function goToTesti(idx) {
  cardsPerView = getCardsPerView();
  const maxSlide = Math.ceil(cards.length / cardsPerView) - 1;
  currentTesti = Math.max(0, Math.min(idx, maxSlide)) * cardsPerView;
  const cardW = cards[0].offsetWidth + 24; // gap
  track.style.transform = `translateX(-${currentTesti * cardW}px)`;
  updateDots();
}

function nextTesti() {
  cardsPerView = getCardsPerView();
  const maxSlide = Math.ceil(cards.length / cardsPerView) - 1;
  const nextSlide = Math.floor(currentTesti / cardsPerView) + 1;
  goToTesti(nextSlide > maxSlide ? 0 : nextSlide);
}

function prevTesti() {
  cardsPerView = getCardsPerView();
  const maxSlide = Math.ceil(cards.length / cardsPerView) - 1;
  const prevSlide = Math.floor(currentTesti / cardsPerView) - 1;
  goToTesti(prevSlide < 0 ? maxSlide : prevSlide);
}

nextBtn.addEventListener('click', () => { nextTesti(); resetAutoSlide(); });
prevBtn.addEventListener('click', () => { prevTesti(); resetAutoSlide(); });

function resetAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = setInterval(nextTesti, 4500);
}
resetAutoSlide();

window.addEventListener('resize', () => {
  cardsPerView = getCardsPerView();
  buildDots();
  goToTesti(0);
});

/* ══════════════════════════════════════════════════════════════
   11. ADMISSION FORM + CONFETTI POPUP
══════════════════════════════════════════════════════════════ */
const form        = document.getElementById('admission-form');
const popup       = document.getElementById('success-popup');
const overlay     = document.getElementById('popup-overlay');
const popupClose  = document.getElementById('popup-close');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Simple validation
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = '#ff6b6b';
      field.style.boxShadow = '0 0 0 3px rgba(255,107,107,0.2)';
      valid = false;
      setTimeout(() => {
        field.style.borderColor = '';
        field.style.boxShadow = '';
      }, 3000);
    }
  });

  if (!valid) return;

  // Show popup
  overlay.classList.add('open');
  popup.classList.add('open');
  launchConfetti();
  form.reset();
});

function closePopup() {
  overlay.classList.remove('open');
  popup.classList.remove('open');
  document.getElementById('popup-confetti').innerHTML = '';
}

popupClose.addEventListener('click', closePopup);
overlay.addEventListener('click', closePopup);

/* ══════════════════════════════════════════════════════════════
   12. CONFETTI ANIMATION
══════════════════════════════════════════════════════════════ */
function launchConfetti() {
  const container = document.getElementById('popup-confetti');
  const colors = ['#FFD700', '#ffffff', '#ff6b6b', '#4ecdc4', '#a29bfe', '#fd79a8'];

  for (let i = 0; i < 80; i++) {
    const piece = document.createElement('div');
    const size = Math.random() * 10 + 5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const isRect = Math.random() > 0.5;
    piece.style.cssText = `
      position: absolute;
      left: ${Math.random() * 100}%;
      top: -10px;
      width: ${isRect ? size : size / 2}px;
      height: ${size}px;
      background: ${color};
      border-radius: ${isRect ? '2px' : '50%'};
      opacity: 1;
      animation: confettiFall ${Math.random() * 2 + 1.5}s ease forwards;
      animation-delay: ${Math.random() * 1.2}s;
      transform: rotate(${Math.random() * 360}deg);
    `;
    container.appendChild(piece);
  }

  // Add confetti keyframes dynamically
  if (!document.getElementById('confetti-style')) {
    const style = document.createElement('style');
    style.id = 'confetti-style';
    style.textContent = `
      @keyframes confettiFall {
        0%   { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
        100% { transform: translateY(400px) rotate(720deg) scale(0.5); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

/* ══════════════════════════════════════════════════════════════
   13. SCROLL-TO-TOP BUTTON
══════════════════════════════════════════════════════════════ */
const scrollTopBtn = document.getElementById('scroll-top');

function toggleScrollTop() {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
}

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ══════════════════════════════════════════════════════════════
   14. PARALLAX HERO SHAPES
══════════════════════════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const shapes = document.querySelectorAll('.shape');
  shapes.forEach((shape, i) => {
    const speed = (i + 1) * 0.08;
    shape.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * 0.02 * (i + 1)}deg)`;
  });

  // Float icons parallax
  document.querySelectorAll('.float-icon').forEach((icon, i) => {
    const speed = (i % 3 + 1) * 0.05;
    icon.style.transform = `translateY(${scrollY * speed * (i % 2 === 0 ? 1 : -1)}px)`;
  });
});

/* ══════════════════════════════════════════════════════════════
   15. SMOOTH SCROLL FOR NAV LINKS
══════════════════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
      const top  = target.offsetTop - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ══════════════════════════════════════════════════════════════
   16. TEXT REVEAL ANIMATION FOR HERO
══════════════════════════════════════════════════════════════ */
function initHeroReveal() {
  const heroRevealEls = document.querySelectorAll('.hero .reveal-up');
  heroRevealEls.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('revealed');
    }, 500 + i * 180);
  });
  const heroRight = document.querySelectorAll('.hero .reveal-right');
  heroRight.forEach((el) => {
    setTimeout(() => {
      el.classList.add('revealed');
    }, 800);
  });
}

// After preloader
window.addEventListener('load', () => {
  setTimeout(initHeroReveal, 2500);
});

/* ══════════════════════════════════════════════════════════════
   17. DYNAMIC NAV ACTIVE STYLE
══════════════════════════════════════════════════════════════ */
const navLinkStyle = document.createElement('style');
navLinkStyle.textContent = `
  .nav-link.active { color: var(--gold) !important; }
  .nav-link.active::after { transform: scaleX(1) !important; }
`;
document.head.appendChild(navLinkStyle);

/* ══════════════════════════════════════════════════════════════
   18. RIPPLE BUTTON CSS VARS
══════════════════════════════════════════════════════════════ */
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  .btn-ripple::after {
    width: var(--ripple-size, 200px);
    height: var(--ripple-size, 200px);
    left: var(--ripple-x, 50%);
    top: var(--ripple-y, 50%);
  }
`;
document.head.appendChild(rippleStyle);

/* ══════════════════════════════════════════════════════════════
   19. FADE-IN GALLERY ITEMS ANIMATION
══════════════════════════════════════════════════════════════ */
const galleryStyle = document.createElement('style');
galleryStyle.textContent = `
  @keyframes fadeInScale {
    from { opacity: 0; transform: scale(0.9); }
    to   { opacity: 1; transform: scale(1); }
  }
`;
document.head.appendChild(galleryStyle);

/* ══════════════════════════════════════════════════════════════
   20. STATS SECTION – trigger on visibility
══════════════════════════════════════════════════════════════ */
// Counters are initialized after preloader via initCounters()

/* ══════════════════════════════════════════════════════════════
   21. FORM INPUT FOCUS EFFECTS
══════════════════════════════════════════════════════════════ */
document.querySelectorAll('.form-group input, .form-group select').forEach(input => {
  input.addEventListener('focus', () => {
    const icon = input.parentElement.querySelector('.form-icon');
    if (icon) icon.style.color = 'var(--gold)';
  });
  input.addEventListener('blur', () => {
    const icon = input.parentElement.querySelector('.form-icon');
    if (icon) icon.style.color = '';
  });
});

/* ══════════════════════════════════════════════════════════════
   22. ANIMATED GRADIENT BACKGROUND ON HERO HEADING
══════════════════════════════════════════════════════════════ */
// Already handled in CSS with `gradientShift` keyframe

/* ══════════════════════════════════════════════════════════════
   23. MOBILE TOUCH SWIPE FOR TESTIMONIALS
══════════════════════════════════════════════════════════════ */
let touchStartX = 0;
track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; });
track.addEventListener('touchend', (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) nextTesti();
    else prevTesti();
    resetAutoSlide();
  }
});

/* ══════════════════════════════════════════════════════════════
   24. INIT ON DOM READY
══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Already handled above
});

console.log('%cYUVA\'S SCHOOL – Built with ❤️ for Excellence', 'background: #2B2B2B; color: #FFD700; font-size: 14px; padding: 10px 20px; border-radius: 8px; font-weight: bold;');
