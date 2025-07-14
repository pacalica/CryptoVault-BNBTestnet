// script.js

document.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem("username");
  const totalInvested = parseFloat(localStorage.getItem("totalInvested")) || 0;

  const usernameDisplay = document.getElementById("usernameDisplay");
  const totalInvestedDisplay = document.getElementById("totalInvested");
  const estimatedInterestDisplay = document.getElementById("estimatedInterest");
  const vaultStatus = document.getElementById("vaultStatus");

  if (!username) {
    // Dacă nu există utilizator logat, redirecționează la login
    window.location.href = "index.html";
    return;
  }

  usernameDisplay.textContent = username;
  totalInvestedDisplay.textContent = `${totalInvested.toFixed(2)} USDT`;

  let interestRate = 0;
  if (totalInvested >= 0 && totalInvested < 2000) {
    interestRate = 0.035;
  } else if (totalInvested >= 2000 && totalInvested < 5000) {
    interestRate = 0.055;
  } else if (totalInvested >= 5000) {
    interestRate = 0.075;
  }

  const estimatedInterest = totalInvested * interestRate;
  estimatedInterestDisplay.textContent = `${estimatedInterest.toFixed(2)} USDT`;

  if (totalInvested > 0) {
    vaultStatus.textContent = "Active deposit";
  } else {
    vaultStatus.textContent = "No active deposits";
  }
});

// Funcție de logout
function logout() {
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  window.location.href = "index.html";
}
