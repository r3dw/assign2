// Lightbox for photos and click-to-copy for color swatches.
(function () {
  var dlg = document.getElementById('lb');
  var toast = document.getElementById('toast');
  var timer;

  function say(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(function () { toast.classList.remove('show'); }, 1600);
  }

  document.addEventListener('click', function (e) {
    var photo = e.target.closest('.photo');
    if (photo && dlg) {
      dlg.querySelector('img').src = photo.dataset.full;
      dlg.querySelector('img').alt = photo.dataset.alt;
      dlg.querySelector('p').firstChild.textContent = photo.dataset.alt;
      dlg.querySelector('small').textContent = photo.dataset.credit;
      dlg.showModal();
      return;
    }
    if (dlg && e.target === dlg) { dlg.close(); return; }
    if (e.target.closest('[data-close]')) { dlg.close(); return; }

    var sw = e.target.closest('.swatch');
    if (sw) {
      var hex = sw.dataset.hex;
      (navigator.clipboard ? navigator.clipboard.writeText(hex) : Promise.reject())
        .then(function () { say('Copied ' + hex); })
        .catch(function () { say(hex); });
    }
  });
})();
