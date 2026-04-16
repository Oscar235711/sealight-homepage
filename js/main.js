/* ============================================================
   SEALIGHT Homepage v03 — Main JavaScript
   Features:
   - Sticky header scroll effect
   - Mobile hamburger menu
   - Vehicle fitment selector (mock data)
   - Scroll-to-top button
   - Scroll-triggered fade-in animations
   - Scene card hover (touch fallback)
   - Active nav link highlighting
   ============================================================ */

'use strict';

/* ── DOM Ready ── */
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initFitmentSelector();
  initScrollToTop();
  initScrollAnimations();
  initSmoothScroll();
  initSeriesHighlight();
});

/* ============================================================
   HEADER: sticky shadow + scroll progress
   ============================================================ */
function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Add scrolled style
const headerStyle = document.createElement('style');
headerStyle.textContent = `
  .site-header.scrolled {
    box-shadow: 0 2px 20px rgba(0,0,0,0.5);
    background: rgba(13,13,13,0.97);
    backdrop-filter: blur(12px);
  }
`;
document.head.appendChild(headerStyle);

/* ============================================================
   MOBILE MENU
   ============================================================ */
function initMobileMenu() {
  const btn  = document.getElementById('nav-hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  let open = false;

  btn.addEventListener('click', () => {
    open = !open;
    menu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
    // Animate hamburger to X
    const spans = btn.querySelectorAll('span');
    if (open) {
      spans[0].style.cssText = 'transform: translateY(7px) rotate(45deg)';
      spans[1].style.cssText = 'opacity: 0; transform: scaleX(0)';
      spans[2].style.cssText = 'transform: translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach(s => s.style.cssText = '');
    }
  });

  // Close menu on link click
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      open = false;
      menu.classList.remove('open');
      btn.querySelectorAll('span').forEach(s => s.style.cssText = '');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (open && !btn.contains(e.target) && !menu.contains(e.target)) {
      open = false;
      menu.classList.remove('open');
      btn.querySelectorAll('span').forEach(s => s.style.cssText = '');
    }
  });
}

/* ============================================================
   FITMENT SELECTOR (Mock Data)
   ============================================================ */
const FITMENT_DATA = {
  years: [2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010,2009,2008],
  makes: {
    Toyota:    ['Camry','Corolla','RAV4','Tacoma','Highlander','4Runner','Tundra','Prius','Sienna','Land Cruiser'],
    Honda:     ['Civic','Accord','CR-V','Pilot','HR-V','Ridgeline','Odyssey','Passport'],
    Ford:      ['F-150','Mustang','Explorer','Edge','Escape','Bronco','Ranger','Expedition'],
    Chevrolet: ['Silverado','Equinox','Malibu','Tahoe','Traverse','Colorado','Blazer'],
    BMW:       ['3 Series','5 Series','X3','X5','7 Series','X1','M3','M5'],
    Subaru:    ['Outback','Forester','Crosstrek','Impreza','Legacy','Ascent','WRX'],
    Nissan:    ['Altima','Rogue','Sentra','Frontier','Pathfinder','Murano','Titan'],
    Ram:       ['1500','2500','3500','ProMaster'],
    Hyundai:   ['Elantra','Tucson','Santa Fe','Sonata','Kona'],
    Jeep:      ['Wrangler','Grand Cherokee','Cherokee','Renegade','Gladiator'],
  },
};

function initFitmentSelector() {
  const yearSel  = document.getElementById('fit-year');
  const makeSel  = document.getElementById('fit-make');
  const modelSel = document.getElementById('fit-model');
  const searchBtn = document.getElementById('fitment-search-btn');
  if (!yearSel) return;

  // Populate years
  FITMENT_DATA.years.forEach(y => {
    const opt = new Option(y, y);
    yearSel.appendChild(opt);
  });

  // Year → enable Make
  yearSel.addEventListener('change', () => {
    makeSel.disabled = !yearSel.value;
    makeSel.innerHTML = '<option value="">Make</option>';
    modelSel.disabled = true;
    modelSel.innerHTML = '<option value="">Model</option>';

    if (yearSel.value) {
      Object.keys(FITMENT_DATA.makes).forEach(make => {
        makeSel.appendChild(new Option(make, make));
      });
    }
  });

  // Make → enable Model
  makeSel.addEventListener('change', () => {
    modelSel.disabled = !makeSel.value;
    modelSel.innerHTML = '<option value="">Model</option>';

    if (makeSel.value && FITMENT_DATA.makes[makeSel.value]) {
      FITMENT_DATA.makes[makeSel.value].forEach(model => {
        modelSel.appendChild(new Option(model, model));
      });
    }
  });

  // Search button
  searchBtn.addEventListener('click', () => {
    const year  = yearSel.value;
    const make  = makeSel.value;
    const model = modelSel.value;

    if (!year || !make || !model) {
      showFitmentMessage('Please select Year, Make, and Model to find compatible bulbs.', 'warn');
      return;
    }

    // Mock result
    showFitmentMessage(
      `✓ Found compatible bulbs for your ${year} ${make} ${model}! Redirecting to results...`,
      'success'
    );

    // Simulate redirect after 1.5s
    setTimeout(() => {
      showFitmentMessage('', 'clear');
      // In production: window.location.href = `/fitment?year=${year}&make=${make}&model=${model}`;
    }, 3000);
  });
}

function showFitmentMessage(msg, type) {
  let el = document.getElementById('fitment-message');
  if (!el) {
    el = document.createElement('p');
    el.id = 'fitment-message';
    el.style.cssText = 'margin-top: 8px; font-size: 13px; font-weight: 600; transition: all .2s;';
    document.querySelector('.fitment-widget')?.appendChild(el);
  }
  if (type === 'clear') { el.textContent = ''; return; }
  el.textContent = msg;
  el.style.color = type === 'success' ? '#22c55e' : '#fbbf24';
}

