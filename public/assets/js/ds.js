// Faked, in-browser interactions for the design-system demos. Nothing is saved.
(function () {
  document.querySelectorAll('[role="switch"]').forEach(function (s) {
    s.addEventListener('click', function () {
      s.setAttribute('aria-checked', s.getAttribute('aria-checked') === 'true' ? 'false' : 'true');
    });
  });

  document.querySelectorAll('[role="tablist"]').forEach(function (list) {
    var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
    function select(t) {
      tabs.forEach(function (x) {
        var on = x === t;
        x.setAttribute('aria-selected', on);
        x.tabIndex = on ? 0 : -1;
        document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
      });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var j = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : -1;
        if (j < 0) return;
        j = (j + tabs.length) % tabs.length;
        select(tabs[j]); tabs[j].focus(); e.preventDefault();
      });
    });
  });

  document.querySelectorAll('[data-toggle-pressed]').forEach(function (b) {
    b.addEventListener('click', function () {
      b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
    });
  });

  // filter chips: "All" is exclusive, the others toggle and filter the list rows.
  document.querySelectorAll('[data-chips]').forEach(function (group) {
    var chips = Array.prototype.slice.call(group.querySelectorAll('.fchip'));
    var rows = document.querySelectorAll('[data-row]');
    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        var all = c.dataset.filter === 'all';
        chips.forEach(function (x) { x.setAttribute('aria-pressed', x === c ? 'true' : 'false'); });
        if (!all) c.setAttribute('aria-pressed', 'true');
        rows.forEach(function (r) { r.hidden = !all && r.dataset.row !== c.dataset.filter; });
      });
    });
  });

  var dlg = document.getElementById('modal');
  document.querySelectorAll('[data-open]').forEach(function (b) { b.addEventListener('click', function () { dlg.showModal(); }); });
  document.querySelectorAll('[data-close]').forEach(function (b) { b.addEventListener('click', function () { dlg.close(); }); });
  if (dlg) dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });

  var panel = document.getElementById('panel');
  document.querySelectorAll('[data-panel]').forEach(function (b) { b.addEventListener('click', function () { panel.hidden = !panel.hidden; }); });
  document.querySelectorAll('[data-panel-close]').forEach(function (b) { b.addEventListener('click', function () { panel.hidden = true; }); });
})();
