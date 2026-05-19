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
  window.location.href = 'package_alt.html';

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