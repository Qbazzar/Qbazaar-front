/* Q Bazaar — settings hub, phone design layer (Figma 613:28184).
   The phone hub shows the user's identity (avatar + name + email) above
   the menu, chevrons on every row, and no selected-row tint — selection
   only exists once a panel is open. Add-only + classes: engine-safe. */
(function () {
  if ((window.__QB_SCREEN || '') !== 'account') return;

  var CSS = ''
    + '.qb-acct-id{display:none;align-items:center;gap:14px;padding:6px 4px 18px;'
    +   'border-bottom:1px solid rgb(240,240,240);margin-bottom:12px;font-family:Poppins,sans-serif}'
    + '.qb-acct-id .fa{width:56px;height:56px;border-radius:50%;background:rgb(238,238,238);'
    +   'display:flex;align-items:center;justify-content:center;font:600 18px Poppins;color:rgb(75,75,75);flex-shrink:0}'
    + '.qb-acct-id .nm{font:600 17px Poppins;color:rgb(33,33,33)}'
    + '.qb-acct-id .em{font:400 13px Poppins;color:rgb(158,158,158);margin-top:2px}'
    + '@media (max-width:600px){'
    +   'body:not(.qb-acct-open) .qb-acct-id{display:flex}'
    /* hub rows: chevron affordance, no active tint (the design hub is plain) */
    +   'html[data-screen="account"] body:not(.qb-acct-open) .qb-navitem{position:relative}'
    +   'html[data-screen="account"] body:not(.qb-acct-open) .qb-navitem::after{'
    +     'content:"\\203A";margin-left:auto;color:rgb(187,187,187);font:400 20px Poppins;line-height:1}'
    +   'html[data-screen="account"] body:not(.qb-acct-open) .qb-navitem-active{'
    +     'background:transparent !important;font-weight:400 !important}'
    +   'html[data-screen="account"] body:not(.qb-acct-open) .qb-navitem-active,'
    +   'html[data-screen="account"] body:not(.qb-acct-open) .qb-navitem-active *{'
    +     'color:rgb(33,33,33) !important}'
    + '}';
  var st = document.createElement('style'); st.textContent = CSS;
  (document.head || document.documentElement).appendChild(st);

  function inject() {
    var nav = document.querySelector('[style*="flex: 1 1 260px"][style*="max-width: 320px"]');
    if (!nav || nav.querySelector('.qb-acct-id')) return;
    var card = nav.querySelector('.qb-navitem') ? nav.querySelector('.qb-navitem').parentElement : nav;
    var id = document.createElement('div');
    id.className = 'qb-acct-id';
    id.innerHTML = '<span class="fa">FA</span><span><span class="nm">Farah Alzinati</span>'
      + '<span class="em" style="display:block">farahelzinati@gmail.com</span></span>';
    card.insertBefore(id, card.firstChild);
  }

  inject();
  new MutationObserver(inject).observe(document.documentElement, { childList: true, subtree: true });
})();
