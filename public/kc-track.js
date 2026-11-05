/* Kowalski Concrete — lightweight tracking.
   To turn on Google Analytics 4 or the Meta pixel, paste the IDs below. Nothing else to change. */
(function () {
  var CFG = { GA4_ID: '', META_PIXEL_ID: '' };

  // Vercel Web Analytics (pageviews; custom events need a Vercel Pro plan)
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  var vs = document.createElement('script');
  vs.defer = true; vs.src = '/_vercel/insights/script.js';
  document.head.appendChild(vs);

  if (CFG.GA4_ID) {
    var g = document.createElement('script');
    g.async = true; g.src = 'https://www.googletagmanager.com/gtag/js?id=' + CFG.GA4_ID;
    document.head.appendChild(g);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date()); gtag('config', CFG.GA4_ID);
  }
  if (CFG.META_PIXEL_ID) {
    !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', CFG.META_PIXEL_ID); fbq('track', 'PageView');
  }

  var META_MAP = { quote_thanks: 'Lead', call_tap: 'Contact', email_tap: 'Contact' };
  function track(name, data) {
    data = data || {};
    try { window.va('event', { name: name, data: data }); } catch (e) {}
    try { if (window.gtag) gtag('event', name, data); } catch (e) {}
    try { if (window.fbq && META_MAP[name]) fbq('track', META_MAP[name]); } catch (e) {}
  }
  window.kcTrack = track;

  function where(el) {
    if (el.closest('nav')) return 'nav';
    var s = el.closest('[id]');
    return s ? s.id : 'page';
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('a,button') : null;
    if (!el) return;
    var h = el.getAttribute('href') || '';
    var w = where(el);
    if (h.indexOf('tel:') === 0) track('call_tap', { where: w });
    else if (h.indexOf('mailto:') === 0) track('email_tap', { where: w });
    else if (h.indexOf('free-quote') > -1) track('quote_click', { where: w });
    else if (h.indexOf('/visualizer') === 0) track('visualizer_click', { where: w });
    else if (h.indexOf('g.page') > -1) track('review_click', {});
    else if (el.id === 'playBtn' || el.id === 'gTab' || el.id === 'gPc') track('game_open', { where: w });
  }, true);

  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (f && f.classList && f.classList.contains('qform')) {
      var t = f.querySelector('[name=project_type]');
      track('quote_submit', { project: t ? t.value : '' });
    }
  }, true);

  // the real conversion: reached the thank-you page
  if (location.pathname.indexOf('quote-thank-you') > -1) track('quote_thanks', {});

  // first touch of the calculator
  var calc = document.getElementById('calc');
  if (calc) {
    var once = function () { track('calc_use', {}); calc.removeEventListener('pointerdown', once, true); };
    calc.addEventListener('pointerdown', once, true);
  }

  // scroll depth
  var marks = [25, 50, 75, 100], hit = {};
  addEventListener('scroll', function () {
    var d = document.documentElement, max = d.scrollHeight - innerHeight;
    if (max <= 0) return;
    var pct = Math.round(scrollY / max * 100);
    marks.forEach(function (m) { if (pct >= m && !hit[m]) { hit[m] = 1; track('scroll_' + m, {}); } });
  }, { passive: true });
})();
