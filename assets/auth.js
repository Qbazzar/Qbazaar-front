/* Q Bazaar — auth flow helpers: password eye toggle, OTP auto-advance,
   and signing in when the final verification step is submitted. */
(function () {
  // forms that land on index.html complete the journey -> signed in
  document.querySelectorAll('form[action="index.html"]').forEach(function (f) {
    f.addEventListener('submit', function () { localStorage.setItem('qbAuth', '1'); });
  });
  document.querySelectorAll('.qb-eye').forEach(function (b) {
    b.addEventListener('click', function () {
      var inp = document.getElementById(b.getAttribute('data-eye'));
      if (inp) inp.type = inp.type === 'password' ? 'text' : 'password';
    });
  });
  // language pill: working dropdown (same list as the app's language popup)
  var LANGS = [['EN', '🇬🇧', 'English'], ['AR', '🇶🇦', 'العربية'], ['HI', '🇮🇳', 'हिन्दी'], ['UR', '🇵🇰', 'اردو'],
    ['ML', '🇮🇳', 'മലയാളം'], ['BN', '🇧🇩', 'বাংলা'], ['TL', '🇵🇭', 'Tagalog'], ['FA', '🇮🇷', 'فارسی (Farsi)'], ['TA', '🇮🇳', 'தமிழ்']];
  var lang = document.querySelector('.qb-lang');
  if (lang) {
    var cur = localStorage.getItem('qbLang') || 'EN';
    var setPill = function () {
      var l = LANGS.filter(function (x) { return x[0] === cur; })[0] || LANGS[0];
      lang.innerHTML = '<span>' + l[1] + '</span>' + l[0] + ' <span style="color:#c2c2c2">▾</span>';
    };
    setPill();
    lang.addEventListener('click', function (e) {
      e.stopPropagation();
      var old = document.querySelector('.qb-langpanel');
      if (old) { old.remove(); return; }
      var p = document.createElement('div');
      p.className = 'qb-langpanel';
      p.style.right = '40px';
      p.innerHTML = '<h5>Choose your language</h5>';
      LANGS.forEach(function (l) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = l[0] === cur ? 'on' : '';
        b.innerHTML = '<span>' + l[1] + '</span><span></span>';
        b.lastChild.textContent = l[2];
        b.addEventListener('click', function () {
          cur = l[0];
          try { localStorage.setItem('qbLang', cur); } catch (err) {}
          setPill();
          p.remove();
        });
        p.appendChild(b);
      });
      document.querySelector('.qb-ahead').appendChild(p);
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.qb-langpanel') && !e.target.closest('.qb-lang')) {
        var p = document.querySelector('.qb-langpanel');
        if (p) p.remove();
      }
    });
  }

  var otp = document.querySelectorAll('.qb-otp input');
  otp.forEach(function (o, i) {
    o.addEventListener('input', function () {
      o.value = o.value.replace(/\D/g, '').slice(0, 1);
      if (o.value && otp[i + 1]) otp[i + 1].focus();
    });
    o.addEventListener('keydown', function (e) {
      if (e.key === 'Backspace' && !o.value && otp[i - 1]) otp[i - 1].focus();
    });
  });
})();
