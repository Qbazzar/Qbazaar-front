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
    ['Wallet', 'account.html', I.wallet], ['Log Out', 'login.html', I.out]
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
    + '@media (max-width:1000px){'
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
    /* ---- Category listings filter -> slide-up bottom sheet on mobile ----
       The sidebar is styled purely by attribute selector (no class injected into
       the engine-managed DOM). The backdrop + "Show Results" bar live on <body>
       and are created once. `qb-sheet-ready` gates the fixed positioning so the
       filters stay inline (usable) if the script never runs. */
    + '.qb-sheet-back,.qb-sheet-apply{display:none}'
    + '@media (max-width:1000px){'
    +   'body.qb-sheet-ready aside[style*="min-width: 260px"]{position:fixed !important;left:0 !important;right:0 !important;'
    +     'bottom:0 !important;top:auto !important;width:100% !important;max-width:100% !important;min-width:0 !important;'
    +     'margin:0 !important;z-index:99992;max-height:86vh;overflow-y:auto;border-radius:22px 22px 0 0 !important;'
    +     'transform:translateY(106%);transition:transform .34s cubic-bezier(.4,0,.2,1);box-shadow:0 -10px 44px rgba(0,0,0,.22) !important}'
    +   'body.qb-sheet-ready.qb-sheet-open{overflow:hidden}'
    +   'body.qb-sheet-ready.qb-sheet-open aside[style*="min-width: 260px"]{transform:translateY(0);padding-bottom:80px !important}'
    +   '.qb-sheet-back{display:block;position:fixed;inset:0;background:rgba(20,20,20,.45);z-index:99991;opacity:0;'
    +     'pointer-events:none;transition:opacity .25s}'
    +   '.qb-sheet-open .qb-sheet-back{opacity:1;pointer-events:auto}'
    +   '.qb-sheet-apply{display:none;position:fixed;left:0;right:0;bottom:0;z-index:99994;margin:0;padding:16px;border:0;'
    +     'background:' + ORANGE + ';color:#fff;font:600 15px Poppins;cursor:pointer}'
    +   '.qb-sheet-open .qb-sheet-apply{display:block}'
    +   '.qb-filter-btn{display:inline-flex !important;align-items:center;gap:8px;padding:10px 18px !important;'
    +     'border:1px solid rgb(237,237,237) !important;border-radius:10px !important;background:#fff !important;'
    +     'color:rgb(51,51,51) !important;font-weight:600 !important;box-shadow:0 2px 8px rgba(0,0,0,.05);white-space:nowrap}'
    + '}'
    /* ---- Messages: two-step list -> chat navigation at compact widths ----
       (Figma tablet/mobile show the inbox alone; the conversation is its own
       screen with a back affordance.) */
    + '.qb-chat-back{display:none}'
    + '@media (max-width:1000px){'
    +   '.qb-mlist{flex:1 1 100% !important;min-width:0 !important;border-right:none !important}'
    +   '.qb-mchat{display:none !important}'
    +   'body.qb-chat-open .qb-mlist{display:none !important}'
    +   'body.qb-chat-open .qb-mchat{display:flex !important;flex:1 1 100% !important;min-width:0 !important}'
    +   'body.qb-chat-open .qb-chat-back{display:inline-flex;align-items:center;gap:8px;margin:14px 16px 0;'
    +     'padding:8px 14px;border:1px solid rgb(237,237,237);border-radius:10px;background:#fff;'
    +     'font:600 13px Poppins;color:rgb(51,51,51);cursor:pointer;align-self:flex-start}'
    + '}';
  var st = document.createElement('style'); st.textContent = CSS;
  (document.head || document.documentElement).appendChild(st);

  /* expose the current screen to CSS so responsive.css can scope per-page rules */
  document.documentElement.setAttribute('data-screen', (window.__QB_SCREEN || 'home'));

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
          if (window.matchMedia('(max-width: 1000px)').matches) col.classList.toggle('qb-open');
        });
      })(col);
    }
  }

  var FUNNEL = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="flex:0 0 auto"><path d="M3 5h18l-7 8v5l-4 2v-7z"/></svg>';

  function openSheet() { document.body.classList.add('qb-sheet-open'); }
  function closeSheet() { document.body.classList.remove('qb-sheet-open'); }
  function isPhone() { return window.matchMedia('(max-width: 1000px)').matches; }

  // One-time wiring for the mobile filter sheet. Deliberately touches ONLY <body>
  // (never the engine-managed sidebar), so it can't fight the engine's re-renders
  // and trigger an observe -> re-render -> observe freeze. The sidebar itself is
  // turned into a sheet purely by CSS attribute selector.
  var sheetReady = false;
  function setupSheet() {
    if (sheetReady) return;
    sheetReady = true;
    var back = document.createElement('div');
    back.className = 'qb-sheet-back';
    back.addEventListener('click', closeSheet);
    var apply2 = document.createElement('button');
    apply2.type = 'button'; apply2.className = 'qb-sheet-apply'; apply2.textContent = 'Show Results';
    apply2.addEventListener('click', closeSheet);
    document.body.appendChild(back);
    document.body.appendChild(apply2);
    // Open when the (otherwise inert) "Filter" button is tapped — via delegation,
    // so no per-element wiring and nothing to re-attach after a re-render.
    document.addEventListener('click', function (e) {
      if (!isPhone()) return;
      var el = e.target;
      for (var i = 0; i < 3 && el; i++) {
        if (el.nodeType === 1) {
          if (el.classList && el.classList.contains('qb-filter-btn')) { openSheet(); return; }
          if (el.children.length === 0 && (el.textContent || '').trim() === 'Filter') {
            var p = el.parentElement;
            if (p && /space-between/.test(p.getAttribute('style') || '')) { openSheet(); return; }
          }
        }
        el = el.parentElement;
      }
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSheet(); });
    document.body.classList.add('qb-sheet-ready');
    // Messages: tapping a conversation in the inbox opens the chat pane
    document.addEventListener('click', function (e) {
      if (!isPhone()) return;
      var list = e.target.closest && e.target.closest('.qb-mlist');
      if (!list || e.target.tagName === 'INPUT') return;
      document.body.classList.add('qb-chat-open');
    });
  }

  // Cosmetic only: give the "Filter" button a pill + funnel icon on phones.
  // Runs on a few timers (never inside the observer), so it can't loop.
  function markFilterBtn() {
    if (!isPhone()) return;
    var spans = document.querySelectorAll('span, button');
    for (var i = 0; i < spans.length; i++) {
      var n = spans[i];
      if (n.children.length === 0 && (n.textContent || '').trim() === 'Filter') {
        var p = n.parentElement;
        if (p && /space-between/.test(p.getAttribute('style') || '')) {
          if (!n.classList.contains('qb-filter-btn')) { n.classList.add('qb-filter-btn'); n.innerHTML = FUNNEL + '<span>Filter</span>'; }
          return;
        }
      }
    }
  }

  // Listing pages: at compact widths the sidebar is a bottom sheet, so the
  // toolbar needs a real "Filter" trigger (design 539:35503 shows the pill).
  function ensureFilterTrigger() {
    var ex = document.querySelector('.qb-filter-inject');
    if (!isPhone()) { if (ex && ex.parentNode) ex.parentNode.removeChild(ex); return; }
    if (ex) return;
    var aside = document.querySelector('aside[style*="min-width: 260px"]');
    if (!aside) return;
    var leaves = document.querySelectorAll('div, span, button');
    for (var i = 0; i < leaves.length; i++) {
      var n = leaves[i];
      if (n.children.length <= 1 && /^Newest\b/.test((n.textContent || '').trim())) {
        var row = n.parentElement;
        if (!row) return;
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'qb-filter-btn qb-filter-inject';
        b.innerHTML = FUNNEL + '<span>Filter</span>';
        row.insertBefore(b, row.firstChild);
        return;
      }
    }
  }

  // Messages page: tag the inbox / conversation panes so the compact-width
  // CSS can swap between them (two-step navigation like the Figma frames).
  function tagMessages() {
    if ((window.__QB_SCREEN || '') !== 'messages') return;
    var inp = document.querySelector('input[placeholder*="Type your message"]');
    if (!inp) return;
    var chat = inp;
    while (chat && chat.parentElement) {
      var sib = null, par = chat.parentElement;
      for (var i = 0; i < par.children.length; i++) {
        var c = par.children[i];
        if (c !== chat && /border-right/.test(c.getAttribute('style') || '')) sib = c;
      }
      if (sib) {
        if (!chat.classList.contains('qb-mchat')) {
          chat.classList.add('qb-mchat');
          sib.classList.add('qb-mlist');
          var back = document.createElement('button');
          back.type = 'button'; back.className = 'qb-chat-back';
          back.innerHTML = '&#8249;&nbsp; Messages';
          back.addEventListener('click', function () { document.body.classList.remove('qb-chat-open'); });
          chat.insertBefore(back, chat.firstChild);
        }
        return;
      }
      chat = par;
    }
  }

  // Logged-out header (Figma 741:38067 "Home Page - Before Log/Sign"):
  // until the auth flow is completed (localStorage.qbAuth), the avatar is
  // replaced by Login / Sign Up buttons that open the auth pages.
  function guestHeader() {
    var authed = localStorage.getItem('qbAuth') === '1';
    var fa = null;
    var els = document.querySelectorAll('.qb-hcluster *');
    for (var i = 0; i < els.length; i++) {
      if (els[i].childElementCount === 0 && (els[i].textContent || '').trim() === 'FA') { fa = els[i]; break; }
    }
    if (!fa) return;
    var avatar = fa.parentElement;
    var host = avatar.parentElement;
    var btns = host.querySelector('.qb-guest-btns');
    if (authed) {
      avatar.style.display = '';
      if (btns) btns.remove();
      return;
    }
    avatar.style.display = 'none';
    if (btns) return;
    btns = document.createElement('span');
    btns.className = 'qb-guest-btns';
    btns.setAttribute('style', 'display:inline-flex;gap:10px;align-items:center;margin-left:4px');
    btns.innerHTML = ''
      + '<a href="login.html" style="font:600 14px Poppins;color:rgb(51,51,51);text-decoration:none;'
      +   'padding:10px 18px;border:1px solid rgb(237,237,237);border-radius:10px;background:#fff">Login</a>'
      + '<a href="signup.html" style="font:600 14px Poppins;color:#fff;text-decoration:none;'
      +   'padding:10px 18px;border-radius:10px;background:rgb(243,128,87)">Sign Up</a>';
    host.insertBefore(btns, avatar);
  }
  // completing the last auth step signs in; Log Out signs out
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest && e.target.closest('a[href="login.html"]');
    if (a && /Log Out/.test(a.textContent || '')) localStorage.removeItem('qbAuth');
  }, true);

  // Seller pages hero (Figma 145:1063 / 136:1562): photo cover banner,
  // circular avatar overlapping it, and the Ads/Followers/Today stats row.
  function sellerHero() {
    if (!/^seller(Ind|Org)?$/.test(window.__QB_SCREEN || '')) return;
    if (document.querySelector('.qb-scover')) return;
    // profile bar = element containing the Follow button and the seller name
    var follow = [].find.call(document.querySelectorAll('*'), function (e) {
      return e.childElementCount <= 1 && /^Follow$/.test((e.textContent || '').trim());
    });
    if (!follow) return;
    var bar = follow.parentElement;
    while (bar && !/rgb\(255,\s*255,\s*255\)/.test(bar.getAttribute('style') || '')) bar = bar.parentElement;
    if (!bar) return;
    var name = (bar.textContent || '').trim().split(/\s/)[0] || 'BT';
    var caps = name.match(/[A-Z]/g) || [];
    var initials = (caps.length >= 2 ? caps.slice(0, 2).join('') : name.replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase()) || 'BT';
    // reuse one of the page's own card photos for the cover
    var cover = '';
    var ph = [].find.call(document.querySelectorAll('.qb-ph'), function (e) {
      return /url\(/.test((e.getAttribute('style') || '') + getComputedStyle(e).backgroundImage);
    });
    if (ph) { var m = /url\(["']?([^"')]+)/.exec(getComputedStyle(ph).backgroundImage); if (m) cover = m[1]; }
    var cv = document.createElement('div');
    cv.className = 'qb-scover';
    cv.setAttribute('style', 'height:190px;border-radius:16px 16px 0 0;margin:0;'
      + (cover ? 'background:url(' + JSON.stringify(cover) + ') center/cover no-repeat;' : 'background:linear-gradient(100deg,rgb(255,240,234),rgb(250,224,212));'));
    bar.parentElement.insertBefore(cv, bar);
    bar.parentElement.style.marginTop = '-170px'; // swallow the engine's empty gray band
    // avatar + stats inside the bar
    var av = document.createElement('div');
    av.className = 'qb-savatar';
    av.setAttribute('style', 'width:96px;height:96px;border-radius:50%;background:#fff;border:4px solid #fff;'
      + 'box-shadow:0 4px 25px rgba(188,188,188,.3);display:flex;align-items:center;justify-content:center;'
      + 'font:600 26px Poppins;color:rgb(120,120,120);margin-top:-64px;flex:0 0 auto');
    av.textContent = initials;
    bar.insertBefore(av, bar.firstChild);
    bar.style.alignItems = 'center';
    bar.style.gap = '18px';
    var nameEl = [].find.call(bar.querySelectorAll('*'), function (e) {
      return e.childElementCount <= 1 && (e.textContent || '').trim() === name;
    });
    var host = nameEl ? nameEl.parentElement : null;
    if (host && !bar.querySelector('.qb-sstats')) {
      var stats = document.createElement('div');
      stats.className = 'qb-sstats';
      stats.setAttribute('style', 'font:400 15px Poppins;color:rgb(161,159,159);margin-top:5px');
      stats.innerHTML = '8,429 <span style="color:#bdbdbd">Ads</span> &nbsp;•&nbsp; 7,429 Followers &nbsp;•&nbsp; <span style="color:rgb(61,190,100);font-weight:500">+2K Today</span>';
      host.parentElement.insertBefore(stats, host.nextSibling);
    }
  }

  // Home hero "Find Places Around Your Location": the design sets the word
  // "Location" in Story Script 64px orange (rest Poppins SemiBold 56).
  function locationWord() {
    var els = document.querySelectorAll('span, div, i, em, b');
    for (var i = 0; i < els.length; i++) {
      var e = els[i];
      if (e.dataset.qbStory || e.childElementCount !== 0) continue;
      if ((e.textContent || '').trim() !== 'Location') continue;
      var fs = parseFloat(getComputedStyle(e).fontSize);
      if (fs < 36) continue; // only the big hero word
      e.dataset.qbStory = '1';
      e.style.fontFamily = "'Story Script', cursive";
      e.style.fontSize = '64px';
      e.style.fontStyle = 'normal';
      e.style.fontWeight = '400';
      e.style.color = 'rgb(243,128,87)';
    }
  }

  // Chat "..." menu: the engine uses emoji glyphs; the design uses vuesax
  // line icons. Swap them (stroke:currentColor keeps Block User red).
  var CHATICONS = {
    'View Ad': '<circle cx="12" cy="12" r="3"/><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/>',
    'Report User': '<path d="M5 21V4"/><path d="M5 4c4-2.5 8 2.5 14 .5V15c-6 2-10-3-14-.5"/>',
    'Delete Conversation': '<path d="M4 6h16M9 6V4h6v2M6 6l1 14h10l1-14"/><path d="M10 10v6M14 10v6"/>',
    'Block User': '<circle cx="12" cy="12" r="9"/><path d="M5.7 5.7l12.6 12.6"/>'
  };
  function chatMenuIcons() {
    if ((window.__QB_SCREEN || '') !== 'messages') return;
    var els = document.querySelectorAll('div, span, button, a');
    for (var i = 0; i < els.length; i++) {
      var e = els[i];
      if (e.children.length !== 0 || e.dataset.qbCmi) continue; // text leaves only
      if (e.closest && e.closest('[data-qb-cmi]')) continue;    // never re-swap our own span
      var t = (e.textContent || '').trim();
      if (t.length < 6 || t.length > 26) continue;
      var m = /(View Ad|Report User|Delete Conversation|Block User)$/.exec(t);
      if (!m) continue;
      if (t === m[1]) continue; // already emoji-free (our span or clean label)
      e.dataset.qbCmi = '1';
      var label = m[1];
      e.textContent = '';
      e.style.display = 'flex'; e.style.alignItems = 'center'; e.style.gap = '10px';
      e.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
        + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" style="flex:0 0 auto">'
        + CHATICONS[label] + '</svg><span>' + label + '</span>';
    }
  }

  function apply() { tagCluster(); build(); footerAcc(); ensureFilterTrigger(); tagMessages(); guestHeader(); sellerHero(); locationWord(); chatMenuIcons(); }

  function start() {
    apply();
    setupSheet();
    new MutationObserver(function () { apply(); }).observe(document.body, { childList: true, subtree: true });
    [200, 600, 1200].forEach(function (t) { setTimeout(apply, t); });
    [350, 1000, 2000].forEach(function (t) { setTimeout(markFilterBtn, t); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
