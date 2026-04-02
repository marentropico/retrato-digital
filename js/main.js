/* ============================================
   MARENTROPICO — Main JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============ LOADER ============
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader?.classList.add('hide');
      setTimeout(() => loader?.remove(), 600);
    }, 1600);
  });

  // ============ CUSTOM CURSOR ============
  const cursor = document.querySelector('.cursor');
  const ring = document.querySelector('.cursor-ring');
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // ============ NAV SCROLL ============
  const nav = document.querySelector('.nav');
  const progress = document.querySelector('.page-progress');

  window.addEventListener('scroll', () => {
    // Nav
    if (window.scrollY > 80) nav?.classList.add('scrolled');
    else nav?.classList.remove('scrolled');

    // Progress bar
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (scrollTop / docHeight) * 100;
    if (progress) progress.style.width = pct + '%';
  }, { passive: true });

  // ============ SCROLL REVEAL ============
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => observer.observe(el));

  // ============ SKILL BARS ============
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = bar.dataset.pct + '%';
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const skillPanel = document.querySelector('.skills-panel');
  if (skillPanel) skillObserver.observe(skillPanel);

  // ============ SMOOTH SCROLL ANCHORS ============
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ============ LIGHTBOX ============
  window.openLightbox = function(html) {
    const lb = document.getElementById('lightbox');
    const content = lb.querySelector('.lightbox-content');
    content.innerHTML = html;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function() {
    const lb = document.getElementById('lightbox');
    lb.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
      lb.querySelector('.lightbox-content').innerHTML = '';
    }, 300);
  };

  document.getElementById('lightbox')?.addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });

});
