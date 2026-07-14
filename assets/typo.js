/* Q Bazaar — text-keyed typography fixes the design applies per-string.
   The engine rewrites inline styles on every render, so each pass RE-APPLIES
   (guarded by current-value checks to avoid MutationObserver feedback). */
(function () {
  var MONT = "'Montserrat', 'Poppins', sans-serif";
  var CHIPS = ['Trust Seller', 'Private Seller', 'Support', 'Draft', 'Publish',
    'Complete', 'Reserve', 'Reversed', 'Pending', 'Rejected'];
  var NOTES = ['Drop images here', 'It is recommended to write', 'Let the seller know'];
  var CITIES = ['Al Rayyan', 'Lusail', 'Doha', 'Umm Salal', 'Al Shamal', 'Al Daayen',
    'Al Shahaniya', 'Umm Salal Ali', 'Al Wukair', 'Wiesbaden', 'Qatifan Islands',
    'Al Khisah', 'Al Gharrafa', 'Al Wakrah', 'Al Khor', 'Mesaieed', 'Dukhan'];
  // exact-string tokens the design styles individually
  var EXACT = {
    'View All': { fw: '400' },
    'Q BAZAAR': { fw: '400' },
    'Reset All': { fw: '400' },
    'Follow': { fw: '500', btn: 1 },
    'Message': { fw: '500', btn: 1 },
    'Info': { fw: '500', btn: 1 },
    'Apply Filter': { fw: '500', btn: 1 },
    'Choose Category': { fs: '20px' },
    'Location': { fs: '20px' },
    'Distance': { fs: '20px' },
    'Buy Now': { fs: '14px', fw: '500', btn: 1 },
    'Make an Offer': { fs: '14px', fw: '500', btn: 1 },
    'Send Message': { fs: '14px', fw: '500', btn: 1 },
    'Save Draft': { fs: '14px', fw: '500', btn: 1 },
    'Preview': { fs: '14px', fw: '500', btn: 1 }
  };
  CITIES.forEach(function (c) { if (!EXACT[c]) EXACT[c] = { fw: '500' }; });

  function put(e, prop, val) {
    if (e.style.getPropertyValue(prop) !== val) e.style.setProperty(prop, val, 'important');
  }

  function pass() {
    var els = document.querySelectorAll('body *');
    for (var i = 0; i < els.length; i++) {
      var e = els[i];
      if (e.childElementCount > 1 || e.tagName === 'SCRIPT' || e.tagName === 'STYLE'
        || e.tagName === 'svg' || e.ownerSVGElement) continue;
      var t = (e.textContent || '').replace(/\s+/g, ' ').trim();
      if (!t || t.length > 90) continue;
      var j, hit = false;
      for (j = 0; j < CHIPS.length; j++) {
        if (t === CHIPS[j]) {
          put(e, 'font-family', MONT);
          put(e, 'font-weight', '500');
          if (t === 'Trust Seller' || t === 'Private Seller') put(e, 'font-size', '10px');
          hit = true;
          break;
        }
      }
      if (hit) continue;
      for (j = 0; j < NOTES.length; j++) {
        if (t.indexOf(NOTES[j]) === 0) {
          put(e, 'font-family', MONT);
          if (j === 0) put(e, 'font-size', '12px');
          hit = true;
          break;
        }
      }
      if (hit) continue;
      var x = EXACT[t];
      if (x) {
        if (x.btn && !e.closest('button, a, [style*="cursor: pointer"]')) continue;
        if (x.fs) put(e, 'font-size', x.fs);
        if (x.fw) put(e, 'font-weight', x.fw);
      }
    }
  }
  pass();
  var pending = false;
  new MutationObserver(function () {
    if (pending) return;
    pending = true;
    setTimeout(function () { pending = false; pass(); }, 120);
  }).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] });
})();
