// Get the navbar element
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

const filterCheckboxes = document.querySelectorAll('.filters input[type="checkbox"]');
const packages = document.querySelectorAll('.package');
const noResults = document.querySelector('.no-results');
const clearFiltersBtn = document.getElementById('clear-filters');

function applyFilters() {
  const activeFilters = {
    activity: [],
    hotel: []
  };

  // Collect all checked filters
  filterCheckboxes.forEach(checkbox => {
    if (checkbox.checked) {
      const filterType = checkbox.dataset.filter;
      activeFilters[filterType].push(checkbox.value);
    }
  });

  let visibleCount = 0;

  packages.forEach(pkg => {
    const pkgActivities = (pkg.dataset.activities || '').split(',').map(a => a.trim()).filter(Boolean);
    const pkgHotels = (pkg.dataset.hotels || '').split(',').map(h => h.trim()).filter(Boolean);

    // If no filters are selected, show all packages
    if (activeFilters.activity.length === 0 && activeFilters.hotel.length === 0) {
      pkg.classList.remove('hidden');
      visibleCount++;
      return;
    }

    // Check if package matches ANY of the selected activity filters
    const activityMatch = activeFilters.activity.length === 0 ||
                          activeFilters.activity.some(filter => pkgActivities.includes(filter));

    // Check if package matches ANY of the selected hotel filters
    const hotelMatch = activeFilters.hotel.length === 0 ||
                       activeFilters.hotel.some(filter => pkgHotels.includes(filter));

    // Package is visible if it matches filters from both categories (if both have selections)
    // OR if it matches filters from at least one category
    const shouldShow = (activityMatch && hotelMatch) ||
                      (activeFilters.activity.length > 0 && activityMatch && activeFilters.hotel.length === 0) ||
                      (activeFilters.hotel.length > 0 && hotelMatch && activeFilters.activity.length === 0);

    if (shouldShow) {
      pkg.classList.remove('hidden');
      visibleCount++;
    } else {
      pkg.classList.add('hidden');
    }
  });

  // Show/hide no results message
  if (noResults) {
    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
  }

  // Update clear button visibility
  if (clearFiltersBtn) {
    clearFiltersBtn.style.display = (activeFilters.activity.length > 0 || activeFilters.hotel.length > 0) ? 'block' : 'none';
  }
}

function clearAllFilters() {
  filterCheckboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
  applyFilters();
}

// Add event listeners to all checkboxes
filterCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', applyFilters);
});

// Add event listener to clear button
if (clearFiltersBtn) {
  clearFiltersBtn.addEventListener('click', clearAllFilters);
}

// Apply filters on page load (in case some checkboxes are pre-checked)
document.addEventListener('DOMContentLoaded', applyFilters);