// JSON - Updated path
function fetchData() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "JSON/Blog.json", true);  // ← CHANGED
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            displayData(data);
            showLessReviews();
        }
    };
    xhr.send();
}

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
    document.querySelectorAll('#reviews-grid .review-card:nth-child(n+4)').forEach(card => {
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


//JSON
window.onload = function () {
      fetchData();
    };

// GET data from local JSON file
      function fetchData() {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "JSON/Blog.json", true);
      xhr.onload = function () {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          displayData(data);
          showLessReviews(); // Hide reviews beyond the first 3 on page load
        }
      };
      xhr.send();
    }

    function addReview(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const name = formData.get('name')?.trim();
    const email = formData.get('email')?.trim();
    const rating = formData.get('rating');
    const message = formData.get('message')?.trim();

    if (!name || !email || !rating || !message) {
        return;
    }
    displayData([{ name, email, rating, description: message }]);
    form.reset();
    showLessReviews(); // Show only the first 3 reviews, including the new one
  }

// Display function
    function displayData(items) {
      const container = document.getElementById("reviews-grid");

      items.forEach(item => {
        const card = document.createElement("details");
        card.className = "review-card";

        card.innerHTML = `
          <summary>${item.name} - ${item.email}<br><span class="stars">Rating: ${renderStars(item.rating)}</span></summary>
          <p>${item.description}</p>
        `;

        container.appendChild(card);
        showThankYou();
      });
    }

    function renderStars(rating = 0) {
      const value = Math.max(0, Math.min(5, Number(rating) || 0));
      const filled = '★'.repeat(value);
      const empty = '☆'.repeat(5 - value);
      return filled + empty;
    }