// Mobile nav toggle
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });
}

// Active nav link
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// Contact form
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const success = document.querySelector('.form-success');
    form.style.display = 'none';
    if (success) success.style.display = 'block';
  });
}

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .service-card, .team-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(el);
});

// Waitlist form (Formspree AJAX submit)
const waitlistForm = document.getElementById('waitlistForm');
if (waitlistForm) {
  waitlistForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = waitlistForm.querySelector('button');
    const success = document.getElementById('waitlistSuccess');
    btn.textContent = 'Joining…';
    btn.disabled = true;
    try {
      const res = await fetch(waitlistForm.action, {
        method: 'POST',
        body: new FormData(waitlistForm),
        headers: { Accept: 'application/json' }
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

// Newsletter form
const newsletterForms = document.querySelectorAll('.footer-newsletter');
newsletterForms.forEach(nf => {
  const btn = nf.querySelector('button');
  const input = nf.querySelector('input');
  if (btn && input) {
    btn.addEventListener('click', () => {
      if (input.value.includes('@')) {
        btn.textContent = 'Subscribed!';
        btn.style.background = '#1a7a8a';
        btn.style.color = '#fff';
        input.value = '';
      } else {
        input.style.borderColor = '#e74c3c';
        setTimeout(() => input.style.borderColor = '', 1500);
      }
    });
  }
});
