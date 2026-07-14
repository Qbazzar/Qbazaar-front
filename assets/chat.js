/* Q Bazaar — messages scenario layer (Figma 604:33590..604:35815).
   Adds what the engine markup lacks: real avatar photos in the inbox,
   the chat header "⋯" menu (Setting / Report / Block), the Block User
   confirmation modal, the Report reason sheet, and the design's mint
   toasts. Engine-safe: only ADDS nodes / classes, portals overlays to
   <body>, and re-applies decorations through a MutationObserver. */
(function () {
  if ((window.__QB_SCREEN || '') !== 'messages') return;
  var ORANGE = 'rgb(243,128,87)';

  var CSS = ''
    /* ---- inbox rows: 44px photo avatars with presence dot (604:33590) --- */
    + '.qb-av{width:44px !important;height:44px !important;border-radius:50% !important;'
    +   'background-size:cover !important;background-position:center !important;'
    +   'margin-top:0 !important;position:relative;flex-shrink:0}'
    + '.qb-av-edward{background-image:url("images/e09d5e8b9c8395d2b34c6222f4461602662a89fc") !important}'
    + '.qb-av-jaden{background-image:url("images/0bccb2028ab053b71f5a901962376a5c9f34d735") !important}'
    + '.qb-av-chris{background:rgb(255,240,234) !important;border:1.5px solid rgb(255,203,183) !important;'
    +   'display:flex !important;align-items:center;justify-content:center}'
    + '.qb-av .qb-presence{position:absolute;left:0;bottom:1px;width:11px;height:11px;'
    +   'border-radius:50%;background:rgb(61,190,100);border:2px solid #fff}'
    + '.qb-hidebadge{display:none !important}'
    /* phone inbox: the design has no selected-row tint in list mode */
    + '@media (max-width:1000px){'
    +   'html[data-screen="messages"] .qb-mlist [style*="cursor: pointer"][style*="margin-bottom: 6px"]{'
    +     'background:#fff !important;border-color:transparent !important}'
    /* chat header 604:33673: plain back arrow + thumb + 18px title */
    +   'body.qb-chat-open .qb-mchat{position:relative}'
    +   'body.qb-chat-open .qb-chat-back{position:absolute;top:26px;left:10px;z-index:6;'
    +     'border:0 !important;background:transparent !important;padding:6px !important;'
    +     'margin:0 !important;font-size:0 !important;width:36px;height:36px;'
    +     'background:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23212121\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M19 12H5m6-7-7 7 7 7\'/%3E%3C/svg%3E") center/22px no-repeat !important}'
    +   '.qb-mchat h2[style*="font-size: 24px"]{font-size:18px !important}'
    +   '.qb-mchat [style*="justify-content: space-between"][style*="border-bottom"]{padding:18px 16px 18px 52px !important}'
    +   '.qb-chatthumb{display:block !important}'
    /* Safe Pay banner is left-aligned on the phone frame */
    +   '.qb-mchat [style*="rgb(255, 240, 234)"][style*="text-align: center"],'
    +   '.qb-mchat [style*="rgb(255, 240, 234)"][style*="text-align: center"] *{'
    +     'text-align:left !important;justify-content:flex-start}'
    + '}'
    + '.qb-chatthumb{display:none;width:44px;height:44px;border-radius:12px;flex-shrink:0;'
    +   'background:url("images/0e61e9a73417c33d21fe4954d2ed5396299705d5") center/cover;margin-right:12px}'
    /* ---- "⋯" dropdown (604:33852) ---- */
    + '.qb-msgmenu{position:fixed;z-index:99995;background:#fff;border-radius:14px;width:190px;'
    +   'box-shadow:0 12px 44px rgba(0,0,0,.16);padding:6px 0;font-family:Poppins,sans-serif;overflow:hidden}'
    + '.qb-msgmenu .hd{font:600 16px Poppins;color:rgb(33,33,33);padding:12px 18px;'
    +   'border-bottom:1px solid rgb(240,240,240)}'
    + '.qb-msgmenu button{display:flex;width:100%;align-items:center;justify-content:space-between;'
    +   'gap:10px;background:none;border:0;padding:13px 18px;font:400 15px Poppins;'
    +   'color:rgb(33,33,33);cursor:pointer}'
    + '.qb-msgmenu button:hover{background:rgb(250,250,250)}'
    + '.qb-msgmenu button.danger{color:rgb(224,74,74)}'
    /* ---- Block User? modal (604:33981) ---- */
    + '.qb-blk-back{position:fixed;inset:0;background:rgba(30,30,30,.45);z-index:99996;'
    +   'display:flex;align-items:center;justify-content:center}'
    + '.qb-blk{background:#fff;border-radius:20px;width:min(340px,88vw);padding:26px 22px 22px;'
    +   'text-align:center;font-family:Poppins,sans-serif;box-shadow:0 24px 64px rgba(0,0,0,.25)}'
    + '.qb-blk h3{font:700 20px Poppins;color:rgb(33,33,33);margin:0 0 10px}'
    + '.qb-blk p{font:400 14px Poppins;color:rgb(120,120,120);margin:0 0 20px;line-height:1.5}'
    + '.qb-blk .row{display:flex;gap:12px}'
    + '.qb-blk .row button{flex:1;border:0;border-radius:10px;padding:13px;font:600 14px Poppins;cursor:pointer}'
    + '.qb-blk .ok{background:' + ORANGE + ';color:#fff}'
    + '.qb-blk .ok:hover{background:rgb(233,108,63)}'
    + '.qb-blk .no{background:rgb(244,244,244);color:rgb(33,33,33)}'
    /* ---- Report sheet (604:34196): bottom sheet on phones, card on desktop */
    + '.qb-rep-back{position:fixed;inset:0;background:rgba(30,30,30,.45);z-index:99996;'
    +   'display:flex;align-items:center;justify-content:center}'
    + '.qb-rep{background:#fff;font-family:Poppins,sans-serif;width:min(430px,94vw);'
    +   'border-radius:20px;padding:24px 22px;max-height:86vh;overflow-y:auto}'
    + '@media (max-width:600px){'
    +   '.qb-rep-back{align-items:flex-end}'
    +   '.qb-rep{width:100%;max-width:none;border-radius:24px 24px 0 0;padding:24px 20px 28px}'
    + '}'
    + '.qb-rep h3{font:700 20px Poppins;color:rgb(33,33,33);margin:0 0 4px}'
    + '.qb-rep .sub{font:400 14px Poppins;color:rgb(158,158,158);margin:0 0 14px}'
    + '.qb-rep label{display:flex;align-items:center;justify-content:space-between;gap:12px;'
    +   'padding:12px 2px;font:400 15px Poppins;color:rgb(51,51,51);cursor:pointer}'
    + '.qb-rep input{appearance:none;width:20px;height:20px;border-radius:50%;'
    +   'border:1.5px solid rgb(203,203,203);margin:0;flex-shrink:0;cursor:pointer}'
    + '.qb-rep input:checked{border:5.5px solid ' + ORANGE + '}'
    + '.qb-rep .send{display:block;width:100%;margin-top:14px;background:' + ORANGE + ';color:#fff;'
    +   'border:0;border-radius:999px;padding:15px;font:600 15px Poppins;cursor:pointer}'
    + '.qb-rep .send:hover{background:rgb(233,108,63)}'
    /* ---- design toast (401:13703) — same recipe as the cropper's ---- */
    + '.qb-toast-design{position:fixed;top:92px;left:50%;transform:translateX(-50%);z-index:99997;'
    +   'background:rgb(234,255,247);color:rgb(7,189,116);border-radius:14px;min-height:62px;'
    +   'display:flex;align-items:center;gap:12px;padding:14px 44px;font:500 20px Poppins;'
    +   'max-width:min(574px,92vw);box-shadow:0 4px 40px rgba(161,161,161,.2)}'
    + '@media (max-width:600px){.qb-toast-design{top:84px;font-size:15px;min-height:52px;'
    +   'padding:12px 18px;width:92vw}}';
  var st = document.createElement('style'); st.textContent = CSS;
  (document.head || document.documentElement).appendChild(st);

  function toast(msg) {
    if (window.QBCropper && window.QBCropper.toast) return window.QBCropper.toast(msg);
    var t = document.createElement('div');
    t.className = 'qb-toast-design';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 3200);
  }

  /* current chat peer's first name (for the "blocked" toast, 604:34081) */
  function peerName() {
    var names = ['Edward Alesky', 'Jaden Murred', 'Jaden Murrad', 'Chris Offile', 'Chris Offlie'];
    var spans = document.querySelectorAll('.qb-mlist span');
    for (var i = 0; i < spans.length; i++) {
      var t = (spans[i].textContent || '').trim();
      if (names.indexOf(t) >= 0) return t.split(' ')[0];
    }
    return 'User';
  }

  /* ---------- inbox decoration (photos + presence + badge cleanup) ------- */
  var AVATARS = [
    [/^Edward /, 'qb-av-edward', true],
    [/^Jaden /, 'qb-av-jaden', true],
    [/^Chris /, 'qb-av-chris', false]
  ];
  var HEADSET = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgb(243,128,87)" stroke-width="1.8" stroke-linecap="round"><path d="M4 13v-2a8 8 0 0 1 16 0v2"/><path d="M4 13h2v5H5a1.5 1.5 0 0 1-1.5-1.5V13zm16 0h-2v5h1a1.5 1.5 0 0 0 1.5-1.5V13z"/><path d="M18 18v1a2 2 0 0 1-2 2h-3"/></svg>';

  function decorate() {
    var spans = document.querySelectorAll('span');
    for (var i = 0; i < spans.length; i++) {
      var s = spans[i];
      if (s.children.length !== 0) continue;
      var t = (s.textContent || '').trim();
      for (var a = 0; a < AVATARS.length; a++) {
        if (!AVATARS[a][0].test(t)) continue;
        var row = s.closest('[style*="cursor: pointer"]');
        if (!row) break;
        var dot = row.firstElementChild;
        if (!dot || dot.tagName !== 'SPAN' || dot.dataset.qbAv) break;
        dot.dataset.qbAv = '1';
        dot.classList.add('qb-av', AVATARS[a][1]);
        if (AVATARS[a][2]) {
          var pd = document.createElement('span');
          pd.className = 'qb-presence';
          dot.appendChild(pd);
        } else {
          dot.innerHTML = HEADSET;
        }
        break;
      }
    }
    /* empty unread pills read as stray dots — the design has none */
    var pills = document.querySelectorAll('span[style*="min-width: 20px"]');
    for (var p = 0; p < pills.length; p++) {
      if ((pills[p].textContent || '').trim() === '') pills[p].classList.add('qb-hidebadge');
    }
    /* product thumbnail in the chat header (phone frame 604:33673) */
    var h2s = document.querySelectorAll('.qb-mchat h2');
    for (var h = 0; h < h2s.length; h++) {
      var head = h2s[h].parentElement && h2s[h].parentElement.parentElement;
      if (!head || head.querySelector('.qb-chatthumb')) continue;
      var th = document.createElement('div');
      th.className = 'qb-chatthumb';
      head.insertBefore(th, head.firstChild);
    }
  }

  /* ------------------------- overlays (portals) ------------------------- */
  function closeMenus() {
    var m = document.querySelector('.qb-msgmenu');
    if (m) m.remove();
  }

  function openMenu(anchor) {
    closeMenus();
    var r = anchor.getBoundingClientRect();
    var m = document.createElement('div');
    m.className = 'qb-msgmenu';
    m.innerHTML = ''
      + '<div class="hd">Setting</div>'
      + '<button type="button" data-mm="report">Report'
      + '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgb(243,128,87)" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5" stroke-linecap="round"/><circle cx="12" cy="16" r="1" fill="rgb(243,128,87)" stroke="none"/></svg></button>'
      + '<button type="button" class="danger" data-mm="block">Block'
      + '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgb(224,74,74)" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M5.7 5.7l12.6 12.6"/></svg></button>';
    document.body.appendChild(m);
    var left = Math.max(8, Math.min(window.innerWidth - 198, r.right - 190));
    m.style.top = (r.bottom + 6) + 'px';
    m.style.left = left + 'px';
  }

  function openBlock() {
    var name = peerName();
    var back = document.createElement('div');
    back.className = 'qb-blk-back';
    back.innerHTML = ''
      + '<div class="qb-blk"><h3>Block User?</h3>'
      + '<p>Are you sure you want to block this user? They will no longer be able to contact you.</p>'
      + '<div class="row"><button type="button" class="ok">Block</button>'
      + '<button type="button" class="no">Cancel</button></div></div>';
    document.body.appendChild(back);
    back.addEventListener('click', function (e) { if (e.target === back) back.remove(); });
    back.querySelector('.no').addEventListener('click', function () { back.remove(); });
    back.querySelector('.ok').addEventListener('click', function () {
      back.remove();
      toast(name + ' has been blocked successfully');
    });
  }

  var REASONS = ['Inappropriate Content', 'Harassment or Bullying', 'Privacy Violations',
    'Spam and Unsolicited Messages', 'Impersonation', 'Violation of Terms of Service',
    'Cybersecurity Concerns', 'Hate Speech or Discrimination', "The Problem Isn't Listed Here"];

  function openReport() {
    var back = document.createElement('div');
    back.className = 'qb-rep-back';
    var html = '<div class="qb-rep"><h3>Report</h3><p class="sub">Select a problem to report</p>';
    for (var i = 0; i < REASONS.length; i++) {
      html += '<label><span></span><input type="radio" name="qbrep"' + (i === 0 ? ' checked' : '') + '></label>';
    }
    html += '<button type="button" class="send">Submit Report</button></div>';
    back.innerHTML = html;
    var labels = back.querySelectorAll('label > span');
    for (var j = 0; j < labels.length; j++) labels[j].textContent = REASONS[j];
    document.body.appendChild(back);
    back.addEventListener('click', function (e) { if (e.target === back) back.remove(); });
    back.querySelector('.send').addEventListener('click', function () {
      back.remove();
      toast('Your report has been sent successfully');
    });
  }

  /* one delegated listener; the "⋯" span survives engine re-renders */
  document.addEventListener('click', function (e) {
    var el = e.target;
    if (el.closest && el.closest('.qb-msgmenu')) {
      var b = el.closest('button[data-mm]');
      if (b) {
        var kind = b.getAttribute('data-mm');
        closeMenus();
        if (kind === 'block') openBlock();
        if (kind === 'report') openReport();
      }
      return;
    }
    var dots = null, n = el;
    for (var i = 0; i < 3 && n; i++, n = n.parentElement) {
      if (n.nodeType === 1 && n.tagName === 'SPAN' && (n.textContent || '').trim() === '⋯') { dots = n; break; }
    }
    if (dots) {
      e.preventDefault(); e.stopImmediatePropagation();
      if (document.querySelector('.qb-msgmenu')) closeMenus();
      else openMenu(dots);
      return;
    }
    closeMenus();
  }, true);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMenus();
      var o = document.querySelector('.qb-blk-back, .qb-rep-back');
      if (o) o.remove();
    }
  });

  decorate();
  new MutationObserver(decorate).observe(document.documentElement, { childList: true, subtree: true });
})();
