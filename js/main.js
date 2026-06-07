/* ═══════════════════════════════════════════════
   Jack Wattley Discus — main.js
   ═══════════════════════════════════════════════ */

/* ── Theme stripe (thin color bar at top of page) ── */
const stripe = document.createElement('div');
stripe.id = 'theme-stripe';
document.body.prepend(stripe);

/* ── Category color themes (matches each shop card) ── */
const THEMES = {
  breeding:    { color: '#d4851a', shadow: 'rgba(212,133,26,.5)',  bg: 'rgba(212,133,26,.055)' },
  blues:       { color: '#2a82d4', shadow: 'rgba(42,130,212,.5)',  bg: 'rgba(42,130,212,.055)' },
  reds:        { color: '#d44030', shadow: 'rgba(212,64,48,.5)',   bg: 'rgba(212,64,48,.055)'  },
  spotted:     { color: '#2ab09f', shadow: 'rgba(42,176,159,.5)',  bg: 'rgba(42,176,159,.055)' },
  yellows:     { color: '#d4a800', shadow: 'rgba(212,168,0,.5)',   bg: 'rgba(212,168,0,.055)'  },
  wild:        { color: '#2a9a45', shadow: 'rgba(42,154,69,.5)',   bg: 'rgba(42,154,69,.055)'  },
  altums:      { color: '#7b52c9', shadow: 'rgba(123,82,201,.5)',  bg: 'rgba(123,82,201,.055)' },
  rainbow:     { color: '#d040e0', shadow: 'rgba(208,64,224,.5)',  bg: 'rgba(208,64,224,.055)' },
  cichlids:    { color: '#c0566b', shadow: 'rgba(192,86,107,.5)',  bg: 'rgba(192,86,107,.055)' },
  tetras:      { color: '#1a8abe', shadow: 'rgba(26,138,190,.5)',  bg: 'rgba(26,138,190,.055)' },
  cleanup:     { color: '#9a8a2a', shadow: 'rgba(154,138,42,.5)',  bg: 'rgba(154,138,42,.055)' },
  specials:    { color: '#d4a017', shadow: 'rgba(212,160,23,.5)',  bg: 'rgba(212,160,23,.055)' },
  planted:     { color: '#1a9a40', shadow: 'rgba(26,154,64,.5)',   bg: 'rgba(26,154,64,.055)'  },
  food:        { color: '#c8720a', shadow: 'rgba(200,114,10,.5)',  bg: 'rgba(200,114,10,.055)' },
  meds:        { color: '#2a6ac0', shadow: 'rgba(42,106,192,.5)',  bg: 'rgba(42,106,192,.055)' },
  accessories: { color: '#6a6a9a', shadow: 'rgba(106,106,154,.5)', bg: 'rgba(106,106,154,.055)' },
  equipment:   { color: '#2a7a9a', shadow: 'rgba(42,122,154,.5)',  bg: 'rgba(42,122,154,.055)' },
  ro:          { color: '#1a9abe', shadow: 'rgba(26,154,190,.5)',  bg: 'rgba(26,154,190,.055)' },
  gift:        { color: '#c07a00', shadow: 'rgba(192,122,0,.5)',   bg: 'rgba(192,122,0,.055)'  },
};

const DEFAULT_STRIPE = 'linear-gradient(90deg, #d4a017, #f0c535)';

/* ── Shop card color theme (services page) ── */
const shopSection = document.getElementById('shop-section');
const shopCards   = document.querySelectorAll('.shop-card[data-theme]');

shopCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    const t = THEMES[card.dataset.theme];
    if (!t) return;
    stripe.style.background = t.color;
    stripe.style.boxShadow  = `0 0 20px ${t.shadow}`;
    card.style.boxShadow    = `0 20px 56px ${t.shadow}, 0 4px 12px rgba(0,0,0,.12)`;
    if (shopSection) shopSection.style.backgroundColor = t.bg;
  });
  card.addEventListener('mouseleave', () => {
    stripe.style.background = '';
    stripe.style.boxShadow  = '';
    card.style.boxShadow    = '';
  });
});

if (shopSection) {
  shopSection.addEventListener('mouseleave', () => {
    shopSection.style.backgroundColor = '';
    stripe.style.background = '';
    stripe.style.boxShadow  = '';
  });
}

