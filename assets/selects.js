/* Q Bazaar — hero search dropdowns (Figma web selects).
   The design's "Choose Category" opens a two-level cascading panel
   (Home Page - Category Option, 489:16010) and "Distance" a simple list
   (Home Page - Distance Option, 492:17733); choosing an option just updates
   the field label (Home Page - Choose Option, 492:18987). The engine renders
   these fields as inert divs, so this helper adds the designed behaviour.
   Re-applies after engine re-renders, like slider.js / photos.js. */
(function () {
  var CATS = [
    { label: 'Cars & Vehicles', subs: ['Cars', 'Bicycles & Accessories', 'Car Parts & Tiers', 'Boats & Marine Accessories', 'Motorcycles & Scooters', 'Motorcycle Parts & Accessories'] },
    { label: 'Services' }, { label: 'Tickets & Events' }, { label: 'Family, Kids & Baby' },
    { label: 'Leisure, Hobby & Community' }, { label: 'Home & Garden' }, { label: 'Pets' },
    { label: 'Real Estate' }, { label: 'Jobs' }, { label: 'Electronics' }
  ];
  var DIST = ['All Qatar', '+5 km', '+10 km', '+20 km', '+30 km', '+50 km', '+100 km', '+150 km', '+200 km'];
  var PLACEHOLDER = 'rgb(189, 189, 189)';

  var CSS = ''
    + '.qb-ddwrap{position:relative}'
    + '.qb-ddpanel{position:absolute;top:calc(100% + 16px);left:0;min-width:250px;background:#fff;border-radius:16px;'
    +   'box-shadow:0 18px 44px rgba(0,0,0,.14);padding:6px 0;z-index:9999;font-family:Poppins,sans-serif;text-align:left}'
    + '.qb-ddhead{font:600 16px/1.3 Poppins;color:rgb(87,85,85);padding:14px 20px 10px;border-bottom:1px solid rgb(243,243,243)}'
    + '.qb-dditem{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:11px 20px;'
    +   'font:400 14px/1.3 Poppins;color:rgb(120,120,120);cursor:pointer;white-space:nowrap}'
    + '.qb-dditem:hover,.qb-dditem.on{background:rgb(240,240,240);color:rgb(60,60,60)}'
    + '.qb-dditem .qb-ddchev{color:rgb(160,160,160);font-size:15px;line-height:1}'
    + '.qb-ddsub{position:absolute;left:calc(100% + 14px);top:44px;min-width:260px;background:#fff;border-radius:16px;'
    +   'box-shadow:0 18px 44px rgba(0,0,0,.14);padding:6px 0;display:none}'
    + '.qb-ddpanel .qb-ddsub.open{display:block}'
    + '.qb-ddopen > svg{transform:rotate(180deg)}'
    + '.qb-ddwrap > svg{transition:transform .18s ease}'
    + '@media (max-width:600px){.qb-ddpanel{display:none !important}}';

  var st = document.createElement('style'); st.textContent = CSS;
  (document.head || document.documentElement).appendChild(st);

  function closeAll() {
    document.querySelectorAll('.qb-ddpanel').forEach(function (p) { p.remove(); });
    document.querySelectorAll('.qb-ddopen').forEach(function (c) { c.classList.remove('qb-ddopen'); });
  }
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.qb-ddwrap')) closeAll();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });

  function labelSpan(ctrl) {
    // the field's text lives in a bare text node or first non-svg element
    for (var i = 0; i < ctrl.childNodes.length; i++) {
      var n = ctrl.childNodes[i];
      if (n.nodeType === 3 && n.textContent.trim()) return n;
      if (n.nodeType === 1 && n.tagName !== 'SVG' && n.textContent.trim()) return n;
    }
    return null;
  }
  function setValue(ctrl, v) {
    var n = labelSpan(ctrl);
    if (n) { if (n.nodeType === 3) n.textContent = v; else n.textContent = v; }
    ctrl.style.color = 'rgb(51,51,51)';
    closeAll();
  }

  function openCategory(ctrl) {
    closeAll();
    ctrl.classList.add('qb-ddopen');
    var p = document.createElement('div');
    p.className = 'qb-ddpanel';
    var head = document.createElement('div');
    head.className = 'qb-ddhead'; head.textContent = 'All Categories';
    head.style.cursor = 'pointer';
    head.addEventListener('click', function () { setValue(ctrl, 'All Categories'); });
    p.appendChild(head);
    CATS.forEach(function (c) {
      var it = document.createElement('div');
      it.className = 'qb-dditem';
      it.innerHTML = '<span></span>' + (c.subs ? '<span class="qb-ddchev">›</span>' : '');
      it.firstChild.textContent = c.label;
      if (c.subs) {
        var sub = document.createElement('div');
        sub.className = 'qb-ddsub';
        c.subs.forEach(function (s) {
          var si = document.createElement('div');
          si.className = 'qb-dditem'; si.textContent = s;
          si.addEventListener('click', function (e) { e.stopPropagation(); setValue(ctrl, s); });
          sub.appendChild(si);
        });
        p.appendChild(sub);
        it.addEventListener('mouseenter', function () {
          p.querySelectorAll('.qb-dditem.on').forEach(function (x) { x.classList.remove('on'); });
          it.classList.add('on');
          sub.style.top = (it.offsetTop + 2) + 'px';
          sub.classList.add('open');
        });
      } else {
        it.addEventListener('mouseenter', function () {
          p.querySelectorAll('.qb-ddsub.open').forEach(function (x) { x.classList.remove('open'); });
          p.querySelectorAll('.qb-dditem.on').forEach(function (x) { x.classList.remove('on'); });
        });
      }
      it.addEventListener('click', function () { setValue(ctrl, c.label); });
      p.appendChild(it);
    });
    ctrl.appendChild(p);
  }

  function openDistance(ctrl) {
    closeAll();
    ctrl.classList.add('qb-ddopen');
    var p = document.createElement('div');
    p.className = 'qb-ddpanel';
    p.style.minWidth = '190px';
    DIST.forEach(function (d, i) {
      var it = document.createElement('div');
      it.className = 'qb-dditem' + (i === 0 ? ' on' : '');
      it.textContent = d;
      it.addEventListener('click', function () { setValue(ctrl, d); });
      p.appendChild(it);
    });
    ctrl.appendChild(p);
  }

  function attach() {
    var form = document.querySelector('form[style*="max-width: 1000px"]');
    if (!form) return;
    [].forEach.call(form.children, function (ctrl) {
      if (ctrl.tagName !== 'DIV' || ctrl.dataset.qbsel) return;
      var t = (ctrl.textContent || '').trim();
      var kind = /Choose Category|All Categories/.test(t) ? 'cat'
        : /^Distance$|km$|All Qatar/.test(t) ? 'dist' : null;
      // after a selection the label changes; recognise by position too
      if (!kind) return;
      ctrl.dataset.qbsel = kind;
      ctrl.classList.add('qb-ddwrap');
      ctrl.style.cursor = 'pointer';
      ctrl.addEventListener('click', function (e) {
        if (e.target.closest('.qb-ddpanel')) return;
        var open = ctrl.classList.contains('qb-ddopen');
        closeAll();
        if (!open) (kind === 'cat' ? openCategory : openDistance)(ctrl);
      });
    });
  }

  attach();
  new MutationObserver(function () { attach(); }).observe(document.body, { childList: true, subtree: true });

  /* debug hook: ?qbdd=cat|dist opens the dropdown on load (screenshot tooling) */
  var dd = /[?&]qbdd=(cat|dist)/.exec(location.search);
  if (dd) setTimeout(function () {
    var form = document.querySelector('form[style*="max-width: 1000px"]');
    if (!form) return;
    var ctrl = [].filter.call(form.children, function (c) { return c.dataset && c.dataset.qbsel === dd[1]; })[0];
    if (!ctrl) return;
    (dd[1] === 'cat' ? openCategory : openDistance)(ctrl);
    if (dd[1] === 'cat') {
      var it = [].filter.call(document.querySelectorAll('.qb-dditem'), function (e) { return /Cars & Vehicles/.test(e.textContent); })[0];
      if (it) it.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    }
  }, 1200);
})();
