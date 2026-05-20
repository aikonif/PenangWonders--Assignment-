const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

/* ── Mobile hamburger ── */
function toggleMenu(btn) {
  btn.classList.toggle('open');
  document.getElementById('mobileMenu').classList.toggle('open');
}

/* ── Touch / tap to expand cards on mobile ── */
function toggleCard(card) {
  const isMobile = window.matchMedia('(hover: none)').matches;
  if (!isMobile) return; // desktop uses CSS :hover

  const wasActive = card.classList.contains('active');

  // Close all cards
  document.querySelectorAll('.promo-card').forEach(c => c.classList.remove('active'));

  // Toggle clicked one
  if (!wasActive) card.classList.add('active');
}

/* Close mobile menu on outside click */
document.addEventListener('click', function(e) {
  const menu = document.getElementById('mobileMenu');
  const ham  = document.querySelector('.hamburger');
  if (menu.classList.contains('open') && !menu.contains(e.target) && !ham.contains(e.target)) {
    menu.classList.remove('open');
    ham.classList.remove('open');
  }
});

function showPromoCode(event) {
  event.stopPropagation();
  window.location.href = 'booking.html';
}

function hidePromoCode() {
  const modal = document.getElementById('promoModal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

document.getElementById('promoClose').addEventListener('click', hidePromoCode);
document.getElementById('promoModal').addEventListener('click', function(e) {
  if (e.target === this) hidePromoCode();
});

document.getElementById('promoCopyBtn').addEventListener('click', function() {
  const code = document.getElementById('promoCodeText').textContent.trim();
  const note = document.getElementById('promoNote');
  const btn  = this;

  btn.textContent = 'Copied ✓';
  note.textContent = 'Copied! Redirecting to packages…';
  note.classList.add('visible');
  window.location.href = 'booking.html';

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(code).catch(() => {
      fallbackCopy(code);
    });
  } else {
    fallbackCopy(code);
  }
});

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try { document.execCommand('copy'); } catch (_) {}
  document.body.removeChild(ta);
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && document.getElementById('promoModal').classList.contains('open')) {
    hidePromoCode();
  }
});

/* ── CARD TOGGLE (tap on mobile) ── */
    function toggleCard(card) {
      var wasActive = card.classList.contains('active');
      document.querySelectorAll('.promo-card').forEach(function (c) {
        c.classList.remove('active');
      });
      if (!wasActive) card.classList.add('active');
    }

    /* ── PROMO MODAL ── */
    function showPromoCode(event) {
      event.stopPropagation();
      var code  = event.currentTarget.getAttribute('data-promo') || '';
      var modal = document.getElementById('promoModal');
      var txt   = document.getElementById('promoCodeText');
      var note  = document.getElementById('promoNote');
      if (!modal) return;
      if (txt)  txt.textContent  = code;
      if (note) note.textContent = '';
      modal.setAttribute('aria-hidden', 'false');
      modal.classList.add('is-open');
    }

    document.addEventListener('DOMContentLoaded', function () {
      var modal    = document.getElementById('promoModal');
      var closeBtn = document.getElementById('promoClose');
      var copyBtn  = document.getElementById('promoCopyBtn');
      var note     = document.getElementById('promoNote');

      function closeModal() {
        if (!modal) return;
        modal.setAttribute('aria-hidden', 'true');
        modal.classList.remove('is-open');
      }

      if (closeBtn) closeBtn.addEventListener('click', closeModal);
      if (modal)    modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal();
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeModal();
      });

      if (copyBtn) {
        copyBtn.addEventListener('click', function () {
          var code = document.getElementById('promoCodeText').textContent || '';
          if (navigator.clipboard) {
            navigator.clipboard.writeText(code).then(function () {
              if (note) note.textContent = '✓ Copied to clipboard!';
            });
          } else {
            var ta = document.createElement('textarea');
            ta.value = code;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            if (note) note.textContent = '✓ Copied!';
          }
        });
      }
    });