/*
  Interactive behaviours for Ayushi Vaghela’s portfolio site.

  This script uses the IntersectionObserver API to reveal
  sections smoothly as they enter the viewport, and updates
  navigation links based on scroll position. It also ensures
  one-time observation for performance.
*/

document.addEventListener('DOMContentLoaded', () => {
  // Scroll-triggered reveal of sections
  const sections = document.querySelectorAll('.section');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => revealObserver.observe(section));

  // Typewriter effect for the hero headline.  The text is
  // progressively revealed one character at a time to capture
  // attention when the page loads.  If the element cannot be
  // found, the function exits gracefully.
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

  // Highlight active nav link
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
      const section = sectionMap[id];
      if (section.offsetTop <= scrollPos) {
        activeId = id;
      }
    }
    navLinks.forEach(link => {
      const id = link.getAttribute('href').substring(1);
      link.classList.toggle('active', id === activeId);
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();
});
