fetch("../Navbar.html")
  .then(response => response.text())
  .then(data => {
    // Insert navbar into placeholder
    document.getElementById("navbarHTML").innerHTML = data;
    
    // After navbar is loaded, initialize all navbar functionality
    initNavbarFunctions();
  })
  .catch(error => console.error('Error loading navbar:', error));

// Initialize all navbar-related functions
function initNavbarFunctions() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;
  
  // ===== 1. Shrink navbar on scroll =====
  window.addEventListener("scroll", function() {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
  
  // ===== 2. Highlight active nav link based on CURRENT PAGE =====
  function highlightCurrentPageLink() {
    // Get the current page filename (e.g., "Home.html", "Package.html")
    const currentPage = window.location.pathname.split('/').pop();
    
    // Get all nav links
    const navLinks = document.querySelectorAll(".nav-links a");
    
    navLinks.forEach(function(link) {
      // Remove active class from all links
      link.classList.remove("active");
      
      // Get the href attribute (e.g., "Home.html", "Package.html")
      const linkPage = link.getAttribute("href");
      
      // If the link's href matches the current page, add active class
      if (linkPage === currentPage) {
        link.classList.add("active");
      }
      // Special case: For Home page when URL has no filename (just domain/)
      else if (currentPage === "" && linkPage === "Home.html") {
        link.classList.add("active");
      }
    });
  }
  
  // Call the function when page loads
  highlightCurrentPageLink();
  
  // ===== 3. Smooth scroll for anchor links (only for # links) =====
  const navLinks = document.querySelectorAll(".nav-links a");
  
  navLinks.forEach(function(link) {
    link.addEventListener("click", function(e) {
      const href = link.getAttribute("href");
      // Only handle internal anchor links (starting with #)
      if (href && href.startsWith("#")) {
        const targetId = href.replace("#", "");
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
      }
      // For regular page links (Home.html, Package.html), let them work normally
    });
  });
}