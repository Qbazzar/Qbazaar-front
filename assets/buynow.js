/* Q Bazaar — "Buy Now" page (Figma 659:58417).
   The engine's offer screen already matches the design's card layout; the
   Buy Now page is the same card without the price input: a purchase request
   ("No payment will be processed at this stage"). This helper
   1) on buy-now.html (window.__QB_BUYNOW): retitles the offer screen and
      swaps the price block for the designed "Contact Details" pill + copy;
   2) on product pages: points the "Buy Now" button at buy-now.html. */
(function () {
  function leaf(txt) {
    return [].find.call(document.querySelectorAll('*'), function (e) {
      return e.childElementCount === 0 && (e.textContent || '').trim() === txt;
    });
  }

  function transform() {
    if (!window.__QB_BUYNOW || document.body.dataset.qbBuynow) return;
    var title = leaf('Make an Offer');
    if (!title) return;
    document.body.dataset.qbBuynow = '1';
    title.textContent = 'Buy Now';
    document.title = 'Q Bazaar — Buy Now';
    var crumb = [].filter.call(document.querySelectorAll('*'), function (e) {
      return e.childElementCount === 0 && (e.textContent || '').trim() === 'Make an Offer';
    });
    crumb.forEach(function (c) { c.textContent = 'Buy Now'; });

    // "Your Offer" + amount input + QAR quick chips -> Contact Details pill
    var yo = leaf('Your Offer');
    if (yo) {
      var block = yo.parentElement;
      var wrap = document.createElement('div');
      wrap.innerHTML = ''
        + '<div style="font:500 15px Poppins;color:#4b4b4b;margin-bottom:10px">Contact Details</div>'
        + '<div style="border:1px solid #F38057;background:rgb(255,240,234);border-radius:10px;'
        +   'padding:15px 18px;font:500 15px Poppins;color:#F38057">Message with Seller</div>';
      yo.style.display = 'none';
      var inputRow = block.querySelector('input') && block.querySelector('input').closest('div');
      if (inputRow) inputRow.style.display = 'none';
      [].forEach.call(block.querySelectorAll('*'), function (e) {
        if (e.childElementCount === 0 && /^QAR \d+$/.test((e.textContent || '').trim())) {
          var chipRow = e.parentElement.parentElement;
          if (chipRow) chipRow.style.display = 'none';
        }
      });
      block.insertBefore(wrap, yo);
    }

    var hint = leaf('A reasonable offer increases your chance of acceptance by 70%.');
    if (hint) hint.textContent = "Let the seller know when you'd like to pick it up or if you have any questions before buying.";

    var b1 = leaf('The seller can accept, reject, or send a counter-offer.');
    if (b1) b1.textContent = 'Your purchase request will be sent securely to the seller.';
    var b2 = leaf('This offer is non-binding until both parties agree.');
    if (b2) b2.textContent = 'The seller can confirm or reject the request.';
    var b3 = leaf('Be ready to complete the purchase once your offer is accepted.');
    if (b3) b3.textContent = 'No payment will be processed at this stage.';
    var hw = leaf('How it works');
    if (hw) hw.textContent = 'How its work';
  }

  function rewireProduct() {
    if ((window.__QB_SCREEN || '') !== 'product') return;
    [].forEach.call(document.querySelectorAll('*'), function (e) {
      if (e.childElementCount > 1 || e.dataset.qbBn) return;
      if (!/^\s*Buy Now\s*$/.test(e.textContent || '')) return;
      var btn = e.closest('button, a, [style*="cursor: pointer"]') || e.parentElement;
      if (!btn || btn.dataset.qbBn) return;
      btn.dataset.qbBn = '1'; e.dataset.qbBn = '1';
      btn.addEventListener('click', function (ev) {
        ev.preventDefault(); ev.stopPropagation();
        location.href = 'buy-now.html';
      }, true);
    });
  }

  // Checkout copy per Figma 682:32513: QNB + Cash methods, "Complete Payment"
  function transformCheckout() {
    if ((window.__QB_SCREEN || '') !== 'checkout') return;
    var MAP = {
      'Bank Transfer': 'Qatar National Bank(QNB)',
      'Cash on Delivery': 'Cash',
      'Complete Purchase': 'Complete Payment'
    };
    [].forEach.call(document.querySelectorAll('*'), function (e) {
      if (e.childElementCount !== 0) return;
      var t = (e.textContent || '').trim();
      if (MAP[t]) e.textContent = MAP[t];
    });
  }

  // Payment result modals (Figma 684:33194 success / 689:33489 failure).
  // Success is the default; append ?fail=1 to checkout.html to preview the
  // failure state.
  var MCSS = ''
    + '.qb-paymodal-back{position:fixed;inset:0;background:rgba(30,30,30,.45);z-index:99995;display:flex;align-items:center;justify-content:center}'
    + '.qb-paymodal{background:#fff;border-radius:20px;box-shadow:0 24px 64px rgba(0,0,0,.25);width:min(430px,92vw);padding:38px 34px 26px;text-align:center;font-family:Poppins,sans-serif}'
    + '.qb-paymodal .ic{width:54px;height:54px;border-radius:50%;margin:0 auto 18px;display:flex;align-items:center;justify-content:center;background:rgb(255,240,234)}'
    + '.qb-paymodal h3{font:600 20px Poppins;color:#212121;margin:0 0 10px}'
    + '.qb-paymodal p{font:400 14px/1.65 Poppins;color:#9a9a9a;margin:0 0 22px}'
    + '.qb-paymodal .btn{display:block;width:100%;background:#F38057;color:#fff;border:0;border-radius:10px;padding:14px;font:600 14px Poppins;cursor:pointer;text-decoration:none;transition:background .18s}'
    + '.qb-paymodal .btn:hover{background:rgb(233,108,63)}'
    + '.qb-paymodal .lnk{display:inline-block;margin-top:14px;color:#F38057;font:500 14px Poppins;cursor:pointer;text-decoration:none;background:none;border:0}';
  var mcssDone = false;
  function payModal(ok) {
    if (!mcssDone) { var st = document.createElement('style'); st.textContent = MCSS; document.head.appendChild(st); mcssDone = true; }
    var old = document.querySelector('.qb-paymodal-back');
    if (old) old.remove();
    var back = document.createElement('div');
    back.className = 'qb-paymodal-back';
    var check = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#F38057" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>';
    var cross = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#F38057" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="m9 9 6 6M15 9l-6 6"/></svg>';
    back.innerHTML = '<div class="qb-paymodal">'
      + '<div class="ic">' + (ok ? check : cross) + '</div>'
      + '<h3>' + (ok ? 'Payment Successful' : 'Payment Failed') + '</h3>'
      + '<p>' + (ok
        ? 'Your payment has been completed successfully. The seller has been notified and your order is now being processed.'
        : "We couldn't process your payment. Please try again or choose a different payment method.") + '</p>'
      + (ok
        ? '<a class="btn" href="index.html">Back to home</a><button type="button" class="lnk" data-close="1">Cancel</button>'
        : '<button type="button" class="btn" data-close="1">Try Again</button><button type="button" class="lnk" data-close="1">Change Payment Method</button>')
      + '</div>';
    back.addEventListener('click', function (e) {
      if (e.target === back || (e.target.dataset && e.target.dataset.close)) back.remove();
    });
    document.body.appendChild(back);
  }
  var checkoutWired = false;
  function wireCheckout() {
    if (checkoutWired || (window.__QB_SCREEN || '') !== 'checkout') return;
    checkoutWired = true;
    document.addEventListener('click', function (e) {
      var el = e.target;
      for (var i = 0; i < 4 && el; i++) {
        if (el.nodeType === 1 && /^\s*Complete Payment\s*$/.test(el.textContent || '')) {
          e.preventDefault(); e.stopImmediatePropagation();
          payModal(!/[?&]fail=1/.test(location.search));
          return;
        }
        el = el.parentElement;
      }
    }, true);
  }

  // Wallet page (Figma 502:22401): account shell + injected wallet panel
  // (3 stat cards + transaction history). Engine morphs restore the template
  // content, so re-inject whenever the panel is missing.
  function walletize() {
    if (!window.__QB_WALLET) return;
    if (document.querySelector('.qb-wallet-panel')) return;
    var content = document.querySelector('[style*="flex: 3 1 460px"]');
    if (!content) return;
    document.title = 'Q Bazaar — Wallet';
    var card = 'background:#fff;border:1px solid #ededed;border-radius:16px;box-shadow:0 4px 40px rgba(161,161,161,.15);';
    var stat = function (label, val) {
      return '<div style="' + card + 'flex:1;padding:22px 24px;min-width:0">'
        + '<div style="font:400 16px Poppins;color:#999">' + label + '</div>'
        + '<div style="font:600 28px Poppins;color:#333;margin-top:6px">' + val + '</div></div>';
    };
    var srow = 'display:grid;grid-template-columns:2fr 1fr 1.2fr 1fr .9fr;gap:16px;align-items:center;';
    var trow = function (item, buyer, date, method, status, scolor, amount) {
      return '<div style="' + srow + 'padding:18px 0;border-top:1px solid #f3f3f3">'
        + '<div style="min-width:0"><div style="font:600 16px Poppins;color:#333">' + item + '</div>'
        + '<div style="font:400 15px Poppins;color:#999;margin-top:4px">' + buyer + '</div></div>'
        + '<div style="font:500 16px Poppins;color:#8e8e8e">' + date + '</div>'
        + '<div style="font:500 16px Poppins;color:#8e8e8e">' + method + '</div>'
        + '<div style="font:500 14px Poppins;color:' + scolor + '">' + status + '</div>'
        + '<div style="font:600 16px Poppins;color:#221122;text-align:right">' + amount + '</div></div>';
    };
    var panel = document.createElement('div');
    panel.className = 'qb-wallet-panel';
    panel.innerHTML = ''
      + '<div style="font:600 20px Poppins;color:#424242">Wallet</div>'
      + '<div style="font:500 14px Poppins;color:#9e9e9e;margin:6px 0 24px">View your wallet balance, manage payment methods, and track your transactions.</div>'
      + '<div style="display:flex;gap:20px;flex-wrap:wrap">'
      + stat('Total Revenue', 'QAR 450.00') + stat('Complete Sales', '3') + stat('Pending Payout', 'QAR 100.00')
      + '</div>'
      + '<div style="' + card + 'margin-top:28px;padding:26px 28px">'
      + '<div style="font:600 24px Poppins;color:#333;margin-bottom:20px">Transaction History</div>'
      + '<div style="' + srow + 'padding-bottom:14px"><div style="font:500 16px Poppins;color:#8e8e8e">Item &amp; Buyer</div>'
      + '<div style="font:500 16px Poppins;color:#8e8e8e">Date</div><div style="font:500 16px Poppins;color:#8e8e8e">Payment Method</div>'
      + '<div style="font:500 16px Poppins;color:#8e8e8e">Status</div><div style="font:500 16px Poppins;color:#8e8e8e;text-align:right">Amount</div></div>'
      + trow('Neutrogena Cream', 'Farah M.', 'June 2, 2026', 'PayPal', 'Complete', 'rgb(27,173,7)', 'QAR 60.00')
      + trow('Neutrogena Cream', 'Farah M.', 'June 2, 2026', 'PayPal', 'Pending', 'rgb(243,128,87)', 'QAR 60.00')
      + trow('BMW 320d Touring M-Sport', 'Omar K.', 'May 28, 2026', 'QNB', 'Complete', 'rgb(27,173,7)', 'QAR 330.00')
      + '</div>';
    content.innerHTML = '';
    content.appendChild(panel);
    // highlight Wallet in the settings nav
    var w = [].find.call(document.querySelectorAll('*'), function (e) {
      return e.childElementCount === 0 && (e.textContent || '').trim() === 'Wallet';
    });
    var navItem = w && w.closest('.qb-navitem');
    if (navItem) {
      document.querySelectorAll('.qb-navitem-active').forEach(function (x) { x.classList.remove('qb-navitem-active'); });
      navItem.classList.add('qb-navitem-active');
    }
  }
  // settings-nav Wallet item navigates to the wallet page
  document.addEventListener('click', function (e) {
    var t = e.target;
    for (var i = 0; i < 3 && t; i++) {
      if (t.nodeType === 1 && (t.textContent || '').trim() === 'Wallet' && t.closest && t.closest('.qb-navitem')) {
        if (!window.__QB_WALLET) { e.preventDefault(); e.stopImmediatePropagation(); location.href = 'wallet.html'; }
        return;
      }
      t = t.parentElement;
    }
  }, true);

  function run() { transform(); rewireProduct(); transformCheckout(); wireCheckout(); walletize(); }
  run();
  new MutationObserver(run).observe(document.documentElement, { childList: true, subtree: true });
})();
