/* Kowalski Concrete — floating "Instant Quote" button.
   Loaded on marketing pages. Appears after the visitor scrolls a little; can be dismissed for the session. */
(function () {
  if (/instant-quote|quote-thank-you|privacy|terms|free-quote/.test(location.pathname)) return;
  try { if (sessionStorage.getItem('kcIqHide') === '1') return; } catch (e) {}

  var css =
    '#kcIq{position:fixed;left:50%;bottom:max(14px,env(safe-area-inset-bottom));z-index:55;display:flex;align-items:stretch;' +
    'transform:translate(-50%,160%);opacity:0;transition:transform .35s ease,opacity .35s ease;border-radius:999px;overflow:hidden;' +
    'box-shadow:0 8px 28px rgba(0,0,0,.5),0 0 0 1px rgba(255,255,255,.12);max-width:calc(100vw - 20px)}' +
    '#kcIq.on{transform:translate(-50%,0);opacity:1}' +
    '#kcIq a{display:block;padding:14px 16px 14px 20px;background:linear-gradient(135deg,#FBBF24,#F59E0B 55%,#D97706);color:#141414;' +
    'font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-weight:700;font-size:11.5px;letter-spacing:.08em;' +
    'text-decoration:none;white-space:nowrap}' +
    '#kcIq button{border:0;background:#D97706;color:#141414;font-size:18px;line-height:1;padding:0 14px;cursor:pointer;font-weight:700}' +
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
