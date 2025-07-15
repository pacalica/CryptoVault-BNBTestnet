// dashboard.js

document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // Dacă utilizatorul nu e logat, redirecționăm către login
    window.location.href = "index.html";
    return;
  }

  // Afișăm datele utilizatorului în dashboard
  document.getElementById("userEmail").textContent = user.email || "N/A";
  document.getElementById("userName").textContent = user.username || "N/A";

  // Preluăm investiția totală din localStorage
  const investments = JSON.parse(localStorage.getItem("investments")) || [];
  let total = 0;

  investments.forEach(item => {
    if (!item.amount) return;
    total += parseFloat(item.amount);
  });

  document.getElementById("totalInvested").textContent = `${total.toFixed(2)} USDT`;
});
