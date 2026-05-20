fetch("../Footer.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("footerHTML").innerHTML = data;
  });