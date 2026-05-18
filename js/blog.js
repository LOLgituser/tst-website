/**
 * TST Blog Loader
 * Fetches blog markdown files and renders them on the Insights page.
 * Uses a minimal frontmatter parser + simple markdown rendering.
 */
(function() {
  const BLOG_PATH = '/content/blog/';
  const BLOG_CONTAINER = document.getElementById('blogGrid') || document.getElementById('blog-list');
  if (!BLOG_CONTAINER) return;

  function parseFrontmatter(raw) {
    const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) return { meta: {}, body: raw };
    
    const meta = {};
    match[1].split('\n').forEach(line => {
      const [k, ...v] = line.split(':');
      if (k && v.length) meta[k.trim()] = v.join(':').trim();
    });
    return { meta, body: match[2] };
  }

  function simpleMarkdown(md) {
    return md
      .replace(/^### (.+)$/gm, '<h4>$1</h4>')
      .replace(/^## (.+)$/gm, '<h3>$1</h3>')
      .replace(/^# (.+)$/gm, '<h2>$1</h2>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/^\- (.+)$/gm, '<li>$1</li>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(.+)$/gm, '<p>$1</p>');
  }

  // Fetch the blog index (list of markdown files)
  // Since we can't list directories from client-side, we use a manifest
  fetch('/data/blog-index.json')
    .then(r => r.json())
    .then(posts => {
      if (!posts || !posts.length) {
        BLOG_CONTAINER.innerHTML = '<p style="color:rgba(245,240,232,0.4)">即将发布首批科普文章。敬请期待。</p>';
        return;
      }

      // Sort by date descending
      posts.sort((a, b) => new Date(b.date) - new Date(a.date));

      const html = posts.map(post => `
        <article class="blog-card">
          ${post.image ? `<div class="blog-card-img"><img src="${post.image}" alt="${post.title}" loading="lazy"></div>` : ''}
          <div class="blog-card-body">
            <span class="blog-card-category">${post.category || ''}</span>
            <span class="blog-card-date">${post.date || ''}</span>
            <h3><a href="blog-post.html?slug=${post.slug}">${post.title}</a></h3>
            <p>${post.excerpt || ''}</p>
          </div>
        </article>
      `).join('');

      BLOG_CONTAINER.innerHTML = html;
    })
    .catch(() => {
      BLOG_CONTAINER.innerHTML = '<p style="color:rgba(245,240,232,0.4)">即将发布首批科普文章。敬请期待。</p>';
    });
})();
