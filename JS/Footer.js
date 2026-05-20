fetch("Footer.html")
  .then(response => response.text())
  .then(data => {
    const footerContainer = document.getElementById("footerHTML");
    if (footerContainer) {
      footerContainer.innerHTML = data;
    }
  })
  .catch(error => {
    console.error('Footer load failed:', error);
  });