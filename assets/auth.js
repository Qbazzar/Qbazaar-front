/* Q Bazaar — auth flow helpers: password eye toggle + OTP auto-advance. */
(function () {
  document.querySelectorAll('.qb-eye').forEach(function (b) {
    b.addEventListener('click', function () {
      var inp = document.getElementById(b.getAttribute('data-eye'));
      if (inp) inp.type = inp.type === 'password' ? 'text' : 'password';
    });
  });
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
