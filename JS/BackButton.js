/* ============================================================
   BackButton.js — Penang Wonders
   • Handles back button functionality on package detail pages
   • Goes back to previous page or default page
   ============================================================ */

(function () {
  "use strict";

  // Get the back button element
  const backBtn = document.getElementById("backBtn");

  if (!backBtn) {
    console.warn("BackButton.js: backBtn element not found");
    return;
  }

  // Handle back button click
  backBtn.addEventListener("click", function () {
    // Check if there's a previous page in browser history
    if (window.history.length > 1) {
      // Go back to previous page
      window.history.back();
    } else {
      // If no history, go to Package.html as default
      window.location.href = "Package.html";
    }
  });

  // Optional: Add keyboard support (Alt+Left Arrow)
  document.addEventListener("keydown", function (e) {
    if ((e.altKey || e.metaKey) && e.key === "ArrowLeft") {
      backBtn.click();
    }
  });

})();
