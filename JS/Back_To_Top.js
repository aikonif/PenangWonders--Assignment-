// Back To Top Button
const backToTopBtn =
  document.getElementById("backToTopBtn");

// Show button when scrolling
window.addEventListener("scroll", () => {

  if (window.scrollY > 300) {
    backToTopBtn.style.display = "block";
  }
  else {
    backToTopBtn.style.display = "none";
  }

});

// Scroll to top
backToTopBtn.addEventListener("click", () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});