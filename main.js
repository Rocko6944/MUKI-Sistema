/* ============================================
   MUKIÁLOM - Main JavaScript
   Interactivity & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --------- Header Scroll Effect ---------
  const header = document.getElementById('header');
  const heroSection = document.getElementById('inicio');

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --------- Mobile Menu Toggle ---------
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');

  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile menu when clicking a link
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    if (!mainNav.contains(e.target) && !menuToggle.contains(e.target) && mainNav.classList.contains('open')) {
      mainNav.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // --------- Active Nav Link Highlighting ---------
  const navLinks = document.querySelectorAll('.header__nav-link');
  const sections = document.querySelectorAll('section[id]');

  const highlightActiveNav = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('data-nav') === id) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightActiveNav, { passive: true });

  // --------- Smooth Scroll for Anchor Links ---------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --------- Intersection Observer for Animations ---------
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
    fadeObserver.observe(el);
  });

  // --------- Staggered Animation for Experience Cards ---------
  const cards = document.querySelectorAll('.experience__card');
  cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
  });

  // --------- Parallax Effect on Hero ---------
  const heroBg = document.querySelector('.hero__background img');

  const handleParallax = () => {
    if (window.innerWidth > 768) {
      const scrollY = window.scrollY;
      const heroHeight = heroSection.offsetHeight;

      if (scrollY < heroHeight) {
        const translateY = scrollY * 0.3;
        heroBg.style.transform = `translateY(${translateY}px) scale(1.05)`;
      }
    }
  };

  window.addEventListener('scroll', handleParallax, { passive: true });

  // --------- Hero Text Entrance Animation ---------
  const heroContent = document.querySelector('.hero__content');
  const heroFadeEls = heroContent.querySelectorAll('.fade-in');

  // Trigger hero animations immediately after a short delay
  setTimeout(() => {
    heroFadeEls.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, i * 200);
    });
  }, 300);

  // --------- Console Branding ---------
  console.log(
    '%c🍽️ Mukiálom Restaurante %c\nDonde la tradición se fusiona con la innovación',
    'color: #D4A017; font-size: 18px; font-weight: bold;',
    'color: #999; font-size: 12px;'
  );

});
