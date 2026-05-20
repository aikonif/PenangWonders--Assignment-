// Back To Top Button
(function () {
  "use strict";

  // Wait for DOM to be ready if needed
  function initBackToTop() {
    const backToTopBtn = document.getElementById("backToTopBtn");

    if (!backToTopBtn) {
      console.warn("Back_To_Top.js: backToTopBtn element not found");
      return;
    }

    // Ensure button starts hidden
    backToTopBtn.style.display = "none";

    // Show button when scrolling
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = "flex";
      } else {
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
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBackToTop);
  } else {
    initBackToTop();
  }
})();