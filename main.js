/* ============================================
   MUKIÁLOM - Main JavaScript
   Interactivity & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // --------- Landing Menu from Administration ---------
  const landingMenuTarget = document.getElementById('landing-menu-grid') || document.querySelector('[data-landing-menu]');
  const defaultLandingMenu = [
    { categoria: 'Platos', nombre: 'Ceviche a lo Muki', precio: 45, fotografia: 'Images/logoSinFondo.png', descripcion: 'Pesca fresca, leche de tigre de la casa, camote y cancha.' },
    { categoria: 'Platos', nombre: 'Lomo Saltado', precio: 39, fotografia: 'Images/logoSinFondo.png', descripcion: 'Lomo salteado al wok con papas doradas y arroz.' },
    { categoria: 'Bebidas', nombre: 'Pisco Sour', precio: 23, fotografia: 'Images/logoSinFondo.png', descripcion: 'Coctel clasico preparado al momento.' }
  ];

  const escapeLandingHtml = (value) => String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const normalizeLandingMenuCategory = (category) => (category === 'Bebidas' || category === 'Bebida' ? 'Bebidas' : 'Platos');
  const readLandingMenu = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('muki_carta_landing') || 'null');
      return Array.isArray(stored) && stored.length ? stored.map((item) => ({ ...item, categoria: normalizeLandingMenuCategory(item.categoria) })) : defaultLandingMenu;
    } catch (error) {
      return defaultLandingMenu;
    }
  };

  const renderLandingMenu = () => {
    if (!landingMenuTarget) return;
    const grouped = readLandingMenu().reduce((acc, item) => {
      const category = normalizeLandingMenuCategory(item.categoria);
      acc[category] = acc[category] || [];
      acc[category].push(item);
      return acc;
    }, {});

    landingMenuTarget.innerHTML = Object.entries(grouped).map(([category, items]) => `
      <section class="landing-menu-category">
        <h3>${escapeLandingHtml(category)}</h3>
        <div class="landing-menu-category__items">
          ${items.map((item) => `
            <article class="landing-menu-card">
              ${item.fotografia ? `<img src="${escapeLandingHtml(item.fotografia)}" alt="${escapeLandingHtml(item.nombre)}">` : ''}
              <div class="landing-menu-card__body">
                <div class="landing-menu-card__top">
                  <h4>${escapeLandingHtml(item.nombre)}</h4>
                  <strong>S/ ${(Number(item.precio) || 0).toFixed(2)}</strong>
                </div>
                <p>${escapeLandingHtml(item.descripcion || '')}</p>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    `).join('');
  };

  renderLandingMenu();
  window.addEventListener('storage', (event) => {
    if (event.key === 'muki_carta_landing') renderLandingMenu();
  });

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
