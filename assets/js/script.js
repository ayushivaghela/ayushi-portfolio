/*
  Interactive behaviours for Ayushi Vaghela's portfolio site.

  Features:
  - Theme persistence via localStorage
  - Scroll-triggered section reveal (IntersectionObserver)
  - Typewriter effect on hero headline
  - Active nav link highlighting on scroll
  - Hamburger mobile navigation toggle
  - Back-to-top button visibility & click handler
*/

// Load and apply saved theme immediately to prevent flashing
const savedTheme = localStorage.getItem('theme') || 'teal';
document.documentElement.setAttribute('data-theme', savedTheme);

document.addEventListener('DOMContentLoaded', () => {
  // ── Theme selector ───────────────────────────────────────────────────
  const themeSelect = document.getElementById('theme-select');
  if (themeSelect) {
    themeSelect.value = savedTheme;
    themeSelect.addEventListener('change', (e) => {
      const selectedTheme = e.target.value;
      document.documentElement.setAttribute('data-theme', selectedTheme);
      localStorage.setItem('theme', selectedTheme);
    });
  }

  // ── Scroll-triggered reveal of sections ─────────────────────────────
  const sections = document.querySelectorAll('.section');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  sections.forEach(section => revealObserver.observe(section));

  // ── Typewriter effect ────────────────────────────────────────────────
  const typedEl = document.getElementById('typed-text');
  if (typedEl) {
    const fullText = 'Bridging Science & Communication';
    let charIndex = 0;
    function typeChar() {
      typedEl.textContent = fullText.slice(0, charIndex);
      if (charIndex < fullText.length) {
        charIndex++;
        setTimeout(typeChar, 120);
      }
    }
    typeChar();
  }

  // ── Active nav link on scroll ────────────────────────────────────────
  const navLinks = document.querySelectorAll('.nav-links a');
  const sectionMap = {};
  navLinks.forEach(link => {
    const id = link.getAttribute('href').substring(1);
    const section = document.getElementById(id);
    if (section) sectionMap[id] = section;
  });

  function updateActiveLink() {
    const scrollPos = window.scrollY + window.innerHeight / 3;
    let activeId = '';
    for (const id in sectionMap) {
      if (sectionMap[id].offsetTop <= scrollPos) activeId = id;
    }
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href').substring(1) === activeId);
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  // ── Hamburger mobile nav ─────────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinksList = document.querySelector('.nav-links');

  if (hamburger && navLinksList) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinksList.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a nav link is clicked
    navLinksList.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        navLinksList.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav')) {
        navLinksList.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ── Back to top button ───────────────────────────────────────────────
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
