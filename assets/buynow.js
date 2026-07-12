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

  function run() { transform(); rewireProduct(); }
  run();
  new MutationObserver(run).observe(document.documentElement, { childList: true, subtree: true });
})();
