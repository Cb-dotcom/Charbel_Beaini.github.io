/* Charbel Beaini — Portfolio interactions (no dependencies) */
(function () {
  'use strict';
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme toggle ---------- */
  var themeBtn = document.querySelector('[data-theme-toggle]');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ---------- Nav: over-hero state, scrolled shadow, mobile menu ---------- */
  var nav = document.getElementById('gnav');
  var hero = document.querySelector('.hero');
  var menuBtn = document.querySelector('.gnav-menu-btn');

  function onScroll() {
    var y = window.scrollY;
    var heroEnd = hero ? hero.offsetHeight - nav.offsetHeight : 0;
    nav.classList.toggle('is-over-hero', y < heroEnd);
    nav.classList.toggle('is-scrolled', y > 4);
    heroParallax();
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', open);
      document.body.classList.toggle('nav-open', open);
    });
    document.querySelectorAll('.gnav-links a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      });
    });
  }

  /* ---------- Hero media: grows to full width as you scroll ---------- */
  var media = document.getElementById('hero-media');
  function heroParallax() {
    if (!media || reduce) return;
    var r = media.getBoundingClientRect();
    var vh = window.innerHeight;
    // 0 when the media's top sits at the bottom 85% of the viewport, 1 when it reaches the nav
    var start = vh * 0.85, end = nav.offsetHeight;
    var p = Math.min(1, Math.max(0, (start - r.top) / (start - end)));
    media.style.setProperty('--p', p.toFixed(3));
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---------- Active section in nav ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.gnav-links a[href^="#"]'));
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (l) { l.classList.toggle('is-active', l.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (l) {
      var s = document.querySelector(l.getAttribute('href'));
      if (s) spy.observe(s);
    });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Carousels ---------- */
  document.querySelectorAll('[data-carousel]').forEach(function (c) {
    var track = c.querySelector('.carousel-track');
    var prev = c.querySelector('[data-dir="-1"]');
    var next = c.querySelector('[data-dir="1"]');
    function update() {
      var max = track.scrollWidth - track.clientWidth - 2;
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= max;
    }
    function step(dir) {
      var card = track.querySelector('.news-card, .tool-card');
      var w = card ? card.getBoundingClientRect().width + 20 : track.clientWidth * 0.8;
      track.scrollBy({ left: dir * w, behavior: reduce ? 'auto' : 'smooth' });
    }
    if (prev) prev.addEventListener('click', function () { step(-1); });
    if (next) next.addEventListener('click', function () { step(1); });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });

  /* ---------- Year pills on the timeline ---------- */
  var newsTrack = document.querySelector('.news-track');
  var pills = document.querySelectorAll('[data-jump-year]');
  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      var marker = newsTrack.querySelector('[data-year-marker="' + pill.dataset.jumpYear + '"]');
      if (!marker) return;
      var pad = parseFloat(getComputedStyle(newsTrack).paddingLeft) || 0;
      newsTrack.scrollTo({ left: marker.offsetLeft - pad, behavior: reduce ? 'auto' : 'smooth' });
    });
  });
  if (newsTrack) {
    newsTrack.addEventListener('scroll', function () {
      var pad = parseFloat(getComputedStyle(newsTrack).paddingLeft) || 0;
      var x = newsTrack.scrollLeft + pad + 40, current = null;
      newsTrack.querySelectorAll('[data-year-marker]').forEach(function (m) {
        if (m.offsetLeft <= x) current = m.dataset.yearMarker;
      });
      if (!current) return;
      pills.forEach(function (p) { p.setAttribute('aria-pressed', p.dataset.jumpYear === current); });
    }, { passive: true });
  }

  /* ---------- Detail sheet ---------- */
  var sheet = document.getElementById('sheet');
  if (sheet && typeof sheet.showModal === 'function') {
    var content = sheet.querySelector('.sheet-content');
    document.querySelectorAll('[data-sheet]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var tpl = document.getElementById(btn.dataset.sheet);
        if (!tpl) return;
        content.innerHTML = '';
        content.appendChild(tpl.content.cloneNode(true));
        sheet.showModal();
      });
    });
    sheet.querySelector('[data-close]').addEventListener('click', function () { sheet.close(); });
    sheet.addEventListener('click', function (e) { if (e.target === sheet) sheet.close(); });
  }

  /* ---------- Project filters ---------- */
  var filters = document.querySelectorAll('[data-filter]');
  filters.forEach(function (f) {
    f.addEventListener('click', function () {
      var k = f.dataset.filter;
      filters.forEach(function (o) { o.setAttribute('aria-pressed', o === f); });
      document.querySelectorAll('.pub-group').forEach(function (g) {
        var any = false;
        g.querySelectorAll('.pub-item').forEach(function (it) {
          var show = k === 'all' || it.dataset.kind === k;
          it.hidden = !show;
          if (show) any = true;
        });
        g.hidden = !any;
      });
    });
  });

  /* ---------- Footer year ---------- */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();
