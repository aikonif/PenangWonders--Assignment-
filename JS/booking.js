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

// EMAILJS INITIALIZE
emailjs.init(
  "4Qg2Y5BtK9l8_EzpN"
);

// GET URL PARAMETER
const params = new URLSearchParams(window.location.search);

// COUPON DISCOUNT LIST
const couponDiscounts = {
  NEWYEAR40: 0.40,
  SUMMER50: 0.50,
  RAYA35: 0.35
};

// PACKAGE DATA
let packageData = {};
let packagePrice = 0;

// ELEMENTS
const packageSelect =
document.getElementById('package');

const couponInput =
document.getElementById('coupon');

const couponToggle =
document.getElementById('hasCouponToggle');

const couponStatusText =
document.getElementById('couponStatusText');

const statusMessage =
document.getElementById('status');

const submitBtn =
document.querySelector('.submit-btn');

// FORMAT PRICE
function formatPrice(value) {

  const amount =
  Number(value);

  return Number.isInteger(amount)

  ? `RM ${amount}`

  : `RM ${amount.toFixed(2)}`;

}

// GET DISCOUNT
function getDiscount() {

  const couponCode =

  couponToggle.checked

  ? couponInput.value
    .trim()
    .toUpperCase()

  : '';

  return couponDiscounts[couponCode]
  || 0;

}

// GET FINAL PRICE
function getFinalPrice() {

  const discount =
  getDiscount();

  if (discount > 0) {

    return Math.round(

      packagePrice
      * (1 - discount)
      * 100

    ) / 100;

  }

  return packagePrice;

}

// UPDATE TOTAL
function updateTotal() {

  const totalInput =
  document.getElementById('total');

  // NO PRICE
  if (!packagePrice) {

    totalInput.value = '';

    return;

  }

  const discount =
  getDiscount();

  // WITH DISCOUNT
  if (discount > 0) {

    const discounted =
    getFinalPrice();

    totalInput.value =

    `${formatPrice(packagePrice)}
    → ${formatPrice(discounted)}`;

  }

  // WITHOUT DISCOUNT
  else {

    totalInput.value =
    formatPrice(packagePrice);

  }

}

// VALIDATE COUPON
function validateCoupon() {

  if (!couponToggle.checked) {

    statusMessage.textContent = '';

    return true;

  }

  const code =

  couponInput.value
  .trim()
  .toUpperCase();

  // EMPTY CODE
  if (!code) {

    statusMessage.textContent =
    'Please enter your promo code.';

    return false;

  }

  // INVALID CODE
  if (!couponDiscounts[code]) {

    statusMessage.textContent =
    'Invalid promo code. Please enter it again.';

    return false;

  }

  couponInput.value = code;

  statusMessage.textContent = '';

  return true;

}

// UPDATE COUPON FIELD
function updateCouponFields() {

  const hasCoupon =
  couponToggle.checked;

  const couponGroup =
  document.getElementById('couponInputGroup');

  // SHOW / HIDE
  couponGroup.style.display =
  hasCoupon ? 'block' : 'none';

  // STATUS TEXT
  couponStatusText.textContent =

  hasCoupon

  ? 'Coupon enabled'

  : 'No coupon';

  // RESET
  if (!hasCoupon) {

    couponInput.value = '';

    statusMessage.textContent = '';

  }

  updateTotal();

}

// UPDATE PACKAGE
function updatePackageSelection() {

  const selectedPackage =
  packageSelect.value;

  // INVALID PACKAGE
  if (

    !selectedPackage ||

    !packageData[selectedPackage]

  ) {

    packagePrice = 0;

    updateTotal();

    return;

  }

  // UPDATE PRICE
  packagePrice =

  Number(
    packageData[selectedPackage].price
  );

  updateTotal();

}

// EVENT LISTENER
couponToggle.addEventListener(
  'change',
  updateCouponFields
);

// PACKAGE CHANGE
packageSelect.addEventListener(
  'change',
  updatePackageSelection
);

// COUPON INPUT
couponInput.addEventListener(
  'input',
  function() {

    statusMessage.textContent = '';

    updateTotal();

  }
);

// COUPON VALIDATION
couponInput.addEventListener(
  'blur',
  validateCoupon
);

// INITIALIZE
updateCouponFields();

// FETCH PACKAGE JSON
fetch("JSON/package_option.json")

.then(response => response.json())

.then(data => {

  packageData = data;

  const packageId =
  params.get("package");

  // AUTO SELECT PACKAGE
  if (

    packageId &&

    packageData[packageId]

  ) {

    packageSelect.value =
    packageId;

    updatePackageSelection();

  }

})

// FETCH ERROR
.catch(error => {

  console.error(
    'Unable to load package data:',
    error
  );

});

// FORM SUBMIT
document

.getElementById("bookingForm")

.addEventListener(

  "submit",

  function(e){

    e.preventDefault();

    const selectedPackage =
    packageSelect.value;

    // PACKAGE CHECK
    if (!selectedPackage) {

      statusMessage.textContent =

      'Please choose your package before booking.';

      return;

    }

    // COUPON CHECK
    if (

      couponToggle.checked &&

      !validateCoupon()

    ) {

      return;

    }

    // COUPON CODE
    const couponCode =

    couponToggle.checked

    ? couponInput.value
      .trim()
      .toUpperCase()

    : '';

    // ORIGINAL PRICE
    const originalPrice =
    packagePrice;

    // FINAL PRICE
    const discountedPrice =
    getFinalPrice();

    // TEMPLATE PARAMS
    const templateParams = {

      customer_name:

      document.getElementById("name").value,

      customer_email:

      document.getElementById("email").value,

      customer_phone:

      document.getElementById("phone").value,

      package_code:
      selectedPackage,

      coupon_code:
      couponCode || "None",

      // ADDITIONAL PRICE INFO
      price_before_discount:

      formatPrice(
        originalPrice
      ),

      price_after_discount:

      formatPrice(
        discountedPrice
      ),

      total_price:

      document.getElementById("total").value

    };

    // DEBUG
    console.log(templateParams);

    /* EMAIL TO ADMIN */

    emailjs.send(

      "service_yel86rw",

      "template_8wsc90b",

      templateParams

    )

    /* EMAIL TO CUSTOMER */

    .then(function(){

      return emailjs.send(

        "service_yel86rw",

        "template_27riegs",

        templateParams

      );

    })

    /* SUCCESS */

    .then(function(){

      document.getElementById("status")
      .innerHTML =

      "✅ Booking successful! Redirecting to homepage...";

      document.getElementById("bookingForm")
      .reset();

      // REDIRECT
      setTimeout(function(){

        window.location.href =
        "Package.html";

      }, 2000);

    })

    /* ERROR */

    .catch(function(error){

      document.getElementById("status")
      .innerHTML =

      "❌ " + error.text;

      console.log(error);

    });

});