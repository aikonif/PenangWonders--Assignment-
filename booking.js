// EMAILJS INITIALIZE
emailjs.init(
  "4Qg2Y5BtK9l8_EzpN"
);

// GET URL PARAMETER
const params =
new URLSearchParams(
  window.location.search
);

// PACKAGE ID
const packageId =
params.get("package");

// DISPLAY PACKAGE CODE
document.getElementById("package").value =
packageId || "UNKNOWN";

// FETCH PACKAGE DATA
fetch("package_option.json")

.then(response => response.json())

.then(data => {

  const pkg =
  data[packageId];

  // PRICE
  const price =
  pkg.price;

  // QUANTITY
  let quantity = 1;

  // TOTAL
  let total =
  price * quantity;

  // DISPLAY TOTAL
  document.getElementById("total").value =
  "RM " + total;

});

// FORM SUBMIT
document
.getElementById("bookingForm")

.addEventListener(
  "submit",
  function(e){

    e.preventDefault();

    const templateParams = {

      customer_name:
      document.getElementById("name").value,

      customer_email:
      document.getElementById("email").value,

      customer_phone:
      document.getElementById("phone").value,

      package_code:
      document.getElementById("package").value,

      total_price:
      document.getElementById("total").value,

      coupon_code:
      document.getElementById("coupon").value
      || "None"

    };

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
        "package_alt.html";

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