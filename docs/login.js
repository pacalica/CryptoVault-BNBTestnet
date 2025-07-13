// Redirect dacă e deja logat
window.onload = function () {
  const email = localStorage.getItem("userEmail");
  const username = localStorage.getItem("userName");
  if (email && username) {
    window.location.href = "dashboard.html";
  }
};

// Funcție de logare
function loginUser() {
  const emailInput = document.getElementById("email").value.trim();
  const nameInput = document.getElementById("username").value.trim();

  if (emailInput === "" || nameInput === "") {
    alert("Please enter both email and username.");
    return;
  }

  localStorage.setItem("userEmail", emailInput);
  localStorage.setItem("userName", nameInput);

  // Redirect către pagina principală
  window.location.href = "dashboard.html";
}
