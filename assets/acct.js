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
    /* hub sheet is FULL-BLEED white on phones (613:28184): no card chrome */
    +   'html[data-screen="account"] body:not(.qb-acct-open) [style*="flex: 1 1 260px"][style*="max-width: 320px"]{'
    +     'max-width:none !important;width:calc(100% + 32px) !important;margin:0 -16px !important;'
    +     'border:0 !important;border-radius:0 !important;box-shadow:none !important;'
    +     'background:#fff !important;padding:22px 24px 28px !important}'
    /* rows: 16px/500, 56px pitch, chevron at the right edge, no active tint */
    +   'html[data-screen="account"] body:not(.qb-acct-open) .qb-navitem{'
    +     'position:relative;padding:16px 2px !important;font-size:16px !important;font-weight:500 !important}'
    +   'html[data-screen="account"] body:not(.qb-acct-open) .qb-navitem svg{width:22px;height:22px}'
    +   'html[data-screen="account"] body:not(.qb-acct-open) .qb-navitem::after{'
    +     'content:"\\203A";margin-left:auto;color:rgb(187,187,187);font:400 20px Poppins;line-height:1}'
    +   'html[data-screen="account"] body:not(.qb-acct-open) .qb-navitem-active{'
    +     'background:transparent !important}'
    +   'html[data-screen="account"] body:not(.qb-acct-open) .qb-navitem-active,'
    +   'html[data-screen="account"] body:not(.qb-acct-open) .qb-navitem-active *{'
    +     'color:rgb(33,33,33) !important}'
    /* the design's phone hub has no Log Out row (it lives in the drawer) */
    +   'html[data-screen="account"] body:not(.qb-acct-open) .qb-logout-box{display:none !important}'
    +   'html[data-screen="account"] body:not(.qb-acct-open) .qb-acct-id .nm{font-size:20px}'
    +   'html[data-screen="account"] body:not(.qb-acct-open) .qb-acct-id .em{font-size:14px}'
    + '}';
  var st = document.createElement('style'); st.textContent = CSS;
  (document.head || document.documentElement).appendChild(st);

  function inject() {
    var nav = document.querySelector('[style*="flex: 1 1 260px"][style*="max-width: 320px"]');
    if (!nav) return;
    // tag the Log Out group so the phone hub can hide it (class add = engine-safe)
    for (var i = 0; i < nav.children.length; i++) {
      if ((nav.children[i].textContent || '').trim() === 'Log Out') {
        nav.children[i].classList.add('qb-logout-box');
        break;
      }
    }
    if (nav.querySelector('.qb-acct-id')) return;
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
