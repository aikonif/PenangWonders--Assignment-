/*
   Navbar.js — Penang Wonders
   • Fetches and injects Navbar.html into every page
   • Marks the active nav link based on current page
   • Handles scroll shrink effect
   • Controls hamburger menu open/close (mobile & tablet)
  */

(function () {
  "use strict";

  /* 1. Inject Navbar.html into <nav id="navbarHTML">*/
  fetch("Navbar.html")
    .then(function (res) { return res.text(); })
    .then(function (html) {
      var placeholder = document.getElementById("navbarHTML");
      if (!placeholder) return;
      placeholder.outerHTML = html;   // replace <nav id="navbarHTML"> with real navbar
      initNavbar();
    })
    .catch(function (err) {
      console.error("Navbar.js: could not load Navbar.html", err);
    });

  /* 2. Initialise everything once the navbar is in the DOM */
  function initNavbar() {
    var navbar  = document.getElementById("navbar");
    var btn     = document.getElementById("hamburgerBtn");
    var navList = document.getElementById("navLinks");

    if (!navbar || !btn || !navList) return;

    /* 2. Active link */
    var currentPage = window.location.pathname.split("/").pop() || "Home.html";
    navList.querySelectorAll("a").forEach(function (link) {
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
      }
    });

    /* 2. Scroll shrink */
    function onScroll() {
      if (window.scrollY > 10) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on load

    /* 2. Hamburger toggle */
    btn.addEventListener("click", function () {
      var isOpen = btn.classList.contains("open");
      isOpen ? closeMenu() : openMenu();
    });

    /* 2. Close on any nav link click */
    navList.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    /* 2. Close on Escape key */
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });

    /* 2. Close when viewport expands past mobile breakpoint */
    var mq = window.matchMedia("(min-width: 769px)");
    var mqHandler = function (e) { if (e.matches) closeMenu(); };
    if (mq.addEventListener) {
      mq.addEventListener("change", mqHandler);
    } else {
      mq.addListener(mqHandler); // Safari < 14 fallback
    }

    /* 2. Helpers */
    function openMenu() {
      btn.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
      navList.classList.add("nav-open");
      document.body.classList.add("menu-open");
    }

    function closeMenu() {
      btn.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      navList.classList.remove("nav-open");
      document.body.classList.remove("menu-open");
    }
  }

})();