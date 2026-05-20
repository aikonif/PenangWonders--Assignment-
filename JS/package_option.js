// Get the navbar element
const navbar = document.getElementById("navbar");

// When user scrolls, shrink the navbar
window.addEventListener("scroll", function () {

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  }

  else {
    navbar.classList.remove("scrolled");
  }

});

// Highlight active nav link
const sections =
document.querySelectorAll("section, div[id]");

const navLinks =
document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", function () {

  let currentSection = "";

  sections.forEach(function (section) {

    const sectionTop =
    section.offsetTop - 100;

    if (window.scrollY >= sectionTop) {

      currentSection =
      section.getAttribute("id");

    }

  });

  navLinks.forEach(function (link) {

    link.classList.remove("active");

    if (
      link.getAttribute("href")
      === "#" + currentSection
    ) {

      link.classList.add("active");

    }

  });

});

// Smooth scroll
navLinks.forEach(function (link) {

  link.addEventListener("click", function (e) {

    const targetId =
    link.getAttribute("href")
    .replace("#", "");

    const targetEl =
    document.getElementById(targetId);

    if (targetEl) {

      e.preventDefault();

      targetEl.scrollIntoView({
        behavior: "smooth"
      });

    }

  });

});

// LIGHTBOX
function openLightbox(img) {

  const lightbox =
  document.getElementById("lightbox");

  const lightboxImg =
  document.getElementById("lightbox-img");

  lightbox.style.display = "flex";

  lightboxImg.src = img.src;

}

// CLOSE LIGHTBOX
document.addEventListener(
  "DOMContentLoaded",
  function () {

    const lightbox =
    document.getElementById("lightbox");

    const closeBtn =
    document.querySelector(".close");

    closeBtn.onclick = function () {

      lightbox.style.display = "none";

    };

    lightbox.onclick = function (e) {

      if (e.target === lightbox) {

        lightbox.style.display = "none";

      }

    };

  }
);

// IMAGE SLIDERS
let sliders = {

  slide1: [
    "package1.jpg",
    "package1_2.jpg",
    "package1_3.jpg"
  ],

  slide2: [
    "package2.jpg",
    "package2_2.jpg",
    "package2_3.jpg"
  ],

  slide3: [
    "package3.jpg",
    "package3_2.jpg",
    "package3_3.jpg"
  ],

  slide4: [
    "package4.jpg",
    "package4_2.jpg",
    "package4_3.jpg"
  ],

  slide5: [
    "package5.jpg",
    "package5_2.jpg",
    "package5_3.jpg"
  ]

};

// CURRENT INDEXES
let indexes = {

  slide1: 0,
  slide2: 0,
  slide3: 0,
  slide4: 0,
  slide5: 0

};

// NEXT SLIDE
function nextSlide(id) {

  let img =
  document.getElementById(id);

  let images =
  sliders[id];

  img.style.opacity = "0";

  setTimeout(() => {

    indexes[id] =
    (indexes[id] + 1)
    % images.length;

    img.src =
    images[indexes[id]];

    img.style.opacity = "1";

  }, 250);

}

// PREVIOUS SLIDE
function prevSlide(id) {

  let img =
  document.getElementById(id);

  let images =
  sliders[id];

  img.style.opacity = "0";

  setTimeout(() => {

    indexes[id] =
    (indexes[id] - 1 + images.length)
    % images.length;

    img.src =
    images[indexes[id]];

    img.style.opacity = "1";

  }, 250);

}

// AUTO SLIDE
Object.keys(sliders).forEach(id => {

  setInterval(() => {

    // run only if slide exists
    if (document.getElementById(id)) {

      nextSlide(id);

    }

  }, 4000);

});

// SHOW / HIDE TEXT
function toggleText() {

  let text =
  document.getElementById("text");

  if (text.style.display === "none") {

    text.style.display = "block";

  }

  else {

    text.style.display = "none";

  }

}

// GET PACKAGE ID
const packageId =
document.body.dataset.package;

// FETCH JSON
fetch("../JSON/package_detail.json")

.then(response => response.json())

.then(data => {

  const pkg =
  data[packageId];

  // TITLE
  document.getElementById("title")
  .textContent =
  pkg.title;

  // PRICE
  document.getElementById("price")
  .textContent =
  "RM " + pkg.price;

  // DESCRIPTION
  document.getElementById("desc")
  .innerHTML = `

    <p>
      ${pkg.description}
    </p>

  `;

  // INCLUDES
  let includesHTML = `

    <p>
    -> Includes:<br><br>

  `;

  pkg.includes.forEach(item => {

    includesHTML +=
    `- ${item}<br>`;

  });

  includesHTML += "</p>";

  document.getElementById("includes")
  .innerHTML =
  includesHTML;

  // GUIDE
  document.getElementById("guide")
  .innerHTML = `

    <p>
      Tour Guide:<br><br>

      ${pkg.guide.name}<br>

      ${pkg.guide.phone}

      <br><br>

      ${pkg.guide.info}
    </p>

  `;

  // BOOK BUTTON
  const bookBtn =
  document.getElementById("bookBtn");

  if (bookBtn) {

    bookBtn.href =
    `booking.html?package=${packageId}`;

  }

});