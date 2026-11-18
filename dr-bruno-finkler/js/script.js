// Menu mobile
const toggle = document.querySelector('.header__toggle');
const nav = document.querySelector('.header__nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open);
});

nav.querySelectorAll('a').forEach((link) =>
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  })
);

// Ano no rodapé
document.getElementById('ano').textContent = new Date().getFullYear();

// Feed do Instagram (via Behold — ver comentário no HTML)
(function () {
  const section = document.querySelector('.insta');
  if (!section) return;
  const url = section.dataset.feedUrl;
  if (!url) return; // sem feed configurado: mantém os quadros que levam ao perfil

  const grid = section.querySelector('.insta__grid');
  const more = document.getElementById('insta-more');
  const PAGE = 8;
  let posts = [];
  let shown = 0;

  const ICONS = {
    VIDEO: '<path d="M8 5v14l11-7z"/>',
    CAROUSEL_ALBUM: '<path d="M4 7h11v11H4z" opacity=".7"/><path d="M8 3h12v12H8z"/>',
  };

  const imageOf = (p) =>
    (p.sizes && (p.sizes.medium || p.sizes.small || p.sizes.large || {}).mediaUrl) ||
    (p.mediaType === 'VIDEO' ? p.thumbnailUrl : p.mediaUrl) ||
    p.thumbnailUrl || p.mediaUrl;

  function card(p) {
    const a = document.createElement('a');
    a.className = 'insta__item has-media';
    a.href = p.permalink || section.dataset.profile;
    a.target = '_blank';
    a.rel = 'noopener';
    const caption = (p.prunedCaption || p.caption || '').trim();

    const img = document.createElement('img');
    img.src = imageOf(p);
    img.alt = caption ? caption.slice(0, 120) : 'Publicação do Instagram do Dr. Bruno Finkler';
    img.loading = 'lazy';
    a.appendChild(img);

    if (ICONS[p.mediaType]) {
      a.insertAdjacentHTML('beforeend', `<svg class="insta__badge" viewBox="0 0 24 24" aria-hidden="true">${ICONS[p.mediaType]}</svg>`);
    }
    if (caption) {
      const cap = document.createElement('span');
      cap.className = 'insta__cap';
      cap.textContent = caption;
      a.appendChild(cap);
    }
    return a;
  }

  function render() {
    posts.slice(shown, shown + PAGE).forEach((p) => grid.appendChild(card(p)));
    shown = Math.min(shown + PAGE, posts.length);
    if (shown >= posts.length) more.hidden = true;
  }

  fetch(url)
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .then((data) => {
      posts = (Array.isArray(data) ? data : data.posts || []).filter(imageOf);
      if (!posts.length) return;
      grid.innerHTML = '';
      grid.classList.remove('insta__grid--embeds');
      more.textContent = 'Carregar mais';
      render();
      more.addEventListener('click', (e) => {
        if (shown < posts.length) { e.preventDefault(); render(); }
      });
    })
    .catch(() => { /* falhou: mantém os quadros que levam ao perfil */ });
})();
