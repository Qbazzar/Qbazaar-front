/* Q Bazaar — mobile navigation drawer (Figma mobile layout).
   On phones the header's icon cluster is hidden and a hamburger opens a slide-in
   drawer with the full navigation (Home, Categories, Favorites, Messages, Saved
   Search, My Ads, Sales Overview, Account Settings, Wallet, Log Out) plus an
   Add Ads button — matching the Figma "Menu" screens. Pure HTML/CSS/JS, links to
   the existing page files. Re-applies after the engine's re-renders. */
(function () {
  var I = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8L12 21.2l8.8-8.8a5.5 5.5 0 0 0 0-7.8z"/>',
    chat: '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4L3 21l1.1-9A8.4 8.4 0 1 1 21 11.5z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/>',
    tag: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="2.5"/>',
    chart: '<circle cx="12" cy="12" r="9"/><path d="m8.5 15.5 7-7M9 9h.01M15 15h.01"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1z"/>',
    wallet: '<rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M16 12h.01M3 10h18"/>',
    out: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>'
  };
  I.bell = '<path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>';
  var ITEMS = [
    ['Home', 'index.html', I.home], ['Categories', 'all-categories.html', I.grid],
    ['Favorites', 'wishlist.html', I.heart], ['Messages', 'messages.html', I.chat],
    ['Notifications', 'notifications.html', I.bell],
    ['Saved Search', 'saved-search.html', I.search], ['My Ads', 'my-ads.html', I.tag],
    ['Sales Overview', 'sales-overview.html', I.chart], ['Account Settings', 'account.html', I.gear],
    ['Wallet', 'account.html', I.wallet], ['Log Out', 'auth.html', I.out]
  ];
  var ORANGE = 'rgb(243,128,87)';

  var CSS = ''
    + '.qb-burger{display:none;position:fixed;top:14px;right:16px;z-index:99990;width:44px;height:44px;'
    +   'border-radius:12px;border:1px solid rgb(237,237,237);background:#fff;align-items:center;justify-content:center;'
    +   'cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.06)}'
    + '.qb-burger span{position:relative;width:20px;height:2px;background:#2b2b2b;border-radius:2px;transition:.2s}'
    + '.qb-burger span::before,.qb-burger span::after{content:"";position:absolute;left:0;width:20px;height:2px;background:#2b2b2b;border-radius:2px;transition:.2s}'
    + '.qb-burger span::before{top:-6px}.qb-burger span::after{top:6px}'
    + '.qb-mbell{display:none;position:fixed;top:14px;right:68px;z-index:99990;width:44px;height:44px;'
    +   'border-radius:12px;border:1px solid rgb(237,237,237);background:#fff;align-items:center;justify-content:center;'
    +   'cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.06);text-decoration:none;color:#2b2b2b;position:fixed}'
    + '.qb-mbell .dot{position:absolute;top:11px;right:12px;width:7px;height:7px;border-radius:50%;background:' + ORANGE + '}'
    + '.qb-mglobe{display:none;position:fixed;top:14px;right:120px;z-index:99990;width:44px;height:44px;'
    +   'border-radius:12px;border:1px solid rgb(237,237,237);background:#fff;align-items:center;justify-content:center;'
    +   'cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.06);color:#2b2b2b}'
    + '.qb-langpop{display:none;position:fixed;top:64px;right:16px;z-index:99993;width:210px;background:#fff;'
    +   'border:1px solid rgb(237,237,237);border-radius:14px;box-shadow:0 16px 40px rgba(0,0,0,.18);padding:8px;font-family:Poppins}'
    + '.qb-langpop.open{display:block}'
    + '.qb-langpop h4{font:600 11px Poppins;letter-spacing:.06em;text-transform:uppercase;color:#999;padding:6px 10px;margin:0}'
    + '.qb-langpop button{display:flex;align-items:center;gap:10px;width:100%;background:none;border:0;padding:9px 10px;'
    +   'border-radius:9px;cursor:pointer;font:500 14px Poppins;color:#333;text-align:left}'
    + '.qb-langpop button:hover{background:rgb(250,250,250)}'
    + '.qb-langpop button.on{background:rgb(255,240,234);color:' + ORANGE + '}'
    + '.qb-langpop .flag{font-size:16px}'
    + '@media (max-width:760px){ .qb-mbell,.qb-mglobe{display:flex} }'
    + '.qb-mdrawer-back{position:fixed;inset:0;background:rgba(20,20,20,.45);z-index:99991;opacity:0;pointer-events:none;transition:opacity .25s}'
    + '.qb-mdrawer{position:fixed;top:0;left:0;bottom:0;z-index:99992;width:86vw;max-width:340px;background:#fff;'
    +   'transform:translateX(-102%);transition:transform .28s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;'
    +   'box-shadow:0 0 40px rgba(0,0,0,.2);font-family:Poppins,sans-serif}'
    + '.qb-menu-open .qb-mdrawer{transform:translateX(0)}'
    + '.qb-menu-open .qb-mdrawer-back{opacity:1;pointer-events:auto}'
    + '.qb-mdrawer-top{display:flex;align-items:center;justify-content:space-between;padding:18px 20px;border-bottom:1px solid rgb(240,240,240)}'
    + '.qb-mdrawer-top img{height:30px}'
    + '.qb-mdrawer-x{width:34px;height:34px;border-radius:50%;border:1px solid rgb(237,237,237);background:#fff;cursor:pointer;font-size:16px;color:#555;display:flex;align-items:center;justify-content:center}'
    + '.qb-mdrawer-hd{padding:14px 20px 6px;font:600 12px Poppins;letter-spacing:.08em;text-transform:uppercase;color:#aaa}'
    + '.qb-mnav{flex:1;overflow-y:auto;padding:6px 12px 12px}'
    + '.qb-mnav a{display:flex;align-items:center;gap:14px;padding:13px 14px;border-radius:12px;color:#333;'
    +   'text-decoration:none;font:500 15px Poppins;margin-bottom:2px}'
    + '.qb-mnav a .ic{display:flex;flex:0 0 auto}'
    + '.qb-mnav a .lbl{flex:1}'
    + '.qb-mnav a .chev{color:#c8c8c8}'
    + '.qb-mnav a:hover{background:rgb(250,250,250)}'
    + '.qb-mnav a.is-active{background:' + ORANGE + ';color:#fff}'
    + '.qb-mnav a.is-active .chev{color:rgba(255,255,255,.8)}'
    + '.qb-mnav a.logout{color:' + ORANGE + '}'
    + '.qb-mdrawer-ft{padding:14px 20px 22px;border-top:1px solid rgb(240,240,240)}'
    + '.qb-mdrawer-ft a{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:14px;'
    +   'border-radius:12px;background:' + ORANGE + ';color:#fff;text-decoration:none;font:600 15px Poppins}'
    + '@media (max-width:760px){ .qb-burger{display:flex} .qb-hcluster{display:none !important} }'
    + '@media (min-width:761px){ .qb-menu-open .qb-mdrawer{transform:translateX(-102%)} .qb-menu-open .qb-mdrawer-back{opacity:0;pointer-events:none} }'
    + '@media (max-width:600px){'
    +   'footer .qb-fcols{flex-direction:column !important;gap:0 !important;flex-wrap:nowrap !important}'
    +   'footer .qb-facc{flex:1 1 100% !important;width:100% !important;border-bottom:1px solid rgba(0,0,0,.09)}'
    +   'footer .qb-facc:first-of-type{border-top:1px solid rgba(0,0,0,.09)}'
    +   'footer .qb-facc > h3{display:flex !important;align-items:center;justify-content:space-between;cursor:pointer;'
    +     'margin:0 !important;padding:16px 2px !important;font-size:16px !important;font-weight:600 !important}'
    +   'footer .qb-facc > h3::after{content:"";width:8px;height:8px;border-right:2px solid #aaa;'
    +     'border-bottom:2px solid #aaa;transform:rotate(45deg);transition:transform .2s;margin:0 6px 5px 0}'
    +   'footer .qb-facc.qb-open > h3::after{transform:rotate(-135deg);margin:5px 6px 0 0}'
    +   'footer .qb-facc > .qb-flinks{overflow:hidden;max-height:0;transition:max-height .28s ease}'
    +   'footer .qb-facc.qb-open > .qb-flinks{max-height:640px;padding-bottom:14px}'
    /* footer stretches edge-to-edge; the copyright bar centres/stacks instead of
       splitting awkwardly across a narrow row. */
    +   'footer > div{max-width:100% !important;padding-left:20px !important;padding-right:20px !important}'
    +   'footer [style*="border-top: 1px solid rgb(212, 212, 212)"]{flex-direction:column !important;'
    +     'align-items:center !important;text-align:center;gap:12px !important;justify-content:center !important}'
    + '}'
    /* ---- Category listings filter -> slide-up bottom sheet on mobile ---- */
    + '.qb-sheet-hd{display:none}.qb-sheet-apply{display:none}'
    + '@media (max-width:600px){'
    +   'body.qb-sheet-open{overflow:hidden}'
    +   'aside.qb-filter-aside{position:fixed !important;left:0 !important;right:0 !important;bottom:0 !important;top:auto !important;'
    +     'width:100% !important;max-width:100% !important;min-width:0 !important;margin:0 !important;z-index:99992;'
    +     'max-height:86vh;overflow-y:auto;border-radius:22px 22px 0 0 !important;transform:translateY(103%);'
    +     'transition:transform .34s cubic-bezier(.4,0,.2,1);box-shadow:0 -10px 44px rgba(0,0,0,.22) !important}'
    +   '.qb-sheet-open aside.qb-filter-aside{transform:translateY(0)}'
    +   '.qb-sheet-hd{display:block;position:sticky;top:0;background:#fff;padding:4px 0 12px;z-index:3;margin:-8px 0 4px}'
    +   '.qb-sheet-grabbar{width:44px;height:5px;border-radius:3px;background:rgb(224,224,224);margin:2px auto 14px}'
    +   '.qb-sheet-hrow{display:flex;align-items:center;justify-content:space-between}'
    +   '.qb-sheet-hrow strong{font:600 19px Poppins;color:rgb(33,33,33)}'
    +   '.qb-sheet-x{width:34px;height:34px;border-radius:50%;border:1px solid rgb(237,237,237);background:#fff;cursor:pointer;'
    +     'font-size:19px;line-height:1;color:#555;display:flex;align-items:center;justify-content:center}'
    +   '.qb-sheet-back{position:fixed;inset:0;background:rgba(20,20,20,.45);z-index:99991;opacity:0;pointer-events:none;transition:opacity .25s}'
    +   '.qb-sheet-open .qb-sheet-back{opacity:1;pointer-events:auto}'
    +   '.qb-sheet-apply{display:block;position:sticky;bottom:0;margin:18px 0 -8px;width:100%;padding:15px;border:0;border-radius:12px;'
    +     'background:' + ORANGE + ';color:#fff;font:600 15px Poppins;cursor:pointer}'
    +   '.qb-filter-btn{display:inline-flex !important;align-items:center;gap:8px;padding:10px 18px !important;'
    +     'border:1px solid rgb(237,237,237) !important;border-radius:10px !important;background:#fff !important;'
    +     'color:rgb(51,51,51) !important;font-weight:600 !important;box-shadow:0 2px 8px rgba(0,0,0,.05);white-space:nowrap}'
    + '}';
  var st = document.createElement('style'); st.textContent = CSS;
  (document.head || document.documentElement).appendChild(st);

  var LOGO = ''; // captured from the page header once available
  function currentFile() { var f = location.pathname.split('/').pop(); return f || 'index.html'; }

  function setOpen(open) {
    window.__qbMenuOpen = open;
    document.documentElement.classList.toggle('qb-menu-open', open);
  }

  function build() {
    if (document.getElementById('qb-burger')) return;
    var burger = document.createElement('button');
    burger.id = 'qb-burger'; burger.className = 'qb-burger'; burger.setAttribute('aria-label', 'Menu');
    burger.innerHTML = '<span></span>';
    burger.addEventListener('click', function () { setOpen(true); });

    var bell = document.createElement('a');
    bell.id = 'qb-mbell'; bell.className = 'qb-mbell'; bell.href = 'notifications.html'; bell.setAttribute('aria-label', 'Notifications');
    bell.innerHTML = '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">' + I.bell + '</svg><span class="dot"></span>';

    // globe -> language picker (matches Figma mobile header)
    var LANGS = [['English', '🇬🇧'], ['Arabic', '🇸🇦'], ['India', '🇮🇳'], ['Urdu', '🇵🇰'], ['Bengali', '🇧🇩'], ['Tagalog', '🇵🇭'], ['Persian (Farsi)', '🇮🇷'], ['Tamil', '🇮🇳']];
    var globe = document.createElement('button');
    globe.id = 'qb-mglobe'; globe.className = 'qb-mglobe'; globe.setAttribute('aria-label', 'Language');
    globe.innerHTML = '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>';
    var pop = document.createElement('div'); pop.className = 'qb-langpop';
    pop.innerHTML = '<h4>Choose your language</h4>' + LANGS.map(function (l, i) {
      return '<button data-lang="' + l[0] + '"' + (i === 0 ? ' class="on"' : '') + '><span class="flag">' + l[1] + '</span>' + l[0] + '</button>';
    }).join('');
    globe.addEventListener('click', function (e) { e.stopPropagation(); pop.classList.toggle('open'); });
    pop.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-lang]'); if (!b) return;
      pop.querySelectorAll('button').forEach(function (x) { x.classList.remove('on'); });
      b.classList.add('on'); pop.classList.remove('open');
    });
    document.addEventListener('click', function () { pop.classList.remove('open'); });

    var back = document.createElement('div'); back.className = 'qb-mdrawer-back';
    back.addEventListener('click', function () { setOpen(false); });

    var cur = currentFile();
    var links = ITEMS.map(function (it) {
      var active = it[1] === cur ? ' is-active' : '';
      var lo = it[0] === 'Log Out' ? ' logout' : '';
      return '<a class="' + (active || lo) + '" href="' + it[1] + '">'
        + '<span class="ic"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">' + it[2] + '</svg></span>'
        + '<span class="lbl">' + it[0] + '</span><span class="chev">&rsaquo;</span></a>';
    }).join('');

    var drawer = document.createElement('nav'); drawer.className = 'qb-mdrawer';
    drawer.innerHTML =
      '<div class="qb-mdrawer-top">' + (LOGO || '<strong style="font:700 18px Poppins">Q BAZAAR</strong>')
      + '<button class="qb-mdrawer-x" aria-label="Close">&times;</button></div>'
      + '<div class="qb-mdrawer-hd">Menu</div>'
      + '<div class="qb-mnav">' + links + '</div>'
      + '<div class="qb-mdrawer-ft"><a href="add-ads.html">＋ Add Ads</a></div>';
    drawer.querySelector('.qb-mdrawer-x').addEventListener('click', function () { setOpen(false); });

    document.body.appendChild(back);
    document.body.appendChild(drawer);
    document.body.appendChild(pop);
    document.body.appendChild(globe);
    document.body.appendChild(bell);
    document.body.appendChild(burger);
    if (window.__qbMenuOpen) setOpen(true);
  }

  function tagCluster() {
    var header = document.querySelector('header');
    if (!header) return;
    if (!LOGO) { var img = header.querySelector('img'); if (img) LOGO = '<img src="' + img.getAttribute('src') + '" alt="Q Bazaar">'; }
    // the icon/button cluster = header inner row's 2nd child (Add Ads + nav icons)
    var inner = header.children[0];
    if (inner && inner.children[1]) inner.children[1].classList.add('qb-hcluster');
  }

  // Turn the footer's link columns into tap-to-expand accordions on mobile.
  function footerAcc() {
    var footer = document.querySelector('footer');
    if (!footer) return;
    var heads = footer.querySelectorAll('h3');
    for (var i = 0; i < heads.length; i++) {
      var h = heads[i];
      if (h.__facc) continue;
      var links = h.nextElementSibling;
      var col = h.parentElement;
      if (!links || links.tagName !== 'DIV' || !col) continue;
      h.__facc = true;
      col.classList.add('qb-facc');
      if (col.parentElement) col.parentElement.classList.add('qb-fcols');
      links.classList.add('qb-flinks');
      (function (col) {
        h.addEventListener('click', function () {
          if (window.matchMedia('(max-width: 600px)').matches) col.classList.toggle('qb-open');
        });
      })(col);
    }
  }

  var FUNNEL = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="flex:0 0 auto"><path d="M3 5h18l-7 8v5l-4 2v-7z"/></svg>';

  function openSheet() { document.body.classList.add('qb-sheet-open'); }
  function closeSheet() { document.body.classList.remove('qb-sheet-open'); }

  // On a phone the filter sidebar becomes a slide-up bottom sheet opened by the
  // (previously inert) "Filter" button; on desktop it stays the inline sidebar.
  function filterSheet() {
    var asides = document.querySelectorAll('aside');
    var aside = null;
    for (var a = 0; a < asides.length; a++) {
      if (/min-width:\s*260px/.test(asides[a].getAttribute('style') || '')) { aside = asides[a]; break; }
    }
    // find the listings-header "Filter" button (span whose row is space-between)
    var fbtn = null, nodes = document.querySelectorAll('header ~ * span, main span, section span, span');
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      if (n.children.length === 0 && n.textContent.trim() === 'Filter') {
        var p = n.parentElement;
        if (p && /space-between/.test(p.getAttribute('style') || '')) { fbtn = n; break; }
        if (!fbtn) fbtn = n;
      }
    }
    if (!aside || !fbtn) return;

    aside.classList.add('qb-filter-aside');
    if (!aside.querySelector('.qb-sheet-hd')) {
      var hd = document.createElement('div');
      hd.className = 'qb-sheet-hd';
      hd.innerHTML = '<div class="qb-sheet-grabbar"></div><div class="qb-sheet-hrow"><strong>Filters</strong>'
        + '<button class="qb-sheet-x" aria-label="Close">&times;</button></div>';
      aside.insertBefore(hd, aside.firstChild);
      hd.querySelector('.qb-sheet-x').addEventListener('click', closeSheet);
    }
    if (!aside.querySelector('.qb-sheet-apply')) {
      var ap = document.createElement('button');
      ap.className = 'qb-sheet-apply'; ap.type = 'button'; ap.textContent = 'Show Results';
      ap.addEventListener('click', closeSheet);
      aside.appendChild(ap);
    }
    if (!document.querySelector('.qb-sheet-back')) {
      var back = document.createElement('div');
      back.className = 'qb-sheet-back';
      back.addEventListener('click', closeSheet);
      document.body.appendChild(back);
    }
    if (!fbtn.__sheetWired) {
      fbtn.__sheetWired = true;
      fbtn.classList.add('qb-filter-btn');
      if (fbtn.textContent.trim() === 'Filter') fbtn.innerHTML = FUNNEL + '<span>Filter</span>';
      fbtn.addEventListener('click', function (e) {
        if (window.matchMedia('(max-width: 600px)').matches) { e.stopPropagation(); openSheet(); }
      });
    }
  }

  function apply() { tagCluster(); build(); footerAcc(); filterSheet(); }

  function start() {
    apply();
    new MutationObserver(function () { apply(); }).observe(document.body, { childList: true, subtree: true });
    [200, 600, 1200].forEach(function (t) { setTimeout(apply, t); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
