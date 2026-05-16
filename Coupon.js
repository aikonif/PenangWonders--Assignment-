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
