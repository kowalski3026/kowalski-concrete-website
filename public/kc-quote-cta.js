/* Kowalski Concrete — floating "Instant Quote" button.
   Loaded on marketing pages. Appears after the visitor scrolls a little; can be dismissed for the session. */
(function () {
  if (/instant-quote|quote-thank-you|privacy|terms|free-quote/.test(location.pathname)) return;
  try { if (sessionStorage.getItem('kcIqHide') === '1') return; } catch (e) {}

  var css =
    '#kcIq{position:fixed;left:50%;bottom:max(14px,env(safe-area-inset-bottom));z-index:55;display:flex;align-items:stretch;' +
    'transform:translate(-50%,160%);opacity:0;transition:transform .3s ease,opacity .3s ease;border-radius:2px;overflow:hidden;' +
    'border:1px solid #141414;max-width:calc(100vw - 20px)}' +
    '#kcIq.on{transform:translate(-50%,0);opacity:1}' +
    '#kcIq a{display:block;padding:15px 18px;background:#F59E0B;color:#141414;' +
    'font-family:"IBM Plex Mono",ui-monospace,Menlo,Consolas,monospace;font-weight:700;font-size:11.5px;letter-spacing:.1em;' +
    'text-decoration:none;white-space:nowrap}' +
    '#kcIq a:active{background:#F5F3F0}' +
    '#kcIq button{border:0;border-left:1px solid #141414;background:#141414;color:#F5F3F0;font-size:18px;line-height:1;padding:0 14px;cursor:pointer;font-weight:700;border-radius:0}' +
    '@media (hover:hover){#kcIq a:hover{background:#F5F3F0}}' +
    '@media (prefers-reduced-motion:reduce){#kcIq{transition:none}}';
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  var box = document.createElement('div');
  box.id = 'kcIq';
  var a = document.createElement('a');
  a.href = '/instant-quote.html';
  a.textContent = 'PRICE YOUR PROJECT IN 60 SEC →';
  var x = document.createElement('button');
  x.type = 'button';
  x.setAttribute('aria-label', 'Dismiss');
  x.textContent = '×';
  x.onclick = function () {
    box.classList.remove('on');
    try { sessionStorage.setItem('kcIqHide', '1'); } catch (e) {}
    setTimeout(function () { box.remove(); }, 400);
  };
  box.appendChild(a);
  box.appendChild(x);
  document.body.appendChild(box);

  function check() { box.classList.toggle('on', (window.scrollY || document.documentElement.scrollTop) > 500); }
  window.addEventListener('scroll', check, { passive: true });
  check();
})();
