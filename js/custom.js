/* =====================================================
   DOM HELPERS
===================================================== */
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);


/* =====================================================
   MOBILE MENU TOGGLE
===================================================== */
const navToggle = $('#navToggle');
const nav = $('#nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('show');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (
      nav.classList.contains('show') &&
      !nav.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      nav.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}


/* =====================================================
   FOOTER YEAR
===================================================== */
const yearEl = $('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();


/* =====================================================
   DARK MODE TOGGLE
===================================================== */
const themeToggle = $('#themeToggle');

if (themeToggle) {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = '☀️';
    themeToggle.setAttribute('aria-pressed', 'true');
  } else {
    themeToggle.setAttribute('aria-pressed', 'false');
  }

  themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-pressed', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}


/* =====================================================
   CONTACT FORM VALIDATION
===================================================== */
const form = $('#contactForm');
const formMsg = $('#formMsg');

if (form && formMsg) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      showFormMessage('Please fill all fields!', 'red');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showFormMessage('Please enter a valid email!', 'red');
      return;
    }

    showFormMessage('Message sent successfully!', 'green');
    form.reset();
  });
}

function showFormMessage(text, color) {
  formMsg.textContent = text;
  formMsg.style.color = color;
}


/* =====================================================
   SCROLL REVEAL (GENERAL)
===================================================== */
const revealElements = $$('.reveal, .project.card');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  revealElements.forEach(el => observer.observe(el));
} else {
  revealElements.forEach(el => el.classList.add('active'));
}


/* =====================================================
   BACK TO TOP BUTTON
===================================================== */
const backToTopBtn = $('#backToTop');

if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    backToTopBtn.style.display =
      window.scrollY > 300 ? 'block' : 'none';
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* =====================================================
   WORD BY WORD TEXT ANIMATION
===================================================== */
document.querySelectorAll('[data-animate="words"]').forEach(el => {
  const words = el.textContent.trim().split(/\s+/);
  el.textContent = '';

  words.forEach((word, index) => {
    const span = document.createElement('span');
    span.className = 'word';
    span.textContent = word;
    span.style.marginRight = '0.4rem';
    span.style.animationDelay = `${index * 0.1}s`;
    el.appendChild(span);
  });
});


/* =====================================================
   SKILLS ANIMATION
===================================================== */
const skillItems = document.querySelectorAll('.skill');

if ('IntersectionObserver' in window && skillItems.length) {
  const skillObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry, index) => {
        if (!entry.isIntersecting) return;

        const skill = entry.target;
        const bar = skill.querySelector('.bar span');
        const target = bar.dataset.skill;

        setTimeout(() => {
          skill.classList.add('active');
          bar.style.width = `${target}%`;
        }, index * 180);

        observer.unobserve(skill);
      });
    },
    { threshold: 0.35 }
  );

  skillItems.forEach(skill => skillObserver.observe(skill));
}
