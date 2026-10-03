/* Reveal, custom cursor, magnetic buttons, featured parallax */
(function () {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const els = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); }
  else {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15, rootMargin: '0px 0px -6% 0px' });
    els.forEach((e, i) => { e.style.setProperty('--d', (i % 3) * 70 + 'ms'); io.observe(e); });
  }

  window.initParallax = function () {};
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const capable = (navigator.hardwareConcurrency || 4) >= 4;
  if (!fine || reduce) return;

  const bg = document.querySelector('.bg');
  let lx = 0, ly = 0, bgRaf = 0;
  addEventListener('pointermove', e => {
    lx = e.clientX; ly = e.clientY;
    if (!bgRaf) bgRaf = requestAnimationFrame(() => { bg.style.setProperty('--mx', lx + 'px'); bg.style.setProperty('--my', ly + 'px'); bgRaf = 0; });
  }, { passive: true });

  window.initParallax = function (box) {
    const pv = box.querySelector('.pv');
    if (!pv) return;
    box.addEventListener('pointermove', e => {
      const r = box.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
      pv.style.transform = `perspective(900px) rotateY(${px * 4}deg) rotateX(${-py * 4}deg) translate(${px * 6}px,${py * 6}px)`;
    });
    box.addEventListener('pointerleave', () => pv.style.transform = '');
  };

  if (!capable) return;
  document.documentElement.classList.add('has-cursor');
  const dot = document.querySelector('.cursor-dot'), ring = document.querySelector('.cursor-ring');
  let x = 0, y = 0, rx = 0, ry = 0, run = false;
  const loop = () => {
    rx += (x - rx) * .2; ry += (y - ry) * .2;
    ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    if (Math.abs(x - rx) + Math.abs(y - ry) > .4) requestAnimationFrame(loop); else run = false;
  };
  const mags = () => document.querySelectorAll('[data-mag]');
  addEventListener('pointermove', e => {
    x = e.clientX; y = e.clientY;
    dot.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`;
    if (!run) { run = true; requestAnimationFrame(loop); }
    mags().forEach(el => {
      const r = el.getBoundingClientRect(), dx = x - (r.left + r.width / 2), dy = y - (r.top + r.height / 2);
      if (Math.hypot(dx, dy) < Math.max(r.width, 90) * .7) el.style.transform = `translate(${dx * .2}px,${dy * .28}px)`;
      else if (el.style.transform) el.style.transform = '';
    });
  }, { passive: true });
  document.addEventListener('pointerover', e => ring.classList.toggle('big', !!e.target.closest('a,button,[tabindex="0"]')));
  document.documentElement.addEventListener('pointerleave', () => ring.classList.add('hide'));
  document.documentElement.addEventListener('pointerenter', () => ring.classList.remove('hide'));
})();