/* ============================================================
   SCROLL TO TOP BUTTON
   ============================================================ */
function initScrollToTop() {
  const btn = document.getElementById('scroll-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   SCROLL ANIMATIONS (Intersection Observer)
   ============================================================ */
function initScrollAnimations() {
  // Add base animation styles
  const animStyle = document.createElement('style');
  animStyle.textContent = `
    .anim-fade-up {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity .5s ease, transform .5s ease;
    }
    .anim-fade-up.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .anim-fade-in {
      opacity: 0;
      transition: opacity .5s ease;
    }
    .anim-fade-in.visible {
      opacity: 1;
    }
    /* Stagger children */
    .stagger-children > * {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity .45s ease, transform .45s ease;
    }
    .stagger-children.visible > *:nth-child(1) { transition-delay: 0ms; }
    .stagger-children.visible > *:nth-child(2) { transition-delay: 80ms; }
    .stagger-children.visible > *:nth-child(3) { transition-delay: 160ms; }
    .stagger-children.visible > *:nth-child(4) { transition-delay: 240ms; }
    .stagger-children.visible > *:nth-child(5) { transition-delay: 320ms; }
    .stagger-children.visible > * {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(animStyle);

  // Apply animation classes
  document.querySelectorAll('.section-header').forEach(el => el.classList.add('anim-fade-up'));
  document.querySelectorAll('.trust-items').forEach(el => el.classList.add('stagger-children'));
  document.querySelectorAll('.scenes-grid').forEach(el => el.classList.add('stagger-children'));
  document.querySelectorAll('.series-grid').forEach(el => el.classList.add('stagger-children'));
  document.querySelectorAll('.brand-grid').forEach(el => el.classList.add('stagger-children'));
  document.querySelectorAll('.reviews-grid').forEach(el => el.classList.add('stagger-children'));
  document.querySelectorAll('.support-grid').forEach(el => el.classList.add('stagger-children'));
  document.querySelectorAll('.edu-grid').forEach(el => el.classList.add('stagger-children'));
  document.querySelectorAll('.bottom-cta-inner').forEach(el => el.classList.add('anim-fade-up'));
  document.querySelectorAll('.before-after-pair').forEach(el => el.classList.add('anim-fade-in'));

  // Observer
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target); // animate once
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.anim-fade-up, .anim-fade-in, .stagger-children').forEach(el => io.observe(el));
}

/* ============================================================
   SMOOTH SCROLL for anchor links
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 64;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ============================================================
   SERIES: highlight card when scene card is clicked
   (Module 03 → Module 05 dynamic connection, P2 feature preview)
   ============================================================ */
// Scene → Elestial series mapping (Module 03 → Module 05 dynamic link)
// Elestial: Nova(旗舰) / Pulsar(安全Pro) / Prism(Style Most Popular) / Spark(Easy) / Ray(Basic)
const SCENE_TO_SERIES = {
  night:     'nova',     // 夜间看清 → Nova 旗舰亮度
  fog:       'pulsar',   // 雨雾天   → Pulsar 安全Pro
  install:   'spark',    // 自装快   → Spark 刚需平替Easy
  universal: 'prism',    // 通用适配 → Prism Style（均衡首选）
  interior:  'ray',      // 内饰灯   → Ray Basic 性价比
};

function initSeriesHighlight() {
  document.querySelectorAll('.scene-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't intercept CTA links
      if (e.target.closest('.scene-cta')) return;

      const scene = card.dataset.scene;
      const seriesId = SCENE_TO_SERIES[scene];
      if (!seriesId) return;

      const seriesCard = document.querySelector(`.series-card[data-series="${seriesId}"]`);
      if (!seriesCard) return;

      // Scroll to series section
      const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 64;
      const top = seriesCard.getBoundingClientRect().top + window.scrollY - headerH - 20;
      window.scrollTo({ top, behavior: 'smooth' });

      // Pulse highlight
      clearSeriesHighlights();
      seriesCard.classList.add('series-highlight');
      setTimeout(() => seriesCard.classList.remove('series-highlight'), 2000);
    });
  });

  // Add highlight style
  const style = document.createElement('style');
  style.textContent = `
    .series-card.series-highlight {
      border-color: #FF6600 !important;
      box-shadow: 0 0 0 3px rgba(255,102,0,.35), 0 8px 32px rgba(255,102,0,.3) !important;
      animation: seriesPulse .8s ease 2;
    }
    @keyframes seriesPulse {
      0%   { box-shadow: 0 0 0 3px rgba(255,102,0,.35); }
      50%  { box-shadow: 0 0 0 8px rgba(255,102,0,.1); }
      100% { box-shadow: 0 0 0 3px rgba(255,102,0,.35); }
    }
  `;
  document.head.appendChild(style);
}

function clearSeriesHighlights() {
  document.querySelectorAll('.series-card.series-highlight').forEach(el => el.classList.remove('series-highlight'));
}

/* ============================================================
   UTILITY: Debounce
   ============================================================ */
function debounce(fn, ms) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

/* ============================================================
   ACTIVE NAV LINK on scroll
   ============================================================ */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const onScroll = debounce(() => {
    const headerH = 70;
    let current = '';
    sections.forEach(s => {
      const top = s.getBoundingClientRect().top;
      if (top < headerH + 100) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  }, 60);

  window.addEventListener('scroll', onScroll, { passive: true });

  // Add active nav style
  const style = document.createElement('style');
  style.textContent = `.nav-links a.active { color: #FF6600 !important; }`;
  document.head.appendChild(style);
})();
