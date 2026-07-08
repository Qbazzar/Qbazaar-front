/* Q Bazaar — real photos injected into design placeholders.
   Reads each ".qb-ph" caption, maps it to a category, and fills the box with a
   matching photo (cover). Re-applies on every engine re-render. */
(function () {
  var POOLS = {"cars":["011f32fd21a0e3bdee1e3a4abf3127afca213ee9","22ecaea2d2f56ad324a31fdc8fab001581d8b867","27611ef521ddebaf2bcd3f6e97d6ada3d362b478","489bc874f9affa58263147291a56d6a12b07963f","48d9262f54bb5a24366c51d5dedb7343d4db99b5","4d4411643d33f30d1a034a91013f6a99e3ee3023","5c8d217eaca5aa2773e4232f4eac629cac9ed2c9","6450a9c29c19da43c6cb80b1a187d70c18e4bfa2","67d3916d455bca3fbc244303f9400d616696aa14","68f332eba823fe028f078588ce7b8744ad3329e6","71299fa487be30a7e810704dc60b650c06608dea","99f556ce26d3e4d3a65e3d04aa5c730b8883789d","e1523321cb165d0c564368114973e0ac67cb7e73","e589146b8277b2fb1b54c9c7488ee134fcd96daf","eb6f51d826083a7052e4dd75dd6261aa5fda0746","fa9cdac6ac404d44ef8878a0af62046e41c10142"],"m3":["22ecaea2d2f56ad324a31fdc8fab001581d8b867","fa9cdac6ac404d44ef8878a0af62046e41c10142"],"amg":["48d9262f54bb5a24366c51d5dedb7343d4db99b5","4d4411643d33f30d1a034a91013f6a99e3ee3023","6450a9c29c19da43c6cb80b1a187d70c18e4bfa2","67d3916d455bca3fbc244303f9400d616696aa14","946b8bf47d5a624eb0551350223705ab61f0c65e","99f556ce26d3e4d3a65e3d04aa5c730b8883789d","e589146b8277b2fb1b54c9c7488ee134fcd96daf"],"golf":["27611ef521ddebaf2bcd3f6e97d6ada3d362b478","85ac1d222d209065636a4e36a4e7bf4df72cca98"],"coupe":["0b22d32b03f53d29e1c2c58945ab28de160b420f","746f8096f73de7538c9758fb8249e4f68aab4099","d709c93a2aa5a5f0a596ed6b1125c41d90242328"],"suv":["011f32fd21a0e3bdee1e3a4abf3127afca213ee9","88722c16caea217d4350e8f97421f7166d12d649"],"hybrid":["5118a13417d81158d6c5eb9ee04e73252f4c20da","6bd3faad8c34cc137413e686a3717a97a3d7da55"],"moto":["0b0d148018a4da73eb8db154f817d7250344478b","505f80c5de65b4093e205d62177c940076205150"],"scooter":["2b00665ff1bac9c6def3e797fea053d5e6cebbb9","b55a21a5f8154e2c26ca66e09e6f8ca689f93326"],"bicycle":["09b90279d544ee9e88aee3e5da5b303f33543eb9","7a9ae6acd2998e37c09f1b7a7182a0e800556b06"],"camper":["43ddca7d7398af1e884695d44a2320ced88920d2","aa5062e6732d735fee926315e54cc9842c1062d6"],"trailer":["5652fe1f047453328cb4c08e0705e8350cd01832","a834239f794db6efb572f484ce339b14d15ebfc8"],"tires":["459477f85ae75bf61b1e2d3c74279e4022f7636a","84e421e6edb7f3d844f43ead8731277361a091cf"],"brakes":["638e815ec79fbd592c848a4e069335c5a48c93c7","88a8d8d7850d03f8e40a70bc1049b526cb7fd3cb"],"bulb":["66a534932da52b2a72a98cdad00843f065c2c656"],"beauty":["0e61e9a73417c33d21fe4954d2ed5396299705d5","423239c1ed7210c0a02b8b13b3da515fb8d628fb","5961db245a294f674e2f0ecdd9bebe56999d53e5"],"property":["092c2bfdc9e5c3ac6492b12068fbaf10c41c7c1e","12a7ea1f4573b584ca624d9347e9686bcc881b6c","16958ccd16d7a53642d25315c306de2f911a7761","1c7cd0d43ac52539187f171b89da111bf46c4a5a","260ca465308f6541a21877616c88ff200f78d4b1","27818fa4969bee43da5aad1592313fa48ef98f13","2d9d04169d45efb334e4442dd13c93902c835c61","3a53ccb5396ab8bb91ff861746660fe228e76cd1","3d1c590edfdbdfba6103fd1745420e5f273970ad","40cafef780d6baa20e2042f4afee34c011ccecbb","449cd27971b6771d0043b8aca20d100b71d903e8","4c241ee538bb82f1fb0c19803139335123d88357","7bd5c8c9f6253ae387a181ff2ed142af955fa2af","e4fa4140c82821f248e1095b332f6e583e8b0111"],"interior":["025be941190b33e0db4af28a8a862547df04ad4a","0ddb702d51e12eddce5e81f173757c3afeefdd06","0e0a3a052b56e2a39cbc64640db1252a71f5bd15","4d2341f75a52547f67d3f3313422e52f98b140b1","6b75669850129e4cae0eebf95403635280d934f1","7676d2a6d16e09fdba2147061dfdc995f241b368","7b8042b0fe8b741f042c4b947fb9c2fdd37fd340"]};

  // caption keyword -> pool (checked in order; first match wins)
  var RULES = [
    [/m3|m-sport|msport/, "m3"],
    [/golf|jetta|passat/, "golf"],
    [/amg|mercedes|benz/, "amg"],
    [/coupe/, "coupe"],
    [/\bsuv\b|velar|range/, "suv"],
    [/hybrid|corolla|toyota/, "hybrid"],
    [/trailer|airstream/, "trailer"],
    [/camper|van|motorhome|caravan|hymer/, "camper"],
    [/scooter|vespa/, "scooter"],
    [/motorcycle|motorbike|aprilia|superbike/, "moto"],
    [/bicycle|\bbike\b|stumpjumper|specialized/, "bicycle"],
    [/tire|tyre|michelin/, "tires"],
    [/bulb|headlight|philips|xenon/, "bulb"],
    [/brake|brembo|part/, "brakes"],
    [/cream|neutrogena|serum|vitamin|skincare|beauty/, "beauty"],
    [/villa|apartment|property|house|real estate|penthouse|studio/, "property"],
    [/interior|room|kitchen|living/, "interior"],
    // vehicle-ish defaults
    [/car|sedan|photo|bmw|audi|porsche|lexus|tesla|product/, "cars"],
  ];

  function poolFor(cap) {
    for (var i = 0; i < RULES.length; i++) if (RULES[i][0].test(cap)) return RULES[i][1];
    return "cars";
  }

  function uniq(a) { var s = {}, o = []; for (var i = 0; i < a.length; i++) if (!s[a[i]]) { s[a[i]] = 1; o.push(a[i]); } return o; }

  // A product gallery gets a richer set of related photos to page through.
  function galleryList(cap) {
    var name = poolFor(cap);
    if (["cars", "m3", "amg", "golf", "coupe", "suv", "hybrid"].indexOf(name) >= 0)
      return uniq((POOLS.cars || []).concat(POOLS.m3 || [], POOLS.amg || [], POOLS.coupe || [], POOLS.golf || [], POOLS.suv || []));
    if (["moto", "scooter", "bicycle"].indexOf(name) >= 0)
      return uniq((POOLS.moto || []).concat(POOLS.scooter || [], POOLS.bicycle || []));
    if (["camper", "trailer"].indexOf(name) >= 0)
      return uniq((POOLS.camper || []).concat(POOLS.trailer || []));
    if (name === "beauty") return POOLS.beauty || [];
    if (name === "property") return uniq((POOLS.property || []).concat(POOLS.interior || []));
    return (POOLS[name] && POOLS[name].length) ? POOLS[name] : POOLS.cars;
  }

  function setBg(el, file) {
    el.style.backgroundImage = "url('images/" + file + "')";
    el.style.backgroundSize = "cover";
    el.style.backgroundPosition = "center";
    el.style.backgroundRepeat = "no-repeat";
  }

  // Turn a placeholder that has its own ‹ › buttons into a working image gallery.
  function initGallery(box) {
    if (box.__gal) return true;
    var btns = [];
    for (var i = 0; i < box.children.length; i++) if (box.children[i].tagName === 'BUTTON') btns.push(box.children[i]);
    if (btns.length < 2) return false; // not a gallery
    box.__gal = true;
    box.setAttribute('data-gallery', '1');
    var capEl = box.querySelector('.qb-cap');
    var list = galleryList((capEl ? capEl.textContent : '').toLowerCase());
    box.__list = list; box.__idx = 0;
    if (capEl) capEl.style.display = 'none';
    function counterEl() {
      var all = box.querySelectorAll('*');
      for (var i = 0; i < all.length; i++) if (!all[i].children.length && /\d+\s*\/\s*\d+/.test(all[i].textContent)) return all[i];
      return null;
    }
    var cnt = counterEl();
    function show(i) {
      box.__idx = (i % list.length + list.length) % list.length;
      setBg(box, list[box.__idx]);
      if (cnt) cnt.textContent = cnt.textContent.replace(/\d+\s*\/\s*\d+/, (box.__idx + 1) + '/' + list.length);
    }
    btns[0].addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); show(box.__idx - 1); });
    btns[1].addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); show(box.__idx + 1); });
    show(0);
    return true;
  }

  var applying = false, obs = null;
  function apply() {
    if (applying) return;
    applying = true;
    if (obs) obs.disconnect();
    var counters = {};
    var boxes = document.querySelectorAll('.qb-ph');
    for (var i = 0; i < boxes.length; i++) {
      var el = boxes[i];
      if (initGallery(el)) continue; // gallery boxes manage their own image
      var capEl = el.querySelector('.qb-cap');
      var cap = (capEl ? capEl.textContent : (el.getAttribute('data-cap') || '')).toLowerCase();
      var name = poolFor(cap);
      var pool = POOLS[name];
      if (!pool || !pool.length) continue;
      var n = counters[name] || 0; counters[name] = n + 1;
      var file = pool[n % pool.length];
      setBg(el, file);
      el.setAttribute('data-photo', name);
      if (capEl) capEl.style.display = "none";
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
    // extra passes to catch async React boot
    [120, 350, 700, 1200].forEach(function (t) { setTimeout(apply, t); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
