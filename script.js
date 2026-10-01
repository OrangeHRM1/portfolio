/**
 * ============================================================================
 * YASSA GAMAL SHAWKY - QA & SOFTWARE TESTING PORTFOLIO
 * Vanilla JavaScript Implementation
 * Features:
 *  - Dark/Light Theme Switching (Dark by default with localStorage persistence)
 *  - Responsive Mobile Navigation (Accessible hamburger toggle)
 *  - ScrollSpy / Active Navigation State Tracking
 *  - IntersectionObserver Scroll Reveal Animations
 *  - Interactive QA Documentation Showcase (Bug Report vs Test Case Tabs)
 *  - Back-to-Top Floating Button
 *  - Client-side Contact Form Validation & Feedback
 *  - Non-intrusive Placeholder Link Handling
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Theme Manager (Dark Mode Default)
  // --------------------------------------------------------------------------
  const THEME_STORAGE_KEY = 'ygs_portfolio_theme';
  const htmlElement = document.documentElement;
  const themeToggleBtn = document.getElementById('themeToggle');

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    // If explicitly saved as light, apply light; otherwise default to dark
    const targetTheme = savedTheme === 'light' ? 'light' : 'dark';
    applyTheme(targetTheme);
  }

  function applyTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    if (themeToggleBtn) {
      themeToggleBtn.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      );
      themeToggleBtn.setAttribute(
        'title',
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      );
    }
  }

  function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  // --------------------------------------------------------------------------
  // 2. Mobile Navigation Toggle & Accessibility
  // --------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');

  function toggleMobileMenu() {
    if (!mainNav || !mobileMenuBtn) return;
    const isOpen = mainNav.classList.contains('open');

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function openMobileMenu() {
    mainNav.classList.add('open');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    mobileMenuBtn.setAttribute('aria-label', 'Close navigation menu');
  }

  function closeMobileMenu() {
    mainNav.classList.remove('open');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.setAttribute('aria-label', 'Open navigation menu');
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }

  // Close mobile nav when clicking any nav link
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (mainNav && mainNav.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  });

  // Close mobile nav when clicking outside header
  document.addEventListener('click', (event) => {
    if (
      mainNav &&
      mainNav.classList.contains('open') &&
      !mainNav.contains(event.target) &&
      !mobileMenuBtn.contains(event.target)
    ) {
      closeMobileMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mainNav && mainNav.classList.contains('open')) {
      closeMobileMenu();
      mobileMenuBtn.focus();
    }
  });

  // --------------------------------------------------------------------------
  // 3. Active Navigation State on Scroll (ScrollSpy)
  // --------------------------------------------------------------------------
  const trackedSections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 120; // 120px offset for fixed header

    let currentSectionId = '';

    trackedSections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSectionId = section.getAttribute('id');
      }
    });

    // Fallback: If scrolled to the very bottom, activate contact
    if (
      window.innerHeight + Math.round(window.scrollY) >=
      document.body.offsetHeight - 50
    ) {
      currentSectionId = 'contact';
    }

    if (currentSectionId) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // --------------------------------------------------------------------------
  // 4. Scroll Reveal Animations (IntersectionObserver)
  // --------------------------------------------------------------------------
  function setupScrollReveals() {
    const revealElements = document.querySelectorAll(
      '.fade-in-up, .about-card, .service-card, .skill-category-card, .learning-item, .strength-card, .timeline-card, .project-card, .cert-card, .education-card, .contact-card, .contact-form'
    );

    if (!('IntersectionObserver' in window)) {
      // Fallback for browsers without IntersectionObserver
      revealElements.forEach((el) => el.classList.add('revealed'));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => {
      el.classList.add('fade-in-up');
      revealObserver.observe(el);
    });
  }

  // --------------------------------------------------------------------------
  // 5. Back-to-Top Button
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTopBtn');

  function handleBackToTopVisibility() {
    if (!backToTopBtn) return;
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  if (backToTopBtn) {
    window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  // --------------------------------------------------------------------------
  // 6. Interactive QA Artifact Tabs (Bug Report vs Test Case)
  // --------------------------------------------------------------------------
  const tabBugReport = document.getElementById('tabBugReport');
  const tabTestCase = document.getElementById('tabTestCase');
  const panelBugReport = document.getElementById('panelBugReport');
  const panelTestCase = document.getElementById('panelTestCase');

  function switchQATab(selectedTab) {
    if (selectedTab === 'bug') {
      if (tabBugReport) {
        tabBugReport.classList.add('active');
        tabBugReport.setAttribute('aria-selected', 'true');
      }
      if (tabTestCase) {
        tabTestCase.classList.remove('active');
        tabTestCase.setAttribute('aria-selected', 'false');
      }
      if (panelBugReport) {
        panelBugReport.classList.add('active');
        panelBugReport.removeAttribute('hidden');
      }
      if (panelTestCase) {
        panelTestCase.classList.remove('active');
        panelTestCase.setAttribute('hidden', 'true');
      }
    } else {
      if (tabTestCase) {
        tabTestCase.classList.add('active');
        tabTestCase.setAttribute('aria-selected', 'true');
      }
      if (tabBugReport) {
        tabBugReport.classList.remove('active');
        tabBugReport.setAttribute('aria-selected', 'false');
      }
      if (panelTestCase) {
        panelTestCase.classList.add('active');
        panelTestCase.removeAttribute('hidden');
      }
      if (panelBugReport) {
        panelBugReport.classList.remove('active');
        panelBugReport.setAttribute('hidden', 'true');
      }
    }
  }

  if (tabBugReport && tabTestCase) {
    tabBugReport.addEventListener('click', () => switchQATab('bug'));
    tabTestCase.addEventListener('click', () => switchQATab('testcase'));
  }

  // --------------------------------------------------------------------------
  // 7. Contact Form Client-Side Validation
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const contactName = document.getElementById('contactName');
  const contactEmail = document.getElementById('contactEmail');
  const contactMessage = document.getElementById('contactMessage');
  const formSuccessMessage = document.getElementById('formSuccessMessage');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function clearErrors() {
    const errorContainers = document.querySelectorAll('.form-group');
    errorContainers.forEach((group) => group.classList.remove('has-error'));
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      let hasError = false;

      // Validate Name
      if (!contactName.value.trim()) {
        contactName.closest('.form-group').classList.add('has-error');
        hasError = true;
      }

      // Validate Email
      if (!contactEmail.value.trim() || !validateEmail(contactEmail.value.trim())) {
        contactEmail.closest('.form-group').classList.add('has-error');
        hasError = true;
      }

      // Validate Message
      if (!contactMessage.value.trim()) {
        contactMessage.closest('.form-group').classList.add('has-error');
        hasError = true;
      }

      if (hasError) return;

      // Success State
      if (formSuccessMessage) {
        formSuccessMessage.classList.add('visible');
        contactForm.reset();

        // Auto-dismiss success message after 7 seconds
        setTimeout(() => {
          formSuccessMessage.classList.remove('visible');
        }, 7000);
      }
    });

    // Real-time error clearance on input
    [contactName, contactEmail, contactMessage].forEach((field) => {
      if (field) {
        field.addEventListener('input', () => {
          const group = field.closest('.form-group');
          if (group && group.classList.contains('has-error')) {
            group.classList.remove('has-error');
          }
        });
      }
    });
  }

  // --------------------------------------------------------------------------
  // 8. Helpful Toast for Placeholder Actions
  // --------------------------------------------------------------------------
  function createToast(message) {
    let existingToast = document.getElementById('qaToast');
    if (existingToast) {
      existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.id = 'qaToast';
    toast.setAttribute('role', 'alert');
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    toast.style.backgroundColor = 'var(--bg-card)';
    toast.style.color = 'var(--text-primary)';
    toast.style.border = '1px solid var(--accent-primary)';
    toast.style.boxShadow = 'var(--shadow-lg)';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '8px';
    toast.style.fontSize = '0.875rem';
    toast.style.fontFamily = 'var(--font-sans)';
    toast.style.zIndex = '9999';
    toast.style.transition = 'all 0.25s ease';
    toast.style.opacity = '0';
    toast.style.pointerEvents = 'none';
    toast.innerText = message;

    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // Attach polite toasts to placeholder links
  const placeholderLinks = document.querySelectorAll('.disabled-link');
  placeholderLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const label = link.textContent.trim();
      createToast(`Placeholder: ${label} will connect to Yassa's active profile / repository.`);
    });
  });

  const cvButtons = document.querySelectorAll('#cvDownloadBtn, #resumeLink');
  cvButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      createToast("CV Link: Ready to download or view Yassa's PDF resume upon attachment.");
    });
  });

  // --------------------------------------------------------------------------
  // 9. Page Initialization
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setupScrollReveals();
    updateActiveNavLink();
  });

  // Also run immediately in case DOM is already parsed
  initTheme();
  setupScrollReveals();
})();
