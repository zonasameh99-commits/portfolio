/* ===== CONFIG: replace these placeholders ===== */
const GITHUB_USERNAME = "zonasameh99-commits";
const EMAIL = "zonasameh99@gmail.com";
/* ============================================== */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* Nav: shrink on scroll, active section, mobile menu */
  const nav = $('#nav'), menu = $('#menu'), burger = $('#burger');
  const onScroll = () => nav.classList.toggle('small', scrollY > 40);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const links = [...menu.querySelectorAll('a')];
  const secs = links.map(a => $(a.getAttribute('href')));
  if ('IntersectionObserver' in window) {
    const so = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    }), { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach(s => s && so.observe(s));
  }
  const setMenu = o => { menu.classList.toggle('open', o); burger.setAttribute('aria-expanded', o); burger.setAttribute('aria-label', o ? 'Close menu' : 'Open menu'); };
  burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  /* Terminal typing (runs once, fast) */
  const term = $('#term');
  const lines = ['<b>></b> building digital experiences', '<b>></b> writing clean interfaces', '<b>></b> creating interactive web projects'];
  if (reduce) term.innerHTML = lines.join('\n');
  else {
    const caret = '<span class="caret"></span>';
    let li = 0, ci = 0, done = '';
    const plain = lines.map(l => l.replace(/<[^>]+>/g, ''));
    const type = () => {
      if (li >= lines.length) { term.innerHTML = done.trimEnd() + caret; return; }
      const cur = plain[li].slice(0, ci);
      term.innerHTML = done + '<b>></b>' + esc(cur.slice(1)) + caret;
      if (++ci > plain[li].length) { done += lines[li] + '\n'; li++; ci = 0; setTimeout(type, 160); } else setTimeout(type, 16);
    };
    setTimeout(type, 1300);
  }

  /* Project preview art (used when no image is set) */
  const art = [
    '<rect x="0" y="0" width="64" height="200" fill="#ffffff08"/><rect x="80" y="24" width="200" height="14" rx="3" fill="#ffffff26"/><rect x="80" y="56" width="90" height="64" rx="6" fill="#7aa2ff40"/><rect x="182" y="56" width="90" height="64" rx="6" fill="#ffffff0d"/><rect x="80" y="132" width="192" height="8" rx="3" fill="#ffffff14"/><rect x="80" y="150" width="140" height="8" rx="3" fill="#ffffff14"/>',
    Array.from({ length: 40 }, (_, i) => `<circle cx="${40 + (i % 8) * 34}" cy="${34 + Math.floor(i / 8) * 34}" r="${i % 7 === 3 ? 5 : 2}" fill="${i % 7 === 3 ? '#7aa2ff' : '#ffffff30'}"/>`).join(''),
    '<g font-family="monospace" font-size="11" fill="#ffffff40"><rect x="28" y="30" width="70" height="8" rx="2" fill="#7aa2ff80"/><rect x="48" y="52" width="140" height="8" rx="2"/><rect x="48" y="74" width="100" height="8" rx="2"/><rect x="68" y="96" width="160" height="8" rx="2" fill="#7aa2ff40"/><rect x="48" y="118" width="90" height="8" rx="2"/><rect x="28" y="140" width="40" height="8" rx="2" fill="#7aa2ff80"/></g>',
    Array.from({ length: 9 }, (_, i) => `<rect x="${34 + i * 28}" y="${150 - (20 + ((i * 37) % 90))}" width="16" height="${20 + ((i * 37) % 90)}" rx="3" fill="${i === 5 ? '#7aa2ff' : '#ffffff26'}"/>`).join('')
  ];
  const preview = (p, i, lazy = true) => p.image
    ? `<div class="pv">${p.placeholder ? '<span class="tag">Placeholder</span>' : ''}<img src="${esc(p.image)}" alt="${esc(p.title)} preview" ${lazy ? 'loading="lazy"' : ''} width="640" height="400"></div>`
    : `<div class="pv" role="img" aria-label="${esc(p.title)} preview placeholder">${p.placeholder ? '<span class="tag">Placeholder</span>' : ''}<svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${art[i % art.length]}</svg></div>`;
  const btn = (href, label, cls = '') => href
    ? `<a class="btn ${cls} sm" href="${esc(href)}" target="_blank" rel="noopener" data-mag>${label}</a>`
    : `<a class="btn ghost sm" aria-disabled="true" title="Add this link in js/projects.js">${label} · add link</a>`;

  /* Featured */
  const fe = $('#feature');
  fe.innerHTML = `${preview(featured, 0, false)}<div><p class="f-kicker">Featured project</p><h3 id="f-title">${esc(featured.title)}</h3><p>${esc(featured.description)}</p>
  <ul class="tech">${featured.technologies.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
  <ul class="feats">${featured.features.map(f => `<li>${esc(f)}</li>`).join('')}</ul>
  <div class="cta">${featured.live ? btn(featured.live, 'View Project', 'primary') : '<a class="btn primary sm" aria-disabled="true">View Project · add link</a>'}${featured.github ? btn(featured.github, 'GitHub') : ''}</div></div>`;
  if (window.initParallax) window.initParallax(fe);

  /* Grid + filtering */
  const grid = $('#grid'), fbox = $('#filters'), count = $('#count');
  let active = 'All';
  const render = () => {
    const list = projects.filter(p => active === 'All' || p.category === active);
    grid.innerHTML = list.map((p, i) => `<article class="card" style="--i:${i}">${preview(p, i + 1)}
      <p class="meta">${esc(CATEGORY_LABEL[p.category] || p.category)}</p><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p>
      <ul class="tech">${p.technologies.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
      <div class="cta">${btn(p.github, 'GitHub')}${p.live ? btn(p.live, 'Live Demo', 'primary') : ''}</div></article>`).join('')
      || '<p class="count">No projects in this category yet. Add one in js/projects.js.</p>';
    count.textContent = `Showing ${list.length} of ${projects.length} projects`;
    grid.classList.remove('out');
  };
  fbox.innerHTML = FILTERS.map(f => `<button type="button" aria-pressed="${f === active}" data-f="${esc(f)}" data-mag>${esc(f)}</button>`).join('');
  fbox.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b || b.dataset.f === active) return;
    active = b.dataset.f; fbox.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b));
    if (reduce) return render();
    grid.classList.add('out'); setTimeout(render, 200);
  });
  render();

  /* GitHub (optional, fails gracefully, never fabricates) */
  const repos = $('#repos'), note = $('#gh-note'), has = GITHUB_USERNAME && !GITHUB_USERNAME.startsWith('YOUR_');
  const placeholders = () => { repos.innerHTML = [1, 2, 3].map(n => `<div class="repo ph"><h3>repository-${n}</h3><p>Placeholder. Real repositories load here after you set GITHUB_USERNAME in js/main.js.</p><small>Technologies appear here</small></div>`).join(''); };
  if (EMAIL && !EMAIL.startsWith('YOUR_')) document.querySelectorAll('a[href^="mailto:"]').forEach(a => a.href = 'mailto:' + EMAIL);
  if (!has) placeholders();
  else {
    document.querySelectorAll('a[href*="YOUR_GITHUB_USERNAME"]').forEach(a => a.href = a.href.replace('YOUR_GITHUB_USERNAME', GITHUB_USERNAME));
    fetch(`https://api.github.com/users/${encodeURIComponent(GITHUB_USERNAME)}/repos?sort=pushed&per_page=6`).then(r => { if (!r.ok) throw 0; return r.json(); }).then(d => {
      const own = d.filter(r => !r.fork).slice(0, 6); if (!own.length) throw 0;
      note.textContent = 'Latest public repositories from GitHub.';
      repos.innerHTML = own.map(r => `<a class="repo" href="${esc(r.html_url)}" target="_blank" rel="noopener"><h3>${esc(r.name)}</h3><p>${esc(r.description || 'No description yet.')}</p><small>${esc(r.language || '')}${r.language ? ' · ' : ''}★ ${r.stargazers_count}</small></a>`).join('');
      const g = $('#graph'), img = $('#graph-img'); img.onerror = () => g.hidden = true; img.src = `https://ghchart.rshah.org/7aa2ff/${encodeURIComponent(GITHUB_USERNAME)}`; g.hidden = false;
    }).catch(() => { note.textContent = 'GitHub repositories could not be loaded right now. Visit the profile directly.'; placeholders(); });
  }
  $('#year').textContent = new Date().getFullYear();
})();
