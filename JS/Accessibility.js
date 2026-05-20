/* ══════════════════════════════════════════
   Accessibility Widget — Penang Wonders
   - Floating ♿ button + control panel
   - Floating ← back button (goes to previous page)
   No changes required in any HTML file.
   ══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ══════════════════════════════
     BACK BUTTON
     Shows only when there is a
     previous page in the session
     ══════════════════════════════ */

  const backBtn = document.createElement('button');
  backBtn.id = 'backBtn';
  backBtn.setAttribute('aria-label', 'Go back to previous page');
  backBtn.setAttribute('title', 'Go back');
  backBtn.innerHTML = '&#8592;'; /* ← arrow */
  document.body.appendChild(backBtn);

  /* Show the back button only if there is history to go back to */
  if (document.referrer && document.referrer !== window.location.href) {
    backBtn.classList.add('back-visible');
  }

  backBtn.addEventListener('click', function () {
    history.back();
  });


  /* ══════════════════════════════
     ACCESSIBILITY PANEL
     ══════════════════════════════ */

  const widget = document.createElement('div');
  widget.innerHTML = `
    <button id="accessibilityBtn" aria-label="Accessibility options" aria-expanded="false" aria-controls="accessibilityPanel" title="Accessibility">
      &#9855;
    </button>

    <div id="accessibilityPanel" role="dialog" aria-label="Accessibility settings">
      <h3>Accessibility</h3>

      <div class="a11y-row">
        <span class="a11y-label">Font Size</span>
        <div class="a11y-btn-group">
          <button class="a11y-btn" id="a11yFontDec" aria-label="Decrease font size" title="Decrease font size">&#8722;</button>
          <button class="a11y-btn" id="a11yFontInc" aria-label="Increase font size" title="Increase font size">&#43;</button>
        </div>
      </div>

      <div class="a11y-divider"></div>

      <div class="a11y-row">
        <label class="a11y-label" for="a11yDyslexia">Dyslexia Font</label>
        <label class="a11y-toggle">
          <input type="checkbox" id="a11yDyslexia">
          <span class="a11y-toggle-track"></span>
        </label>
      </div>

      <div class="a11y-row">
        <label class="a11y-label" for="a11yCursor">Large Cursor</label>
        <label class="a11y-toggle">
          <input type="checkbox" id="a11yCursor">
          <span class="a11y-toggle-track"></span>
        </label>
      </div>

      <div class="a11y-divider"></div>

      <button id="a11yReset">Reset All</button>
    </div>
  `;
  document.body.appendChild(widget);

  /* ── References ── */
  const btn      = document.getElementById('accessibilityBtn');
  const panel    = document.getElementById('accessibilityPanel');
  const fontDec  = document.getElementById('a11yFontDec');
  const fontInc  = document.getElementById('a11yFontInc');
  const dyslexia = document.getElementById('a11yDyslexia');
  const cursor   = document.getElementById('a11yCursor');
  const resetBtn = document.getElementById('a11yReset');

  const STORAGE_KEY = 'pw_a11y';
  const BASE_FONT   = 16;
  const STEP        = 2;
  const MIN_FONT    = 12;
  const MAX_FONT    = 24;

  /* ── State ── */
  let state = {
    fontSize:     BASE_FONT,
    dyslexiaFont: false,
    largeCursor:  false,
  };

  /* ── Persist ── */
  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) {}
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) state = Object.assign(state, JSON.parse(raw));
    } catch (_) {}
  }

  /* ── Apply ── */
  function apply() {
    document.documentElement.style.fontSize = state.fontSize + 'px';

    document.body.classList.toggle('a11y-dyslexia',     state.dyslexiaFont);
    document.body.classList.toggle('a11y-large-cursor', state.largeCursor);

    dyslexia.checked = state.dyslexiaFont;
    cursor.checked   = state.largeCursor;

    fontDec.disabled = state.fontSize <= MIN_FONT;
    fontInc.disabled = state.fontSize >= MAX_FONT;
  }

  /* ── Panel toggle ── */
  function openPanel() {
    panel.classList.add('a11y-open');
    btn.setAttribute('aria-expanded', 'true');
  }

  function closePanel() {
    panel.classList.remove('a11y-open');
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    panel.classList.contains('a11y-open') ? closePanel() : openPanel();
  });

  document.addEventListener('click', function (e) {
    if (!panel.contains(e.target) && e.target !== btn) closePanel();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closePanel();
  });

  /* ── Font size ── */
  fontInc.addEventListener('click', function () {
    if (state.fontSize < MAX_FONT) { state.fontSize += STEP; apply(); save(); }
  });

  fontDec.addEventListener('click', function () {
    if (state.fontSize > MIN_FONT) { state.fontSize -= STEP; apply(); save(); }
  });

  /* ── Toggles ── */
  dyslexia.addEventListener('change', function () {
    state.dyslexiaFont = this.checked; apply(); save();
  });

  cursor.addEventListener('change', function () {
    state.largeCursor = this.checked; apply(); save();
  });

  /* ── Reset ── */
  resetBtn.addEventListener('click', function () {
    state = { fontSize: BASE_FONT, dyslexiaFont: false, largeCursor: false };
    apply();
    save();
  });

  /* ── Init ── */
  load();
  apply();

})();