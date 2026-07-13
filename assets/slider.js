/* Q Bazaar — makes every ".qb-slider" a working carousel:
   prev/next arrows + clickable dots + drag/scroll. Runs after each render. */
(function () {
  var CSS = ''
    + '.qb-slide-host{position:relative}'
    + '.qb-slide-btn{position:absolute;top:78px;transform:translateY(-50%);z-index:6;width:42px;height:42px;'
    +   'border-radius:50%;border:1px solid #F38057;background:#fff;color:#F38057;font:400 24px/1 Poppins,sans-serif;'
    +   'cursor:pointer;box-shadow:0 6px 18px rgba(0,0,0,.14);display:flex;align-items:center;justify-content:center;'
    +   'transition:background .15s,color .15s,opacity .15s}'
    + '.qb-slide-btn:hover{background:#f38057;color:#fff;border-color:#f38057}'
    + '.qb-slide-btn[disabled]{opacity:0;pointer-events:none}'
    + '.qb-slide-prev{left:-8px}.qb-slide-next{right:-8px}'
    + '.qb-slide-dots{display:flex;justify-content:center;align-items:center;gap:7px;margin-top:18px}'
    + '.qb-slide-dot{width:9px;height:9px;border-radius:50%;background:rgb(249,199,178);cursor:pointer;'
    +   'padding:0;border:0;transition:width .2s,background .2s}'
    + '.qb-slide-dot.is-active{width:40px;border-radius:12px;background:rgb(243,128,87)}'
    + '.qb-slider{scrollbar-width:none}.qb-slider::-webkit-scrollbar{display:none}';
  var style = document.createElement('style');
  style.textContent = CSS;
  (document.head || document.documentElement).appendChild(style);

  function isDotsRow(el) {
    if (!el || el.tagName !== 'DIV') return false;
    var ch = el.children;
    if (ch.length < 2 || ch.length > 12) return false;
    for (var i = 0; i < ch.length; i++) {
      if (ch[i].tagName !== 'SPAN') return false;
      if ((ch[i].textContent || '').trim()) return false;
    }
    return true;
  }

  function step(track) {
    var c = track.firstElementChild;
    var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 20;
    var w = c ? c.getBoundingClientRect().width + gap : 300;
    return Math.max(w, track.clientWidth * 0.85);
  }

  function enhance(track) {
    if (track.__sliderInit) return;
    track.__sliderInit = true;
    track.style.scrollBehavior = 'smooth';
    var host = track.parentElement;
    host.classList.add('qb-slide-host');

    var prev = document.createElement('button');
    var next = document.createElement('button');
    prev.type = next.type = 'button';
    var ARROW = function (dir) {
      return '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'
        + (dir < 0 ? '<path d="M20 12H4M10 6l-6 6 6 6"/>' : '<path d="M4 12h16M14 6l6 6-6 6"/>') + '</svg>';
    };
    prev.className = 'qb-slide-btn qb-slide-prev'; prev.innerHTML = ARROW(-1); prev.setAttribute('aria-label', 'Previous');
    next.className = 'qb-slide-btn qb-slide-next'; next.innerHTML = ARROW(1); next.setAttribute('aria-label', 'Next');
    prev.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); track.scrollBy({ left: -step(track), behavior: 'smooth' }); });
    next.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); track.scrollBy({ left: step(track), behavior: 'smooth' }); });
    host.appendChild(prev); host.appendChild(next);

    // dots: reuse/replace the original decorative dots row if present
    var dots = document.createElement('div');
    dots.className = 'qb-slide-dots';
    var sib = host.nextElementSibling;
    if (isDotsRow(sib)) { sib.style.display = 'none'; sib.parentNode.insertBefore(dots, sib.nextSibling); }
    else host.parentNode.insertBefore(dots, host.nextSibling);

    function pageCount() { return Math.max(1, Math.ceil((track.scrollWidth - 4) / track.clientWidth)); }

    function update() {
      var scrollable = track.scrollWidth - track.clientWidth > 4;
      prev.style.display = next.style.display = scrollable ? '' : 'none';
      dots.style.display = scrollable ? '' : 'none';
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
      var n = pageCount();
      if (dots.childElementCount !== n) {
        dots.innerHTML = '';
        for (var i = 0; i < n; i++) (function (i) {
          var d = document.createElement('button');
          d.type = 'button'; d.className = 'qb-slide-dot'; d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
          d.addEventListener('click', function () { track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' }); });
          dots.appendChild(d);
        })(i);
      }
      var atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
      var active = atEnd ? n - 1 : Math.round(track.scrollLeft / track.clientWidth);
      for (var j = 0; j < dots.children.length; j++) dots.children[j].classList.toggle('is-active', j === active);
    }

    track.addEventListener('scroll', function () {
      if (track.__raf) return;
      track.__raf = requestAnimationFrame(function () { track.__raf = 0; update(); });
    });
    window.addEventListener('resize', update);
    update();
    [80, 300, 800].forEach(function (t) { setTimeout(update, t); });
  }

  function scan() { document.querySelectorAll('.qb-slider').forEach(enhance); }

  function start() {
    scan();
    new MutationObserver(function () { scan(); }).observe(document.body, { childList: true, subtree: true });
    [200, 600, 1200].forEach(function (t) { setTimeout(scan, t); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
