/* Q Bazaar — reusable photo upload + preview + crop component.
   Opens from "Change Profile photo" (and window.QBCropper.open(cb) anywhere):
   pick file -> drag to position + zoom slider inside a circular mask ->
   Save crops to a 512px square, persists to localStorage.qbAvatar and applies
   it to every avatar circle in the system. Success shows the design's
   mint-green toast (Figma 401:13703: 574x62 r14, #EAFFF7 bg, #07BD74 text). */
(function () {
  var CSS = ''
    + '.qb-crop-back{position:fixed;inset:0;background:rgba(30,30,30,.5);z-index:99996;display:flex;align-items:center;justify-content:center}'
    + '.qb-crop{background:#fff;border-radius:20px;box-shadow:0 24px 64px rgba(0,0,0,.25);width:min(430px,94vw);padding:26px 26px 22px;font-family:Poppins,sans-serif}'
    + '.qb-crop h3{font:600 20px Poppins;color:#212121;margin:0 0 4px;text-align:center}'
    + '.qb-crop p{font:400 13px Poppins;color:#9a9a9a;margin:0 0 16px;text-align:center}'
    + '.qb-crop-vp{position:relative;width:300px;height:300px;margin:0 auto;overflow:hidden;border-radius:14px;background:#f4f4f4;cursor:grab;touch-action:none}'
    + '.qb-crop-vp.drag{cursor:grabbing}'
    + '.qb-crop-vp img{position:absolute;left:0;top:0;transform-origin:0 0;user-select:none;pointer-events:none;max-width:none}'
    + '.qb-crop-mask{position:absolute;inset:0;pointer-events:none;'
    +   'background:radial-gradient(circle 130px at 50% 50%, transparent 129px, rgba(255,255,255,.75) 130px)}'
    + '.qb-crop-mask::after{content:"";position:absolute;left:50%;top:50%;width:260px;height:260px;transform:translate(-50%,-50%);'
    +   'border:2px dashed rgba(243,128,87,.85);border-radius:50%}'
    + '.qb-crop-zoom{display:flex;align-items:center;gap:12px;margin:18px 6px 4px;font:500 13px Poppins;color:#787878}'
    + '.qb-crop-zoom input{flex:1;accent-color:#F38057}'
    + '.qb-crop-btns{display:flex;gap:12px;margin-top:16px}'
    + '.qb-crop-btns .cancel{flex:1;background:#fff;border:1px solid #ededed;border-radius:10px;padding:13px;font:600 14px Poppins;color:#555;cursor:pointer}'
    + '.qb-crop-btns .save{flex:1.4;background:#F38057;border:0;border-radius:10px;padding:13px;font:600 14px Poppins;color:#fff;cursor:pointer;transition:background .18s}'
    + '.qb-crop-btns .save:hover{background:rgb(233,108,63)}'
    + '.qb-toast-design{position:fixed;top:92px;left:50%;transform:translateX(-50%);z-index:99997;'
    +   'background:rgb(234,255,247);color:rgb(7,189,116);border-radius:14px;min-height:62px;display:flex;align-items:center;gap:12px;'
    +   'padding:14px 44px;font:500 20px Poppins;max-width:min(574px,92vw);box-shadow:0 4px 40px rgba(161,161,161,.2)}'
    + '@media (max-width:600px){.qb-toast-design{top:84px;font-size:15px;min-height:52px;padding:12px 18px;width:92vw}}';
  var st = document.createElement('style'); st.textContent = CSS;
  (document.head || document.documentElement).appendChild(st);

  function designToast(msg) {
    var old = document.querySelector('.qb-toast-design');
    if (old) old.remove();
    var t = document.createElement('div');
    t.className = 'qb-toast-design';
    t.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgb(7,189,116)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4 4 10-10"/></svg><span></span>';
    t.lastChild.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 3200);
  }

  function openCropper(onDone) {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none';
    document.body.appendChild(input);
    input.addEventListener('change', function () {
      var f = input.files && input.files[0];
      input.remove();
      if (!f) return;
      var url = URL.createObjectURL(f);
      buildModal(url, onDone);
    });
    input.click();
  }

  function buildModal(url, onDone) {
    var back = document.createElement('div');
    back.className = 'qb-crop-back';
    back.innerHTML = ''
      + '<div class="qb-crop">'
      + '<h3>Update Profile Photo</h3>'
      + '<p>Drag to position and zoom — the circle is what everyone will see.</p>'
      + '<div class="qb-crop-vp"><img alt=""><div class="qb-crop-mask"></div></div>'
      + '<div class="qb-crop-zoom">Zoom <input type="range" min="100" max="300" value="100"></div>'
      + '<div class="qb-crop-btns"><button type="button" class="cancel">Cancel</button>'
      + '<button type="button" class="save">Save Photo</button></div>'
      + '</div>';
    document.body.appendChild(back);
    var vp = back.querySelector('.qb-crop-vp');
    var img = back.querySelector('img');
    var range = back.querySelector('input[type=range]');
    var state = { x: 0, y: 0, base: 1, zoom: 1, iw: 0, ih: 0 };

    img.onload = function () {
      state.iw = img.naturalWidth; state.ih = img.naturalHeight;
      state.base = Math.max(300 / state.iw, 300 / state.ih); // cover
      state.x = (300 - state.iw * state.base) / 2;
      state.y = (300 - state.ih * state.base) / 2;
      paint();
    };
    img.src = url;

    function scale() { return state.base * state.zoom; }
    function clamp() {
      var s = scale();
      state.x = Math.min(0, Math.max(300 - state.iw * s, state.x));
      state.y = Math.min(0, Math.max(300 - state.ih * s, state.y));
    }
    function paint() {
      clamp();
      img.style.transform = 'translate(' + state.x + 'px,' + state.y + 'px) scale(' + scale() + ')';
    }
    range.addEventListener('input', function () {
      var old = scale();
      state.zoom = range.value / 100;
      var nw = scale();
      // zoom towards the viewport centre
      state.x = 150 - (150 - state.x) * (nw / old);
      state.y = 150 - (150 - state.y) * (nw / old);
      paint();
    });
    var drag = null;
    vp.addEventListener('pointerdown', function (e) {
      drag = { px: e.clientX, py: e.clientY, x: state.x, y: state.y };
      vp.classList.add('drag');
      vp.setPointerCapture(e.pointerId);
    });
    vp.addEventListener('pointermove', function (e) {
      if (!drag) return;
      state.x = drag.x + (e.clientX - drag.px);
      state.y = drag.y + (e.clientY - drag.py);
      paint();
    });
    vp.addEventListener('pointerup', function () { drag = null; vp.classList.remove('drag'); });

    back.querySelector('.cancel').addEventListener('click', function () { back.remove(); });
    back.addEventListener('click', function (e) { if (e.target === back) back.remove(); });
    back.querySelector('.save').addEventListener('click', function () {
      var c = document.createElement('canvas');
      c.width = 512; c.height = 512;
      var ctx = c.getContext('2d');
      var s = scale();
      var f = 512 / 260; // crop circle diameter 260 within 300 viewport
      var off = (300 - 260) / 2;
      ctx.drawImage(img, (state.x - off) * f, (state.y - off) * f, state.iw * s * f, state.ih * s * f);
      var data = c.toDataURL('image/jpeg', 0.9);
      back.remove();
      try { localStorage.setItem('qbAvatar', data); } catch (e) {}
      applyAvatars();
      designToast('Your profile photo has been updated successfully.');
      if (onDone) onDone(data);
    });
  }

  // paint the saved photo onto every avatar circle (header FA, profile FA, seller BT...)
  function applyAvatars() {
    var data = null;
    try { data = localStorage.getItem('qbAvatar'); } catch (e) {}
    if (!data) return;
    var els = document.querySelectorAll('div, span, button, a');
    for (var i = 0; i < els.length; i++) {
      var e = els[i];
      if (e.dataset.qbAvatarized) continue;
      if (e.childElementCount !== 0 || (e.textContent || '').trim() !== 'FA') continue;
      // the round element is either the leaf itself (header button) or its parent
      var round = function (el) {
        if (!el) return false;
        var cs = getComputedStyle(el);
        return cs.borderRadius.indexOf('50%') !== -1 || parseInt(cs.borderRadius) >= 12;
      };
      var circle = round(e) ? e : (round(e.parentElement) ? e.parentElement : null);
      if (!circle) continue;
      e.dataset.qbAvatarized = '1';
      circle.style.backgroundImage = 'url(' + data + ')';
      circle.style.backgroundSize = 'cover';
      circle.style.backgroundPosition = 'center';
      if (circle === e) e.style.color = 'transparent';
      else e.style.opacity = '0';
    }
  }

  // trigger: "Change Profile photo" opens the cropper (suppress engine's instant toast)
  document.addEventListener('click', function (e) {
    var el = e.target;
    for (var i = 0; i < 3 && el; i++) {
      if (el.nodeType === 1 && /^Change Profile photo$/.test((el.textContent || '').trim())) {
        e.preventDefault(); e.stopImmediatePropagation();
        openCropper();
        return;
      }
      el = el.parentElement;
    }
  }, true);

  window.QBCropper = { open: openCropper, toast: designToast };
  applyAvatars();
  new MutationObserver(applyAvatars).observe(document.documentElement, { childList: true, subtree: true });
})();
