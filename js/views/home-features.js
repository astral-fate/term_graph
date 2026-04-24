/**
 * Home page feature cards (six tiles). Markup lives here for easier edits.
 * Uses global goto from mustalih-app.js (event delegation on body).
 */
(function (global) {
  function cardMarkup(opts) {
    const { gotoKey, iconBg, svg } = opts;
    return `
<button type="button" class="feature-card" data-goto="${gotoKey}">
  <div class="feature-icon" style="background: ${iconBg};">${svg}</div>
  <h3></h3>
  <p></p>
  <div class="feature-footer"></div>
</button>`;
  }

  const SVG = {
    graph: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--purple-ink)" stroke-width="2"><circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M7 7l4 10M17 7l-4 10"/></svg>',
    story: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--teal-ink)" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h10"/></svg>',
    anatomy: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--coral-ink)" stroke-width="2"><rect x="6" y="4" width="12" height="16" rx="2"/><path d="M10 10h4M10 14h4"/></svg>',
    detail: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blue-ink)" stroke-width="2"><path d="M4 4h16v4H4zM4 12h10v4H4zM4 20h16"/></svg>',
    rewrite: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--amber-ink)" stroke-width="2"><path d="M4 20h16M14 4l6 6-10 10H4v-6z"/></svg>',
    flash: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--purple-ink)" stroke-width="2"><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18"/></svg>'
  };

  function innerHtmlSkeleton() {
    return [
      cardMarkup({ gotoKey: 'graph', iconBg: 'var(--purple-bg)', svg: SVG.graph }),
      cardMarkup({ gotoKey: 'story', iconBg: 'var(--teal-bg)', svg: SVG.story }),
      cardMarkup({ gotoKey: 'anatomy', iconBg: 'var(--coral-bg)', svg: SVG.anatomy }),
      cardMarkup({ gotoKey: 'detail', iconBg: 'var(--blue-bg)', svg: SVG.detail }),
      cardMarkup({ gotoKey: 'rewrite', iconBg: 'var(--amber-bg)', svg: SVG.rewrite }),
      cardMarkup({ gotoKey: 'flash', iconBg: 'var(--purple-bg)', svg: SVG.flash })
    ].join('');
  }

  /**
   * @param {HTMLElement} host — element with class feature-grid
   */
  function mount(host) {
    if (!host) return;
    host.innerHTML = innerHtmlSkeleton();
  }

  global.HomeFeaturesView = { mount, innerHtmlSkeleton };
})(typeof window !== 'undefined' ? window : this);
