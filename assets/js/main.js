/* ==========================================================
   GENT SPA | جنت سبا
   No dependencies. Arabic ships in the markup; EN is the toggle.
   ========================================================== */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var isAr = function () { return document.documentElement.getAttribute('lang') === 'ar'; };
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- the breathing guide: 4s in, 4s out ---------- */
  var breath = $('.breath'), word = $('#breathW'), inhale = true;
  var WORDS = { in: ['شهيق', 'breathe in'], out: ['زفير', 'breathe out'] };
  // phase is what the circle is doing right now; the label must name that,
  // not the next one
  var phase = 'in';
  function setWord() {
    word.textContent = WORDS[phase][isAr() ? 0 : 1];
  }
  function step() {
    phase = inhale ? 'in' : 'out';
    breath.style.setProperty('--b', inhale ? '1' : '.72');
    word.classList.add('fade');
    setTimeout(function () { setWord(); word.classList.remove('fade'); }, 450);
    inhale = !inhale;
  }
  if (reduce) { breath.style.setProperty('--b', '.9'); setWord(); }
  else { setWord(); setTimeout(step, 300); setInterval(step, 4000); }

  /* ---------- hours (UTC+3 all year) ---------- */
  // Sat–Thu 10am → 3am; Friday 1:30pm → 3am. The 3am tail belongs to the
  // previous day, so midnight–3am is open every night.
  function paintOpen() {
    var d = new Date(Date.now() + 3 * 3600e3), dow = d.getUTCDay(), m = d.getUTCHours() * 60 + d.getUTCMinutes();
    var opens = dow === 5 ? 810 : 600;
    var open = m < 180 || m >= opens, el = $('#openNow'), ar = isAr(), txt;
    if (open) txt = ar ? 'مفتوح الحين · لين ٣ الفجر' : 'Open now · until 3am';
    else txt = ar ? (dow === 5 ? 'مغلق الحين · يفتح ١:٣٠ الظهر' : 'مغلق الحين · يفتح ١٠ الصباح') : (dow === 5 ? 'Closed now · opens 1:30pm' : 'Closed now · opens 10am');
    el.innerHTML = '<i></i>' + txt; el.classList.toggle('closed', !open);
  }

  /* ---------- language ---------- */
  var KEY = 'gs-lang', lngTx = $('#lngTx');
  function apply(lang) {
    var dd = document.documentElement;
    dd.setAttribute('lang', lang); dd.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    $$('[data-en]').forEach(function (el) {
      var v = el.getAttribute(lang === 'ar' ? 'data-ar' : 'data-en');
      if (v != null) el.innerHTML = v;
    });
    if (lngTx) lngTx.textContent = lang === 'ar' ? 'EN' : 'ع';
    document.title = lang === 'ar' ? 'جنت سبا | Gent Spa — مركز عناية وسبا للرجال، الروضة، جدة' : 'Gent Spa | جنت سبا — Men’s grooming & spa, Al Rawdah, Jeddah';
    splitWords($('#heroH'));
    setWord(); paintOpen();
  }
  $('#lngBtn').addEventListener('click', function () {
    var next = isAr() ? 'en' : 'ar'; apply(next);
    try { localStorage.setItem(KEY, next); } catch (e) {}
  });

  /* Words, never characters — per-letter spans break Arabic joining. */
  function splitWords(el) {
    var txt = (el.textContent || '').trim(); if (!txt) return;
    el.textContent = '';
    txt.split(/\s+/).forEach(function (w, i) {
      var m = document.createElement('span'); m.className = 'wm';
      var x = document.createElement('i'); x.textContent = w; x.style.setProperty('--i', i);
      m.appendChild(x); el.appendChild(m); el.appendChild(document.createTextNode(' '));
    });
  }

  /* ---------- nav ---------- */
  var nav = $('#nav'), brg = $('#brg'), menu = $('#menu');
  function closeMenu() { menu.classList.remove('open'); brg.classList.remove('on'); brg.setAttribute('aria-expanded', 'false'); document.body.classList.remove('lock'); }
  brg.addEventListener('click', function () {
    nav.classList.remove('slid');
    var o = menu.classList.toggle('open');
    brg.classList.toggle('on', o); brg.setAttribute('aria-expanded', o ? 'true' : 'false');
    document.body.classList.toggle('lock', o);
  });
  $$('a', menu).forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  /* ---------- scroll ---------- */
  var reveals = $$('.rv'), dock = $('#dock'), lastY = 0, ticking = false;
  function onScroll() {
    var y = window.scrollY, vh = window.innerHeight;
    nav.classList.toggle('stuck', y > 30);
    if (!menu.classList.contains('open')) {
      if (y > 500 && y > lastY + 4) nav.classList.add('slid');
      else if (y < lastY - 4 || y < 500) nav.classList.remove('slid');
    }
    lastY = y;
    if (dock) dock.classList.toggle('on', y > vh * .6);
    for (var i = reveals.length - 1; i >= 0; i--) {
      if (reveals[i].getBoundingClientRect().top < vh * .9) { reveals[i].classList.add('in'); reveals.splice(i, 1); }
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener('resize', onScroll);

  var saved = null; try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (saved === 'en') apply('en'); else { splitWords($('#heroH')); paintOpen(); }
  setInterval(paintOpen, 60000);
  onScroll(); setTimeout(onScroll, 250);
})();
