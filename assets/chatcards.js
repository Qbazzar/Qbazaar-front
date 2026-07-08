/* Q Bazaar — Offer / Purchase request cards inside chat (Flow 286).
   Chat messages whose text is a "QBCARD|kind|status|title|listPrice|offerPrice"
   marker are rendered as rich interactive cards. Pending cards have working
   Accept / Reject / Counter / Confirm / Decline / Cancel buttons that move the
   card to the matching state. Re-applies after every engine re-render. */
(function () {
  var THUMB = "images/0e61e9a73417c33d21fe4954d2ed5396299705d5"; // Neutrogena Cream
  var ORANGE = "rgb(243,128,87)";

  var CSS = ''
    + '.qb-oc{width:300px;max-width:78vw;background:#fff;border:1px solid rgb(237,237,237);border-radius:16px;'
    +   'box-shadow:0 4px 20px rgba(161,161,161,.12);padding:14px;text-align:left;font-family:Poppins,sans-serif}'
    + '.qb-oc-tag{display:inline-block;font-size:11px;font-weight:600;padding:3px 10px;border-radius:20px;margin-bottom:10px}'
    + '.qb-oc-tag.offer{background:rgb(235,240,255);color:rgb(90,116,214)}'
    + '.qb-oc-tag.buy{background:rgb(255,240,234);color:' + ORANGE + '}'
    + '.qb-oc-head{display:flex;gap:12px;align-items:center}'
    + '.qb-oc-thumb{width:52px;height:52px;border-radius:12px;background-size:cover;background-position:center;flex:0 0 auto;border:1px solid rgb(237,237,237)}'
    + '.qb-oc-title{font-size:14px;font-weight:600;color:rgb(33,33,33);line-height:1.3}'
    + '.qb-oc-price{font-size:13px;color:rgb(120,120,120);margin-top:3px}'
    + '.qb-oc-price b{color:' + ORANGE + ';font-weight:600}'
    + '.qb-oc-price s{color:rgb(170,170,170)}'
    + '.qb-oc-status{margin-top:12px;font-size:13px;font-weight:600;display:flex;align-items:center;gap:6px}'
    + '.qb-oc-status.ok{color:rgb(34,160,90)}.qb-oc-status.bad{color:rgb(224,74,74)}'
    + '.qb-oc-status.wait{color:' + ORANGE + '}.qb-oc-status.gone{color:rgb(150,150,150)}'
    + '.qb-oc-btns{display:flex;gap:8px;margin-top:12px;flex-wrap:wrap}'
    + '.qb-oc-btn{flex:1;min-width:78px;padding:9px 10px;border-radius:10px;font:600 13px Poppins,sans-serif;cursor:pointer;border:1px solid transparent;transition:.15s}'
    + '.qb-oc-btn.primary{background:' + ORANGE + ';color:#fff}.qb-oc-btn.primary:hover{filter:brightness(.95)}'
    + '.qb-oc-btn.ghost{background:#fff;color:rgb(75,75,75);border-color:rgb(224,224,224)}.qb-oc-btn.ghost:hover{background:rgb(248,248,248)}'
    + '.qb-oc-btn.danger{background:#fff;color:rgb(224,74,74);border-color:rgb(244,205,205)}.qb-oc-btn.danger:hover{background:rgb(253,245,245)}';
  var st = document.createElement('style'); st.textContent = CSS;
  (document.head || document.documentElement).appendChild(st);

  var ICON = { ok: '✓', bad: '✕', wait: '↔', gone: '⏱' };

  function esc(x) { return String(x).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  // Build the card HTML for a given state.
  function cardHTML(d) {
    var kindLabel = d.kind === 'offer' ? 'Offer Request' : 'Purchase Request';
    var priceLine = d.kind === 'offer'
      ? 'Listed <s>' + esc(d.listP) + '</s> · Offer <b>' + esc(d.offerP) + '</b>'
      : 'Buy now · <b>' + esc(d.listP) + '</b>';
    var body = '';
    if (d.status === 'pending' && d.side === 'them') {
      // incoming request -> action buttons
      if (d.kind === 'offer') {
        body = '<div class="qb-oc-btns">'
          + '<button class="qb-oc-btn primary" data-act="accepted">Accept</button>'
          + '<button class="qb-oc-btn ghost" data-act="countered">Counter</button>'
          + '<button class="qb-oc-btn danger" data-act="rejected">Reject</button></div>';
      } else {
        body = '<div class="qb-oc-btns">'
          + '<button class="qb-oc-btn primary" data-act="paid">Confirm</button>'
          + '<button class="qb-oc-btn danger" data-act="rejected">Decline</button></div>';
      }
    } else if (d.status === 'pending' && d.side === 'me') {
      body = '<div class="qb-oc-status wait">' + ICON.wait + ' Waiting for a response…</div>'
        + '<div class="qb-oc-btns"><button class="qb-oc-btn danger" data-act="cancelled">Cancel request</button></div>';
    } else {
      var map = {
        accepted: ['ok', d.kind === 'offer' ? 'Offer accepted' : 'Purchase confirmed'],
        paid: ['ok', 'Payment completed · ' + d.listP],
        rejected: ['bad', d.kind === 'offer' ? 'Offer rejected' : 'Request declined'],
        cancelled: ['bad', 'Request cancelled'],
        countered: ['wait', 'Counter offer sent: ' + d.offerP],
        expired: ['gone', 'This offer has expired'],
      };
      var m = map[d.status] || ['gone', d.status];
      body = '<div class="qb-oc-status ' + m[0] + '">' + (ICON[m[0]] || '') + ' ' + esc(m[1]) + '</div>';
    }
    return '<div class="qb-oc">'
      + '<span class="qb-oc-tag ' + d.kind + '">' + kindLabel + '</span>'
      + '<div class="qb-oc-head"><div class="qb-oc-thumb" style="background-image:url(\'' + THUMB + '\')"></div>'
      + '<div><div class="qb-oc-title">' + esc(d.title) + '</div><div class="qb-oc-price">' + priceLine + '</div></div></div>'
      + body + '</div>';
  }

  function render(host, d) {
    host.innerHTML = cardHTML(d);
    host.querySelectorAll('button[data-act]').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault(); e.stopPropagation();
        d.status = b.getAttribute('data-act');
        render(host, d);
      });
    });
  }

  var applying = false, obs = null;
  function apply() {
    if (applying) return; applying = true; if (obs) obs.disconnect();
    // The engine wraps {{ m.text }} in a <span class="sc-interp"> inside the
    // message bubble; match that span, then style the bubble (its parent).
    var leaves = document.querySelectorAll('span, div');
    for (var i = 0; i < leaves.length; i++) {
      var leaf = leaves[i];
      if (leaf.children.length !== 0) continue;
      var t = (leaf.textContent || '');
      if (t.slice(0, 7) !== 'QBCARD|') continue;
      var bubble = leaf.parentElement;
      if (!bubble || bubble.__ocDone) continue;
      bubble.__ocDone = true;
      var p = t.split('|'); // QBCARD, kind, status, title, listP, offerP
      var wrap = bubble.parentElement;
      var side = (wrap && wrap.style.alignSelf === 'flex-end') ? 'me' : 'them';
      if (wrap) { wrap.style.maxWidth = '340px'; }
      bubble.style.background = 'transparent'; bubble.style.border = 'none';
      bubble.style.padding = '0'; bubble.style.color = 'inherit';
      render(bubble, { kind: p[1], status: p[2], title: p[3], listP: p[4], offerP: p[5], side: side });
    }
    if (obs) obs.observe(document.body, { childList: true, subtree: true });
    applying = false;
  }

  var raf = 0;
  function schedule() { if (raf) return; raf = requestAnimationFrame(function () { raf = 0; apply(); }); }
  function start() {
    apply();
    obs = new MutationObserver(schedule);
    obs.observe(document.body, { childList: true, subtree: true });
    [150, 450, 900].forEach(function (t) { setTimeout(apply, t); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