/* ── Hero floating bubbles ── */
const hero = document.querySelector('.hero');
if (hero) {
  const bubbles = document.createElement('div');
  bubbles.className = 'hero-bubbles';
  hero.prepend(bubbles);
  for (let i = 0; i < 16; i++) {
    const b    = document.createElement('div');
    b.className = 'hero-bubble';
    const size = Math.random() * 64 + 16;
    b.style.cssText = [
      `width:${size}px`,
      `height:${size}px`,
      `left:${Math.random() * 100}%`,
      `animation-duration:${Math.random() * 14 + 9}s`,
      `animation-delay:${Math.random() * 12}s`,
    ].join(';');
    bubbles.appendChild(b);
  }
}

/* ── Animated stat counter ── */
function animateCounter(el) {
  const raw   = el.textContent.trim();
  const match = raw.match(/^(\d+\.?\d*)/);
  if (!match) return;
  const num      = parseFloat(match[1]);
  const suffix   = raw.slice(match[0].length);
  const decimals = match[1].includes('.') ? 1 : 0;
  const start    = performance.now();
  const dur      = 1800;
  (function update(now) {
    const p = Math.min((now - start) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3); // ease-out cubic
    el.textContent = (num * e).toFixed(decimals) + suffix;
    if (p < 1) requestAnimationFrame(update);
    else el.textContent = raw;
  })(start);
}

/* ── Scroll reveal with staggered delays ── */
function initReveal() {
  document.querySelectorAll('.feature-card').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 3) * 0.12}s`;
  });
  document.querySelectorAll('.service-card').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 2) * 0.1}s`;
  });
  document.querySelectorAll('.team-card').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.1}s`;
  });
  document.querySelectorAll('.shop-card').forEach((el, i) => {
    el.classList.add('reveal-scale');
    el.style.transitionDelay = `${(i % 4) * 0.07}s`;
  });
  document.querySelectorAll('.contact-detail').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.08}s`;
  });

  const seen = new Set();
  const io   = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.classList.contains('stat-num') && !seen.has(el)) {
        seen.add(el);
        animateCounter(el);
      } else {
        el.classList.add('visible');
      }
      io.unobserve(el);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .reveal-scale').forEach(el => io.observe(el));
  document.querySelectorAll('.stat-num').forEach(el => io.observe(el));
}

document.addEventListener('DOMContentLoaded', initReveal);

/* ── Button ripple ── */
document.addEventListener('click', e => {
  const btn = e.target.closest('.btn');
  if (!btn) return;
  const r    = btn.getBoundingClientRect();
  const size = Math.max(r.width, r.height) * 2;
  const rip  = document.createElement('span');
  rip.className = 'ripple';
  rip.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-r.left-size/2}px;top:${e.clientY-r.top-size/2}px`;
  btn.appendChild(rip);
  rip.addEventListener('animationend', () => rip.remove());
});

/* ── Mobile nav toggle ── */
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target))
      navLinks.classList.remove('open');
  });
}

/* ── Active nav link ── */
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html'))
    link.classList.add('active');
});

/* ── Contact form ── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const success = contactForm.closest('section, .contact-form')?.querySelector('.form-success')
                  || document.querySelector('.form-success');
    contactForm.style.display = 'none';
    if (success) success.style.display = 'block';
  });
}

/* ── Waitlist form (Formspree AJAX) ── */
const waitlistForm = document.getElementById('waitlistForm');
if (waitlistForm) {
  waitlistForm.addEventListener('submit', async e => {
    e.preventDefault();
    const btn     = waitlistForm.querySelector('button');
    const success = document.getElementById('waitlistSuccess');
    btn.textContent = 'Joining…';
    btn.disabled = true;
    try {
      const res = await fetch(waitlistForm.action, {
        method: 'POST',
        body: new FormData(waitlistForm),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        waitlistForm.style.display = 'none';
        if (success) success.style.display = 'block';
      } else {
        btn.textContent = 'Join Waitlist';
        btn.disabled = false;
      }
    } catch {
      btn.textContent = 'Join Waitlist';
      btn.disabled = false;
    }
  });
}

/* ── Footer newsletter ── */
document.querySelectorAll('.footer-newsletter').forEach(nf => {
  const btn   = nf.querySelector('button');
  const input = nf.querySelector('input');
  if (!btn || !input) return;
  btn.addEventListener('click', () => {
    if (input.value.includes('@')) {
      btn.textContent = 'Subscribed!';
      btn.style.background = '#1a7a8a';
      btn.style.color = '#fff';
      input.value = '';
    } else {
      input.style.borderColor = '#e74c3c';
      setTimeout(() => (input.style.borderColor = ''), 1500);
    }
  });
});
