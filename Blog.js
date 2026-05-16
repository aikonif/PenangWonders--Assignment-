(function() {
    emailjs.init("8RkR1k3XRpxkKYBaX");
})();

function sendEmail(event) {
    event.preventDefault();
    emailjs.sendForm('service_r3oe6mv', 'template_5ekb15k', event.target)
        .then(function() {
            console.log('SUCCESS!');
            showThankYou();
        }, function(error) {
            console.log('FAILED...', error);
        });
}

function showThankYou() {
    const message = document.getElementById('thankYouMessage');
    message.hidden = false;
    setTimeout(() => {
        message.hidden = true;
    }, 4000);
}

function showAllReviews() {
    document.querySelectorAll('.review-card.hidden-review').forEach(card => {
        card.classList.remove('hidden-review');
    });
    const showButton = document.getElementById('showAllReviewsButton');
    const lessButton = document.getElementById('seeLessReviewsButton');
    if (showButton) showButton.style.display = 'none';
    if (lessButton) lessButton.style.display = 'inline-flex';
}

function showLessReviews() {
    document.querySelectorAll('.reviews-grid .review-card:nth-child(n+4)').forEach(card => {
        card.classList.add('hidden-review');
        card.removeAttribute('open');
    });
    const showButton = document.getElementById('showAllReviewsButton');
    const lessButton = document.getElementById('seeLessReviewsButton');
    if (showButton) showButton.style.display = 'inline-flex';
    if (lessButton) lessButton.style.display = 'none';
}

const navbar = document.getElementById("navbar");

// When user scrolls, shrink the navbar
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Highlight the active nav link based on which section is visible
const sections = document.querySelectorAll("section, div[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", function () {
  let currentSection = "";

  sections.forEach(function (section) {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach(function (link) {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active");
    }
  });
});

// Smooth scroll when clicking nav links
navLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    const targetId = link.getAttribute("href").replace("#", "");
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});

const accessibilityToggle = document.getElementById('accessibilityToggle');
const savedAccessibility = localStorage.getItem('colorBlindMode') === 'true';

function applyAccessibilityMode(enabled) {
  document.body.classList.toggle('color-blind', enabled);

  if (accessibilityToggle) {
    accessibilityToggle.textContent = enabled ? 'Normal view' : 'Color-blind mode';
    accessibilityToggle.setAttribute('aria-pressed', enabled ? 'true' : 'false');
  }
}

function toggleAccessibilityMode() {
  const enabled = !document.body.classList.contains('color-blind');
  localStorage.setItem('colorBlindMode', enabled);
  applyAccessibilityMode(enabled);
}

if (accessibilityToggle) {
  accessibilityToggle.addEventListener('click', toggleAccessibilityMode);
  applyAccessibilityMode(savedAccessibility);
}

