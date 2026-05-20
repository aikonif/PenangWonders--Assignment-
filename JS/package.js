/* ============================================================
   package.js — Penang Wonders
   • Desktop sidebar checkbox filtering
   • Mobile bottom-sheet chip filtering
   • Both sync to the same active state
   ============================================================ */

(function () {
  "use strict";

  /* ── Shared filter state ── */
  var activeFilters = { activity: [], hotel: [] };

  /* ── DOM refs ── */
  var packages  = document.querySelectorAll(".package");
  var noResults = document.querySelector(".no-results");

  /* ── Desktop refs ── */
  var checkboxes = document.querySelectorAll(".filters input[type='checkbox']");
  var clearBtn   = document.getElementById("clear-filters");

  /* ── FAB + sheet refs ── */
  var filterFab  = document.getElementById("filterFab");
  var fabBadge   = document.getElementById("fabBadge");
  var backdrop   = document.getElementById("sheetBackdrop");
  var sheet      = document.getElementById("filterSheet");
  var sheetClose = document.getElementById("sheetClose");
  var sheetClear = document.getElementById("sheetClear");
  var sheetApply = document.getElementById("sheetApply");
  var chips      = document.querySelectorAll(".chip");

  /* ══════════════════════════════════════
     FILTER LOGIC
  ══════════════════════════════════════ */
  function applyFilters() {
    var visibleCount = 0;

    packages.forEach(function (pkg) {
      var activities = pkg.dataset.activities ? pkg.dataset.activities.split(",") : [];
      var hotels     = pkg.dataset.hotels     ? pkg.dataset.hotels.split(",")     : [];

      var actMatch = activeFilters.activity.length === 0 ||
        activeFilters.activity.some(function (f) { return activities.indexOf(f) !== -1; });

      var hotelMatch = activeFilters.hotel.length === 0 ||
        activeFilters.hotel.some(function (f) { return hotels.indexOf(f) !== -1; });

      var show = actMatch && hotelMatch;
      pkg.style.display = show ? "" : "none";
      if (show) visibleCount++;
    });

    if (noResults) {
      noResults.style.display = visibleCount === 0 ? "block" : "none";
    }

    updateBadge();
    syncDesktopCheckboxes();
  }

  function clearAllFilters() {
    activeFilters.activity = [];
    activeFilters.hotel    = [];
    applyFilters();
    syncChips();
  }

  function updateBadge() {
    var count = activeFilters.activity.length + activeFilters.hotel.length;
    if (fabBadge) {
      fabBadge.textContent = count;
      fabBadge.hidden = count === 0;
    }
  }

  /* ══════════════════════════════════════
     DESKTOP CHECKBOXES
  ══════════════════════════════════════ */
  checkboxes.forEach(function (cb) {
    cb.addEventListener("change", function () {
      var type  = cb.dataset.filter;
      var value = cb.value;

      if (cb.checked) {
        if (activeFilters[type].indexOf(value) === -1) {
          activeFilters[type].push(value);
        }
      } else {
        activeFilters[type] = activeFilters[type].filter(function (v) { return v !== value; });
      }

      applyFilters();
      syncChips();
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", clearAllFilters);
  }

  function syncDesktopCheckboxes() {
    checkboxes.forEach(function (cb) {
      var type  = cb.dataset.filter;
      var value = cb.value;
      cb.checked = activeFilters[type] && activeFilters[type].indexOf(value) !== -1;
    });
  }

  /* ══════════════════════════════════════
     BOTTOM SHEET — OPEN / CLOSE
  ══════════════════════════════════════ */
  function openSheet() {
    if (!sheet || !backdrop) return;
    syncChips();
    sheet.classList.add("sheet-open");
    backdrop.classList.add("visible");
    document.body.classList.add("menu-open");
  }

  function closeSheet() {
    if (!sheet || !backdrop) return;
    sheet.classList.remove("sheet-open");
    backdrop.classList.remove("visible");
    document.body.classList.remove("menu-open");
  }

  if (filterFab)  filterFab.addEventListener("click", openSheet);
  if (sheetClose) sheetClose.addEventListener("click", closeSheet);
  if (backdrop)   backdrop.addEventListener("click", closeSheet);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeSheet();
  });

  /* ══════════════════════════════════════
     CHIPS
  ══════════════════════════════════════ */
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var type  = chip.dataset.filter;
      var value = chip.dataset.value;

      if (activeFilters[type].indexOf(value) !== -1) {
        activeFilters[type] = activeFilters[type].filter(function (v) { return v !== value; });
        chip.classList.remove("chip-active");
      } else {
        activeFilters[type].push(value);
        chip.classList.add("chip-active");
      }

      updateBadge();
    });
  });

  function syncChips() {
    chips.forEach(function (chip) {
      var type  = chip.dataset.filter;
      var value = chip.dataset.value;
      var active = activeFilters[type] && activeFilters[type].indexOf(value) !== -1;
      chip.classList.toggle("chip-active", active);
    });
  }

  if (sheetApply) {
    sheetApply.addEventListener("click", function () {
      applyFilters();
      closeSheet();
    });
  }

  if (sheetClear) {
    sheetClear.addEventListener("click", function () {
      clearAllFilters();
    });
  }

})();