/**
 * TST Site Data Loader
 * Fetches CMS-managed data files and injects them into the page.
 * Uses data-* attributes on HTML elements to match content.
 */
(function() {
  const DATA_PATH = '/data/';

  function loadJSON(path) {
    return fetch(DATA_PATH + path)
      .then(r => r.json())
      .catch(() => null); // Silently fail if file doesn't exist (before first CMS save)
  }

  // Fill elements with data-site="key" attributes
  function fillSiteData(data) {
    if (!data) return;
    document.querySelectorAll('[data-site]').forEach(el => {
      const key = el.getAttribute('data-site');
      if (data[key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.value = data[key];
        } else {
          el.textContent = data[key];
        }
      }
    });
  }

  // Fill hero section
  function fillHero(data) {
    if (!data) return;
    const heroTitle = document.querySelector('[data-hero="title"]');
    const heroSub = document.querySelector('[data-hero="subtitle"]');
    const heroCTA = document.querySelector('[data-hero="cta"]');

    if (heroTitle && data.title) heroTitle.textContent = data.title;
    if (heroSub && data.subtitle) heroSub.textContent = data.subtitle;
    if (heroCTA && data.cta_text) {
      heroCTA.textContent = data.cta_text;
      if (data.cta_link) heroCTA.href = data.cta_link;
    }
  }

  // Fill about page
  function fillAbout(data) {
    if (!data) return;
    document.querySelectorAll('[data-about]').forEach(el => {
      const key = el.getAttribute('data-about');
      if (data[key]) el.innerHTML = data[key]; // Use innerHTML for markdown
    });
  }

  // Load all data
  Promise.all([
    loadJSON('site.json'),
    loadJSON('hero.json'),
    loadJSON('about.json')
  ]).then(([site, hero, about]) => {
    fillSiteData(site);
    fillHero(hero);
    fillAbout(about);
    document.documentElement.classList.add('data-loaded');
  });
})();
