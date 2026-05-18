/**
 * TST Men's Health Center — Site Interactions
 */

document.addEventListener('DOMContentLoaded', function () {

  // --- Mobile Nav Toggle ---
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      toggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
    });
  }

  // --- FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-q');
    if (question) {
      question.addEventListener('click', function () {
        const isOpen = item.classList.contains('open');
        // Close all
        faqItems.forEach(function (i) { i.classList.remove('open'); });
        // Open clicked (unless it was already open)
        if (!isOpen) { item.classList.add('open'); }
      });
    }
  });

  // --- Blog Category Filter ---
  const filters = document.querySelectorAll('.blog-filter');
  const cards = document.querySelectorAll('.blog-card');
  if (filters.length && cards.length) {
    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filters.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        const cat = btn.getAttribute('data-cat');
        cards.forEach(function (card) {
          if (cat === 'all' || card.getAttribute('data-cat') === cat) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --- Scroll-reveal ---
  const revealEls = document.querySelectorAll('.diff-card, .service-card, .step, .blog-card, .process-step, .founder-block');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      observer.observe(el);
    });
  } else {
    // Fallback: just show everything
    revealEls.forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }

  // --- Form Submit ---
  const form = document.getElementById('bookingForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // Placeholder: replace with actual submission endpoint
      alert('感谢您的预约申请！我们将在工作时间与您联系确认。\n\nThank you! We will contact you during business hours.');
      form.reset();
    });
  }

});
