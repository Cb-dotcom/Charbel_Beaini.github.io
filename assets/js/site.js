/* Charbel Beaini — Portfolio v3 interactions (no dependencies) */
(function () {
  'use strict';
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var SVGNS = 'http://www.w3.org/2000/svg';

  /* ---------- nav ---------- */
  var nav = document.getElementById('gnav');
  var menuBtn = document.querySelector('.gnav-menu-btn');
  var sections = Array.prototype.slice.call(document.querySelectorAll('main > section'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.gnav-links a'));
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', open);
      document.body.classList.toggle('nav-open', open);
    });
    navLinks.forEach(function (a) { a.addEventListener('click', function () { nav.classList.remove('is-open'); menuBtn.setAttribute('aria-expanded', 'false'); document.body.classList.remove('nav-open'); }); });
  }

  /* ---------- hero: split headline into words, maneuver clips ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-split]'), function (h) {
    var words = h.textContent.trim().split(/\s+/);
    h.setAttribute('aria-label', h.textContent.trim());
    h.innerHTML = words.map(function (w, i) { return '<span class="w" aria-hidden="true" style="--wi:' + i + '">' + w + '</span>'; }).join(' ');
  });
  var clips = Array.prototype.slice.call(document.querySelectorAll('.mv video'));
  if (reduce) clips.forEach(function (v) { v.removeAttribute('autoplay'); v.pause(); });
  else if ('IntersectionObserver' in window) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { var pr = e.target.play(); if (pr && pr.catch) pr.catch(function () {}); }
        else e.target.pause();
      });
    }, { threshold: 0.15 });
    clips.forEach(function (v) { vio.observe(v); });
  }
  var ticking = false;
  function frame() {
    ticking = false;
    var probe = nav.offsetHeight + 1, current = null;
    for (var i = 0; i < sections.length; i++) {
      var r = sections[i].getBoundingClientRect();
      if (r.top <= probe && r.bottom > probe) { current = sections[i]; break; }
    }
    var hero = document.getElementById('top');
    nav.classList.toggle('is-over-hero', !!hero && hero.getBoundingClientRect().bottom > nav.offsetHeight);
    nav.classList.toggle('is-scrolled', window.scrollY > 4);
    // active link: walk up to the nearest section that has a nav entry
    var id = null, mid = window.innerHeight * 0.45;
    sections.forEach(function (s) { var r = s.getBoundingClientRect(); if (r.top <= mid && s.id && document.querySelector('.gnav-links a[href="#' + s.id + '"]')) id = s.id; });
    if (current && (current.id === 'qlaun' || current.id === 'wirely' || current.id === 'grid')) id = 'projects';
    navLinks.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + id); });

  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  frame();

  /* ---------- Hello in the 10 most spoken languages ---------- */
  // Ethnologue 2026 top 20 by total speakers (dialects such as Egyptian Arabic left out)
  var HELLO = [
    { t: 'Hello, I’m Charbel.', n: 'English', l: 'en' },
    { t: '你好，我是夏贝尔。', n: 'Mandarin Chinese', l: 'zh' },
    { t: 'नमस्ते, मैं शारबेल हूँ।', n: 'Hindi', l: 'hi' },
    { t: 'Hola, soy Charbel.', n: 'Spanish', l: 'es' },
    { t: 'مرحباً، أنا شربل.', n: 'Arabic', l: 'ar', rtl: true },
    { t: 'Bonjour, je suis Charbel.', n: 'French', l: 'fr' },
    { t: 'নমস্কার, আমি শারবেল।', n: 'Bengali', l: 'bn' },
    { t: 'Olá, eu sou o Charbel.', n: 'Portuguese', l: 'pt' },
    { t: 'Halo, saya Charbel.', n: 'Indonesian', l: 'id' },
    { t: 'السلام علیکم، میں شربل ہوں۔', n: 'Urdu', l: 'ur', rtl: true },
    { t: 'Привет, я Шарбель.', n: 'Russian', l: 'ru' },
    { t: 'Hallo, ich bin Charbel.', n: 'German', l: 'de' },
    { t: 'こんにちは、シャーベルです。', n: 'Japanese', l: 'ja' },
    { t: 'How far, I be Charbel.', n: 'Nigerian Pidgin', l: 'pcm' },
    { t: 'नमस्कार, मी शारबेल आहे.', n: 'Marathi', l: 'mr' },
    { t: 'Xin chào, tôi là Charbel.', n: 'Vietnamese', l: 'vi' },
    { t: 'నమస్కారం, నేను శార్బెల్.', n: 'Telugu', l: 'te' },
    { t: 'Habari, mimi ni Charbel.', n: 'Swahili', l: 'sw' },
    { t: 'Sannu, ni ne Charbel.', n: 'Hausa', l: 'ha' },
    { t: 'Merhaba, ben Charbel.', n: 'Turkish', l: 'tr' }
  ];
  var helloBox = document.querySelector('.hello-box');
  if (helloBox) {
    var helloText = helloBox.querySelector('.hello-text');
    var helloName = document.querySelector('.hello-name');
    var hi = 0, hTimer = null, hVisible = false;
    function fit() {
      helloText.style.setProperty('--fit', 1);
      var avail = helloBox.clientWidth, need = helloText.scrollWidth;
      helloText.style.setProperty('--fit', need > avail ? (avail / need).toFixed(3) : 1);
    }
    function paint(k, animate) {
      var d = HELLO[k];
      helloText.setAttribute('lang', d.l);
      if (d.rtl) helloText.setAttribute('dir', 'rtl'); else helloText.removeAttribute('dir');
      helloText.innerHTML = d.t.split(' ').map(function (w, i) { return '<span class="w" style="--wi:' + i + '">' + w + '</span>'; }).join(' ');
      helloText.classList.remove('is-out');
      if (animate) { helloText.classList.remove('is-in'); void helloText.offsetWidth; helloText.classList.add('is-in'); }
      fit();
      helloName.textContent = d.n; helloName.classList.remove('is-swap');
    }
    function next() {
      helloText.classList.remove('is-in'); helloText.classList.add('is-out'); helloName.classList.add('is-swap');
      setTimeout(function () { hi = (hi + 1) % HELLO.length; paint(hi, true); }, 480);
    }
    function start() { if (!hTimer && !reduce) hTimer = setInterval(next, 2800); }
    function stop() { clearInterval(hTimer); hTimer = null; }
    paint(0, false);
    window.addEventListener('resize', fit);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) { hVisible = e[0].isIntersecting; if (hVisible) start(); else stop(); }, { threshold: 0.3 }).observe(helloBox);
    } else start();
    document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else if (hVisible) start(); });
  }

  /* ---------- Now: expandable rows ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('.acc-btn'), function (btn) {
    btn.addEventListener('click', function () {
      var row = btn.closest('.acc-row'), open = !row.classList.contains('is-open');
      row.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  /* ---------- reveal ---------- */
  var reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    reveals.forEach(function (el) { io.observe(el); });
  } else reveals.forEach(function (el) { el.classList.add('is-in'); });

  /* ---------- highlights: split cards, carousel, detail view ---------- */
  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function mediaHTML(m, extraAttrs) {
    if (m.type === 'video') {
      return '<video muted loop playsinline autoplay preload="metadata" poster="' + m.poster + '" aria-label="' + esc(m.alt) + '"' + (extraAttrs || '') + '>' +
        '<source src="' + m.src + '.mp4" type="video/mp4; codecs=avc1.64001F"><source src="' + m.src + '.webm" type="video/webm"></video>';
    }
    return '<img src="' + m.src + '" alt="' + esc(m.alt) + '" loading="lazy" decoding="async"' + (m.position ? ' style="object-position:' + m.position + '"' : '') + (extraAttrs || '') + '>';
  }
  function linksHTML(links) {
    return (links || []).map(function (l) {
      if (l.soon) return '<span class="chip is-soon" title="Coming soon"><i class="' + l.icon + '" aria-hidden="true"></i>' + esc(l.label) + '<em>Coming soon</em></span>';
      return '<a class="chip" href="' + l.href + '" target="_blank" rel="noopener"><i class="' + l.icon + '" aria-hidden="true"></i>' + esc(l.label) + '</a>';
    }).join('');
  }

  var KINDS = {
    publication: { label: 'Publication', icon: 'fa-solid fa-book-open' },
    research: { label: 'Research', icon: 'fa-solid fa-flask' },
    project: { label: 'Project', icon: 'fa-solid fa-gear' },
    fun: { label: 'Fun', icon: 'fa-solid fa-wand-magic-sparkles' },
    heart: { label: 'From the heart', icon: 'fa-solid fa-heart' }
  };
  function kindHTML(k) {
    var d = KINDS[k]; if (!d) return '';
    return '<span class="kind kind--' + k + '"><i class="' + d.icon + '" aria-hidden="true"></i>' + d.label + '</span>';
  }
  function authorsHTML(list) {
    return (list || []).map(function (a) { return a.me ? '<span class="me">' + esc(a.name) + '</span>' : esc(a.name); }).join(', ');
  }

  var hl = document.querySelector('[data-hl]');
  var PROJ = window.PROJECTS || [];
  var hlApi = null;
  if (hl && PROJ.length) {
    var track = hl.querySelector('.hl-track');
    track.innerHTML = PROJ.map(function (p, i) {
      if (p.soon) {
        return '<article class="hc hc--soon" role="listitem" data-id="' + p.id + '" aria-label="' + esc(p.title) + ', coming soon">' +
          '<div class="hc-media">' + mediaHTML(p.media) + '<span class="hc-scan" aria-hidden="true"></span>' +
          '<span class="hc-live"><i></i>In progress</span>' + (p.media.credit ? '<span class="hc-credit">' + esc(p.media.credit) + '</span>' : '') + '</div>' +
          '<div class="hc-body"><span class="hc-eyebrow">' + esc(p.eyebrow) + '</span><h3 class="hc-title">' + esc(p.title) + '</h3>' +
          '<p class="hc-short">' + esc(p.short) + '</p><div class="hc-links">' + linksHTML(p.links) + '</div>' +
          '<div class="hc-soon"><span class="soon-text">Coming soon</span><span class="soon-bar" aria-hidden="true"><i></i></span></div></div></article>';
      }
      return '<article class="hc" role="listitem" tabindex="0" data-id="' + p.id + '" aria-label="' + esc(p.title) + ', open details">' +
        '<div class="hc-media' + (p.media.fit === 'contain' ? ' contain' : '') + '">' + mediaHTML(p.media).replace('loading="lazy"', 'loading="eager"') + kindHTML(p.kind) + (p.media.credit ? '<span class="hc-credit">' + esc(p.media.credit) + '</span>' : '') + '</div>' +
        '<div class="hc-body"><span class="hc-eyebrow">' + esc(p.eyebrow) + '</span><h3 class="hc-title">' + esc(p.title) + '</h3>' +
        (p.authors ? '<p class="hc-authors">' + authorsHTML(p.authors) + '</p>' : '') +
        '<p class="hc-short">' + esc(p.short) + '</p><div class="hc-links">' + linksHTML(p.links) + '</div>' +
        '<span class="hc-open" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M8 3v10M3 8h10"/></svg></span></div></article>';
    }).join('');
    var cards = Array.prototype.slice.call(track.children);
    var dotsBox = hl.querySelector('.hl-dots');
    var playBtn = hl.querySelector('.hl-play');
    var idx = 0, playing = !reduce, visible = false, held = false, t0 = performance.now(), DURATION = 6000;
    var dots = cards.map(function (c, i) {
      var d = document.createElement('button');
      d.className = 'hl-dot'; d.type = 'button'; d.setAttribute('role', 'tab');
      d.setAttribute('aria-label', PROJ[i].title);
      d.addEventListener('click', function () { go(i); });   // keeps autoplay running, restarts the timer
      dotsBox.appendChild(d); return d;
    });
    function setCurrent(i) {
      idx = i;
      dots.forEach(function (d, j) { d.setAttribute('aria-current', j === i ? 'true' : 'false'); if (j !== i) d.style.removeProperty('--prog'); });
    }
    function go(i) {
      i = (i + cards.length) % cards.length;
      var left = cards[i].offsetLeft - cards[0].offsetLeft;
      track.scrollTo({ left: left, behavior: reduce ? 'auto' : 'smooth' });
      setCurrent(i); t0 = performance.now();
      dots[i].style.setProperty('--prog', 0);
    }
    function setPlaying(v) {
      playing = v; t0 = performance.now();
      playBtn.setAttribute('aria-pressed', v ? 'true' : 'false');
      playBtn.setAttribute('aria-label', v ? 'Pause autoplay' : 'Play autoplay');
      if (!v) dots[idx].style.setProperty('--prog', 0);
    }
    playBtn.addEventListener('click', function () { setPlaying(!playing); });
    if (reduce) setPlaying(false);
    // current card follows what is actually on screen (swipes, trackpads)
    var settle;
    track.addEventListener('scroll', function () {
      clearTimeout(settle);
      settle = setTimeout(function () {
        var x = track.scrollLeft, best = 0, bd = Infinity;
        cards.forEach(function (c, i) { var d = Math.abs(c.offsetLeft - cards[0].offsetLeft - x); if (d < bd) { bd = d; best = i; } });
        if (best !== idx) { setCurrent(best); t0 = performance.now(); }
      }, 140);
    }, { passive: true });
    // a manual swipe pauses, like Apple
    ['wheel', 'touchstart'].forEach(function (ev) {
      track.addEventListener(ev, function (e) { if (ev === 'wheel' && Math.abs(e.deltaX) < Math.abs(e.deltaY)) return; if (playing) setPlaying(false); }, { passive: true });
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) { visible = e[0].isIntersecting; t0 = performance.now() - (parseFloat(dots[idx].style.getPropertyValue('--prog')) || 0) * DURATION; }, { threshold: 0.4 }).observe(track);
    } else visible = true;
    (function loop(now) {
      if (playing && visible && !held) {
        var p = (now - t0) / DURATION;
        if (p >= 1) go(idx + 1);
        else dots[idx].style.setProperty('--prog', p.toFixed(4));
      } else if (held || !visible) { t0 = now - (parseFloat(dots[idx].style.getPropertyValue('--prog')) || 0) * DURATION; }
      requestAnimationFrame(loop);
    })(performance.now());
    setCurrent(0);

    cards.forEach(function (c) {
      if (c.classList.contains('hc--soon')) return;
      c.addEventListener('click', function (e) { if (e.target.closest('a')) return; openDetail(c.getAttribute('data-id'), c); });
      c.addEventListener('keydown', function (e) { if ((e.key === 'Enter' || e.key === ' ') && e.target === c) { e.preventDefault(); openDetail(c.getAttribute('data-id'), c); } });
    });
    hlApi = { hold: function (v) { held = v; } };
  }

  /* ---------- In progress: one card that rotates between items (Bio) ---------- */
  var np = document.querySelector('[data-np]');
  var NOW = window.NOW || [];
  if (np && NOW.length) {
    var stage = np.querySelector('.np-stage');
    stage.innerHTML = NOW.map(function (d, i) {
      var media = d.media
        ? mediaHTML(d.media) + (d.media.credit ? '<span class="hc-credit">' + esc(d.media.credit) + '</span>' : '')
        : '<div class="np-panel"><span class="big">' + esc(d.panel.big) + '</span><span class="small">' + esc(d.panel.small) + '</span></div>';
      return '<article class="np-card' + (i === 0 ? ' on' : '') + (d.soon ? ' is-soon' : '') + '" aria-hidden="' + (i === 0 ? 'false' : 'true') + '">' +
        '<div class="np-media">' + media + (d.soon ? '<span class="hc-scan" aria-hidden="true"></span>' : '') + '</div>' +
        '<div class="np-body"><div class="nc-top"><span class="nc-status' + (d.status === 'Now' ? '' : ' nc-status--next') + '">' + (d.status === 'Now' ? '<i></i>' : '') + esc(d.status) + '</span>' +
        '<a class="nc-org" href="' + d.orgHref + '" target="_blank" rel="noopener">' + esc(d.org) + '</a></div>' +
        '<h3 class="nc-title">' + esc(d.title) + '</h3><p class="nc-text">' + esc(d.text) + '</p>' +
        ((d.links && d.links.length) ? '<div class="hc-links">' + linksHTML(d.links) + '</div>' : '') +
        (d.soon ? '<div class="hc-soon np-soon"><span class="soon-text">' + esc(d.soon) + '</span><span class="soon-bar" aria-hidden="true"><i></i></span></div>' : '') +
        '</div></article>';
    }).join('');
    var npCards = Array.prototype.slice.call(stage.children);
    var npDots = np.querySelector('.np-dots'), npPlay = np.querySelector('.np-play');
    var nk = 0, nPlaying = !reduce, nVisible = false, nT0 = performance.now(), N_DUR = 7000;
    var nd = NOW.map(function (d, i) {
      var b = document.createElement('button'); b.className = 'hl-dot'; b.type = 'button'; b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', d.title); b.addEventListener('click', function () { nShow(i); }); npDots.appendChild(b); return b;
    });
    function nShow(i) {
      nk = (i + npCards.length) % npCards.length; nT0 = performance.now();
      npCards.forEach(function (c, j) { c.classList.toggle('on', j === nk); c.setAttribute('aria-hidden', j === nk ? 'false' : 'true'); });
      nd.forEach(function (b, j) { b.setAttribute('aria-current', j === nk ? 'true' : 'false'); b.style.setProperty('--prog', 0); });
    }
    function nSetPlaying(v) {
      nPlaying = v; nT0 = performance.now() - (parseFloat(nd[nk].style.getPropertyValue('--prog')) || 0) * N_DUR;
      npPlay.setAttribute('aria-pressed', v ? 'true' : 'false'); npPlay.setAttribute('aria-label', v ? 'Pause autoplay' : 'Play autoplay');
    }
    npPlay.addEventListener('click', function () { nSetPlaying(!nPlaying); });
    if (reduce) nSetPlaying(false);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { nVisible = e[0].isIntersecting; }, { threshold: 0.3 }).observe(np); else nVisible = true;
    (function nLoop(now) {
      if (nPlaying && nVisible) { var pr = (now - nT0) / N_DUR; if (pr >= 1) nShow(nk + 1); else nd[nk].style.setProperty('--prog', pr.toFixed(4)); }
      else nT0 = now - (parseFloat(nd[nk].style.getPropertyValue('--prog')) || 0) * N_DUR;
      requestAnimationFrame(nLoop);
    })(performance.now());
    nShow(0);
  }

  /* detail view: opens like a publication page, the card image morphs into place */
  var dlg = document.getElementById('detail');
  var dtContent = dlg ? dlg.querySelector('.dt-content') : null;
  var openCard = null;
  function detailHTML(p) {
    var d = p.detail || {};
    var heroM = d.media || p.media;
    var hero;
    if (d.hero && d.hero.slides) {
      hero = '<figure class="dt-hero dt-slides" data-interval="' + (d.hero.interval || 7000) + '"><div class="dt-stage">' +
        d.hero.slides.map(function (sl, i) { return '<img class="' + (i === 0 ? 'on' : '') + '" src="' + sl.src + '" alt="' + esc(sl.caption) + '" decoding="async">'; }).join('') +
        '</div><figcaption>' + d.hero.slides.map(function (sl, i) { return '<span class="' + (i === 0 ? 'on' : '') + '">' + esc(sl.caption) + '</span>'; }).join('') + '</figcaption></figure>';
    } else {
      hero = '<figure class="dt-hero' + (heroM.fit === 'contain' ? ' contain' : '') + '">' + mediaHTML(heroM) + '</figure>';
    }
    var gallery = (d.gallery || []).map(function (g) {
      var inner = g.video
        ? '<video muted loop playsinline autoplay preload="metadata" poster="' + g.poster + '"><source src="' + g.video + '.mp4" type="video/mp4; codecs=avc1.64001F"><source src="' + g.video + '.webm" type="video/webm"></video>'
        : '<img src="' + g.src + '" alt="' + esc(g.caption) + '" loading="lazy" decoding="async">';
      return '<figure><div class="fig' + (g.video ? ' dark' : '') + (g.cover ? ' cover' : '') + '">' + inner + (g.credit ? '<span class="hc-credit">' + esc(g.credit) + '</span>' : '') + '</div><figcaption>' + (g.label ? '<span class="dt-side-label">' + esc(g.label) + '</span>' : '') + esc(g.caption) + '</figcaption></figure>';
    }).join('');
    return '<header class="dt-head">' + (p.kind ? '<div class="dt-kind">' + kindHTML(p.kind) + '</div>' : '') + '<p class="dt-eyebrow">' + esc(d.eyebrow || p.eyebrow) + '</p>' +
      '<h2 class="dt-title" id="dt-title">' + esc(d.title || p.title) + '</h2>' +
      (p.authors ? '<p class="dt-authors">' + authorsHTML(p.authors) + '</p>' : '') +
      (d.meta ? '<p class="dt-meta">' + esc(d.meta) + '</p>' : '') +
      '<div class="dt-links">' + linksHTML(p.links) + '</div></header>' + hero +
      '<section class="dt-body"><h3>' + esc(d.heading || 'Overview') + '</h3>' + (d.text || []).map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') +
      ((d.points && d.points.length) ? '<ul class="dt-points">' + d.points.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' : '') + '</section>' +
      ((d.figures && d.figures.length) ? d.figures.map(function (f) { return '<figure class="dt-figure"><div class="fig"><img src="' + f.src + '" alt="' + esc(f.caption) + '" loading="lazy" decoding="async"></div><figcaption>' + esc(f.caption) + '</figcaption></figure>'; }).join('') : '') +
      (gallery ? '<div class="dt-gallery">' + gallery + '</div>' : '') +
      ((d.watch && d.watch.length) ? '<section class="dt-watch"><h3>Watch the tricks</h3><ul>' + d.watch.map(function (w) { return '<li><a href="' + w.href + '" target="_blank" rel="noopener"><i class="fa-brands fa-youtube" aria-hidden="true"></i><span>' + esc(w.label) + '</span></a></li>'; }).join('') + '</ul></section>' : '') +
      ((d.sections && d.sections.length) ? '<div class="dt-sections">' + d.sections.map(function (x) { return '<article class="dt-sec"><span class="dt-side-label">' + esc(x.label) + '</span><h3>' + esc(x.title) + '</h3><p>' + esc(x.text) + '</p>' + (x.note ? '<p class="dt-sec-note">' + esc(x.note) + '</p>' : '') + (x.img ? '<figure class="dt-sec-fig"><img src="' + x.img + '" alt="" loading="lazy">' + (x.credit ? '<span class="hc-credit">' + esc(x.credit) + '</span>' : '') + '</figure>' : '') + (x.link ? '<a class="more" href="' + x.link.href + '" target="_blank" rel="noopener"><span>' + esc(x.link.label) + '</span></a>' : '') + '</article>'; }).join('') + '</div>' : '') +
      (d.side ? '<aside class="dt-side"><span class="dt-side-label">' + esc(d.side.label || 'Side note') + '</span><h3>' + esc(d.side.title) + '</h3><p>' + esc(d.side.text) + '</p>' +
        (d.side.img ? '<img src="' + d.side.img + '" alt="" loading="lazy">' : '') + '</aside>' : '') +
      ((d.info && d.info.length) ? '<div class="dt-info">' + d.info.map(function (x) { return '<div><span class="k">' + esc(x.k) + '</span><span class="v">' + esc(x.v) + '</span></div>'; }).join('') + '</div>' : '');
  }
  function vt(fn) {
    if (document.startViewTransition && !reduce) { var t = document.startViewTransition(fn); t.ready.catch(function () {}); t.finished.catch(function () {}); return t; }
    fn(); return null;
  }
  var closing = false, slideTimer = null;
  function stopSlides() { clearInterval(slideTimer); slideTimer = null; }
  function startSlides() {
    stopSlides();
    var f = dtContent.querySelector('.dt-slides'); if (!f || reduce) return;
    var imgs = f.querySelectorAll('.dt-stage img'), caps = f.querySelectorAll('figcaption span'), k = 0;
    if (imgs.length < 2) return;
    slideTimer = setInterval(function () {
      imgs[k].classList.remove('on'); caps[k].classList.remove('on');
      k = (k + 1) % imgs.length;
      imgs[k].classList.add('on'); caps[k].classList.add('on');
    }, parseInt(f.getAttribute('data-interval'), 10) || 7000);
  }
  function openDetail(id, card, fromHistory) {
    if (!dlg) return;
    var p = PROJ.filter(function (x) { return x.id === id; })[0]; if (!p) return;
    openCard = card || document.querySelector('.hc[data-id="' + id + '"]');
    var cm = openCard && openCard.querySelector('.hc-media');
    if (cm) cm.style.viewTransitionName = 'hl-hero';
    var t = vt(function () {
      if (cm) cm.style.viewTransitionName = '';
      dtContent.innerHTML = detailHTML(p);
      startSlides();
      dlg.querySelector('.dt-hero').style.viewTransitionName = 'hl-hero';
      if (!dlg.open) dlg.showModal();
      dlg.scrollTop = 0;
      document.body.classList.add('dt-open');
    });
    var clear = function () { var h = dlg.querySelector('.dt-hero'); if (h) h.style.viewTransitionName = ''; };
    if (t && t.finished) t.finished.then(clear, clear); else clear();
    if (hlApi) hlApi.hold(true);
    if (!fromHistory) history.pushState({ detail: id }, '', '#' + id);
  }
  function closeDetail(fromHistory) {
    if (!dlg || !dlg.open || closing) return;
    closing = true;
    var h = dlg.querySelector('.dt-hero');
    var cm = openCard && openCard.querySelector('.hc-media');
    var instant = dlg.scrollTop > 200;   // hero scrolled away: just fade
    if (h && !instant) h.style.viewTransitionName = 'hl-hero';
    var t = vt(function () {
      if (h) h.style.viewTransitionName = '';
      dlg.close(); document.body.classList.remove('dt-open'); closing = false;
      if (cm && !instant) cm.style.viewTransitionName = 'hl-hero';
    });
    stopSlides();
    var clear = function () { if (cm) cm.style.viewTransitionName = ''; dtContent.innerHTML = ''; };
    if (t && t.finished) t.finished.then(clear, clear); else clear();
    if (hlApi) hlApi.hold(false);
    if (!fromHistory && history.state && history.state.detail) history.back();
  }
  if (dlg) {
    Array.prototype.forEach.call(dlg.querySelectorAll('[data-close]'), function (b) { b.addEventListener('click', function () { closeDetail(); }); });
    dlg.addEventListener('cancel', function (e) { e.preventDefault(); closeDetail(); });
    window.addEventListener('popstate', function (e) {
      if (closing) return;
      if (e.state && e.state.detail) openDetail(e.state.detail, null, true); else closeDetail(true);
    });
    // links like href="#qlaun" open that project's detail view
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]'); if (!a) return;
      var id = a.getAttribute('href').slice(1);
      if (PROJ.some(function (x) { return x.id === id; })) { e.preventDefault(); openDetail(id); }
    });
    var initial = location.hash.slice(1);
    if (initial && PROJ.some(function (x) { return x.id === initial; })) {
      history.replaceState({ detail: initial }, '', '#' + initial);
      openDetail(initial, null, true);
    }
  }

  /* ---------- segmented control (GRID) ---------- */
  var seg = document.querySelector('.seg');
  if (seg) {
    var panel = document.getElementById('grid-panel');
    var texts = Array.prototype.slice.call(document.getElementById('grid-seg').content.children);
    var tabs = Array.prototype.slice.call(seg.querySelectorAll('button'));
    function pick(i) {
      tabs.forEach(function (t, j) { t.setAttribute('aria-selected', j === i ? 'true' : 'false'); t.tabIndex = j === i ? 0 : -1; });
      panel.innerHTML = texts[i].innerHTML;
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { pick(i); });
      t.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { var n = (i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length; pick(n); tabs[n].focus(); }
      });
    });
    pick(0);
  }

  /* ---------- journey: branch graph, read top to bottom ---------- */
  (function journey() {
    var root = document.getElementById('jr');
    if (!root || !window.TIMELINE) return;
    var T = window.TIMELINE, PL = T.places, ROWS = T.rows;
    var list = root.querySelector('.jr-list'), svg = root.querySelector('.jr-svg');
    var side = root.querySelector('.jr-side'), panel = root.querySelector('.jr-panel');
    var wide = window.matchMedia('(min-width: 900px)');
    var SPEED = 300;                                   // px per second for the light
    var lit = false, sel = null, touched = false, demoTimer = null;
    var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var byId = {}, rowById = {};
    (window.PROJECTS || []).forEach(function (p) { byId[p.id] = { p: p }; });
    (window.NOW || []).forEach(function (n) { if (n.id) byId[n.id] = { n: n }; });
    var now = new Date();

    ROWS.forEach(function (r) { rowById[r.id] = r; });
    ROWS.forEach(function (r) {
      r.placeId = r.type === 'place' ? r.id : (r.place || 'life');
      r.color = r.type === 'life' ? '#f5f5f7' : PL[r.placeId].color;
      r.next = r.type === 'place' && PL[r.id].next;
      r.lane = r.type === 'life' ? 0 : r.type === 'place' ? r.col : rowById[r.place].col;
      r.side = r.lane < 0 ? 'left' : 'right';
      if (r.type === 'life' && r.id === 'now' && !r.sub) r.sub = MONTHS[now.getMonth()] + ' ' + now.getFullYear();
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'jr-row jr-row--' + r.type + ' is-' + r.side + (r.next ? ' is-next' : '');
      b.setAttribute('role', 'listitem');
      b.style.setProperty('--c', r.color);
      b.innerHTML = '<span class="jr-lbl">' + esc(r.label) + (r.live ? '<i class="jr-live" aria-hidden="true"></i>' : '') + (r.next ? '<em class="jr-next">Next</em>' : '') + '</span>' +
        (r.sub ? '<span class="jr-sub">' + esc(r.sub) + '</span>' : '');
      b.addEventListener('click', function () { stopDemo(); touched = true; root.classList.add('touched'); pick(r); });
      list.appendChild(b);
      r.el = b;
    });
    var nowRow = rowById.now;

    function el(tag, attrs, parent) { var n = document.createElementNS(SVGNS, tag); for (var k in attrs) n.setAttribute(k, attrs[k]); parent.appendChild(n); return n; }
    var maxDelay = 0;
    function timing(node, y0, y1) {
      if (lit) return;
      var d = Math.max(0, y0) / SPEED, dur = Math.max(0.05, (y1 - y0) / SPEED);
      node.style.setProperty('--d', d.toFixed(3) + 's');
      node.style.setProperty('--dur', dur.toFixed(3) + 's');
      maxDelay = Math.max(maxDelay, d + dur);
    }

    // wide screens: rows sit at their slot, left branches on the left, right branches on the right.
    // phones: rows stack in order, every label on the right, lanes to the left of them.
    function layout() {
      var W = list.clientWidth, isWide = wide.matches;
      var G = isWide ? 30 : 22, ROW = isWide ? 68 : 0;
      var cx = isWide ? function (c) { return W / 2 + c * G; } : function (c) { return 10 + (c + 2) * G; };
      if (isWide) {
        var maxSlot = 0;
        ROWS.forEach(function (r) { maxSlot = Math.max(maxSlot, r.slot); });
        list.style.height = ((maxSlot + 1) * ROW + 24) + 'px';
        var rightEdge = cx(1) + 22;
        ROWS.forEach(function (r) {
          var s = r.el.style;
          s.position = 'absolute'; s.top = (r.slot * ROW + ROW / 2) + 'px'; s.minHeight = '0px'; s.transform = 'translateY(-50%)';
          if (r.side === 'left') { s.left = '0px'; s.width = (cx(r.lane) - 22) + 'px'; s.paddingLeft = '8px'; s.paddingRight = '0px'; }
          else { s.left = rightEdge + 'px'; s.width = (W - rightEdge) + 'px'; s.paddingLeft = '0px'; s.paddingRight = '8px'; }
        });
      } else {
        list.style.height = '';
        root.style.setProperty('--gx', (cx(1) + 24) + 'px');
        ROWS.forEach(function (r) { ['position', 'top', 'minHeight', 'transform', 'left', 'width', 'paddingLeft', 'paddingRight'].forEach(function (k) { r.el.style[k] = ''; }); });
      }
      return { cx: cx, rowH: isWide ? ROW : ROWS[1].el.offsetHeight };
    }

    function draw() {
      var L = layout(), cx = L.cx, rowH = L.rowH;
      // height from the rows (and panel) only: the svg itself must not stretch it
      var H = 0, W = list.clientWidth;
      Array.prototype.forEach.call(list.children, function (c) { if (c !== svg) H = Math.max(H, c.offsetTop + c.offsetHeight); });
      if (wide.matches) H = Math.max(H, parseFloat(list.style.height) || 0);
      svg.setAttribute('width', W); svg.setAttribute('height', H); svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      ROWS.forEach(function (r) { r.y = wide.matches ? parseFloat(r.el.style.top) : r.el.offsetTop + r.el.offsetHeight / 2; });
      var dimG = el('g', {}, svg), litG = el('g', {}, svg), nodeG = el('g', {}, svg);
      maxDelay = 0;

      function lane(d, color, p, y0, y1, future) {
        el('path', { d: d, class: 'dim' + (future ? ' future' : '') }, dimG);
        if (future) return;
        var lp = el('path', { d: d, class: 'lp', pathLength: 1, 'data-p': p, style: 'stroke:' + color + ';color:' + color }, litG);
        timing(lp, y0, y1);
      }
      var yStart = ROWS[0].y, yNow = nowRow.y;
      lane('M' + cx(0) + ',' + yStart + ' V' + yNow, '#f5f5f7', 'life', yStart, yNow);
      lane('M' + cx(0) + ',' + yNow + ' V' + (ROWS[ROWS.length - 1].y + rowH * 0.6), '', 'life', 0, 0, true);

      ROWS.forEach(function (r) {
        if (r.type !== 'place') return;
        var bend = wide.matches ? 0.8 : 0.42;
        var P = PL[r.id], x = cx(r.col), px = cx(P.from ? rowById[P.from].col : 0), y = r.y, fork = rowH * bend;
        var d = 'M' + px + ',' + (y - fork) + ' C' + px + ',' + (y - fork * 0.45) + ' ' + x + ',' + (y - fork * 0.55) + ' ' + x + ',' + y;
        var steps = ROWS.filter(function (o) { return o.place === r.id; });
        var lastY = steps.length ? Math.max.apply(null, steps.map(function (o) { return o.y; })) : y;
        if (P.next) { lane(d + ' V' + (y + rowH * 0.6), P.color, r.id, 0, 0, true); return; }
        var yEnd;
        if (P.merge) {
          var g = rowH * bend; yEnd = lastY + g;
          d += ' V' + lastY + ' C' + x + ',' + (lastY + g * 0.45) + ' ' + px + ',' + (lastY + g * 0.55) + ' ' + px + ',' + yEnd;
        } else { yEnd = yNow; d += ' V' + yEnd; }
        lane(d, P.color, r.id, y - fork, yEnd);
      });

      ROWS.forEach(function (r) {
        var x = cx(r.lane), y = r.y;
        if (r.next) { el('circle', { cx: x, cy: y, r: 7, class: 'dimnode future' }, nodeG); return; }
        el('circle', { cx: x, cy: y, r: r.type === 'place' ? 7 : 5.5, class: 'dimnode' }, nodeG);
        var g = el('g', { class: 'ln', 'data-p': r.placeId, 'data-r': r.id }, nodeG);
        timing(g, y, y + 1);
        el('circle', { cx: x, cy: y, r: 8, class: 'ping', 'data-ping': r.id, style: 'stroke:' + r.color }, g);
        if (r.live) el('circle', { cx: x, cy: y, r: 6, class: 'pulse', style: 'fill:' + r.color }, g);
        if (r.type === 'place') el('circle', { cx: x, cy: y, r: 7, class: 'ring', style: 'stroke:' + r.color }, g);
        else el('circle', { cx: x, cy: y, r: r.type === 'life' ? 6 : 5.5, class: 'dot', style: 'fill:' + r.color + ';color:' + r.color }, g);
        if (!lit) r.el.style.setProperty('--d', (y / SPEED).toFixed(3) + 's');
      });
      mark();
    }

    // light it up once, when the graph scrolls into view; then walk the hint through a few stops
    function ignite() {
      requestAnimationFrame(function () { requestAnimationFrame(function () {
        root.classList.add('go');
        setTimeout(function () { lit = true; root.classList.add('ready'); demo(0); }, (maxDelay + 0.3) * 1000);
      }); });
    }
    var demoAt = null;
    function demo(k) {
      var ids = T.demo || [];
      if (touched || !ids.length) return;
      var r = rowById[ids[k]]; demoAt = r.id;
      if (wide.matches) pick(r, true); else mark();
      if (k < ids.length - 1) demoTimer = setTimeout(function () { demo(k + 1); }, 2200);
    }
    function stopDemo() { clearTimeout(demoTimer); demoAt = null; }

    function cardsFor(r) {
      if (!r || r.type === 'life') return [];
      return r.type === 'place' ? (PL[r.id].cards || []) : [r.id];
    }
    function pick(r, fromDemo) {
      sel = (!fromDemo && sel === r) || r.type === 'life' ? null : r;
      render();
    }
    function mark() {
      root.classList.toggle('has-sel', !!sel);
      var onRows = {}, onPlace = null;
      if (sel) {
        if (sel.type === 'place') { onPlace = sel.id; ROWS.forEach(function (o) { if (o.placeId === sel.id) onRows[o.id] = 1; }); }
        else onRows[sel.id] = 1;
      }
      ROWS.forEach(function (o) {
        o.el.classList.toggle('on', !!onRows[o.id]);
        o.el.setAttribute('aria-pressed', sel === o ? 'true' : 'false');
      });
      Array.prototype.forEach.call(svg.querySelectorAll('.lp, .ln'), function (n) {
        var p = n.getAttribute('data-p'), rid = n.getAttribute('data-r');
        var on = sel && (rid ? !!onRows[rid] : (p === onPlace || (sel.type === 'project' && p === sel.place)));
        n.classList.toggle('on', !!on);
      });
      Array.prototype.forEach.call(svg.querySelectorAll('.ping'), function (n) { n.classList.toggle('is-on', n.getAttribute('data-ping') === demoAt); });
    }
    function cardHTML(id, k) {
      var o = byId[id]; if (!o) return '';
      var media, eyebrow, title, text, links, more = '';
      if (o.p) {
        var p = o.p;
        media = mediaHTML(p.media) + kindHTML(p.kind);
        eyebrow = p.eyebrow; title = p.title; text = p.short; links = linksHTML(p.links);
        more = '<a class="chip jc-open" href="#' + p.id + '"><i class="fa-solid fa-plus" aria-hidden="true"></i>Learn more</a>';
      } else {
        var n = o.n;
        media = n.media ? mediaHTML(n.media) : '<div class="np-panel"><span class="big">' + esc(n.panel.big) + '</span><span class="small">' + esc(n.panel.small) + '</span></div>';
        media += '<span class="kind jc-status' + (n.status === 'Next' ? ' is-next' : '') + '"><i></i>' + esc(n.status) + '</span>';
        eyebrow = n.org; title = n.title; text = n.text; links = linksHTML(n.links);
        if (n.orgHref) links += '<a class="chip" href="' + n.orgHref + '" target="_blank" rel="noopener"><i class="fa-solid fa-building-columns" aria-hidden="true"></i>' + esc(n.org) + '</a>';
      }
      return '<article class="jc" style="--k:' + k + '"><div class="jc-media' + (o.p && o.p.media.fit === 'contain' ? ' contain' : '') + '">' + media + '</div>' +
        '<div class="jc-body"><span class="jc-eyebrow">' + esc(eyebrow) + '</span><h4>' + esc(title) + '</h4><p>' + esc(text) + '</p>' +
        '<div class="jc-links">' + more + links + '</div></div></article>';
    }
    function render() {
      var ids = cardsFor(sel);
      panel.innerHTML = ids.length ? '<div class="jr-cards' + (ids.length === 1 ? ' one' : '') + '">' + ids.map(cardHTML).join('') + '</div>'
        : (wide.matches ? '<div class="jr-empty"><i class="fa-solid fa-code-branch" aria-hidden="true"></i><p>Your pick shows up here.</p></div>' : '');
      // wide: cards beside the graph. phone: cards open right under the row you tapped
      if (wide.matches || !sel) { if (panel.parentNode !== side) side.appendChild(panel); }
      else if (panel.previousSibling !== sel.el) list.insertBefore(panel, sel.el.nextSibling);
      draw();
      if (!wide.matches && sel && touched) {
        var b = panel.getBoundingClientRect();
        if (b.bottom > window.innerHeight) window.scrollBy({ top: Math.min(b.bottom - window.innerHeight + 24, b.top - 80), behavior: reduce ? 'auto' : 'smooth' });
      }
    }

    render();
    var raf = 0;
    function redraw() { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); }
    if ('ResizeObserver' in window) new ResizeObserver(redraw).observe(list); else window.addEventListener('resize', redraw);
    (wide.addEventListener ? wide.addEventListener('change', render) : wide.addListener(render));
    if (reduce || !('IntersectionObserver' in window)) { lit = true; root.classList.add('go', 'ready'); draw(); }
    else new IntersectionObserver(function (e, obs) { if (e[0].isIntersecting) { ignite(); obs.disconnect(); } }, { threshold: 0.35 }).observe(list);
  })();

  /* ---------- optical left edge: line up the ink of the first letter, whatever font the visitor has ---------- */
  var optical = document.querySelectorAll('[data-optical]');
  if (optical.length) {
    var octx = document.createElement('canvas').getContext('2d');
    var align = function () {
      Array.prototype.forEach.call(optical, function (el) {
        var cs = getComputedStyle(el), ch = (el.textContent.trim()[0] || '');
        octx.font = cs.fontStyle + ' ' + cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily;
        var m = octx.measureText(ch);
        el.style.marginLeft = (typeof m.actualBoundingBoxLeft === 'number' ? m.actualBoundingBoxLeft : 0) + 'px';
      });
    };
    align();
    window.addEventListener('resize', align);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(align);
  }

  /* ---------- contact: copy e-mail ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('.cl-copy'), function (b) {
    b.addEventListener('click', function () {
      var label = b.querySelector('span'), done = function () { b.classList.add('is-done'); label.textContent = 'Copied'; setTimeout(function () { b.classList.remove('is-done'); label.textContent = 'Copy'; }, 1800); };
      if (navigator.clipboard) navigator.clipboard.writeText(b.getAttribute('data-copy')).then(done, function () { window.location.href = 'mailto:' + b.getAttribute('data-copy'); });
      else window.location.href = 'mailto:' + b.getAttribute('data-copy');
    });
  });

  /* ---------- footer year ---------- */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();
