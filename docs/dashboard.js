// Verifică dacă utilizatorul este logat
window.onload = function () {
  const email = localStorage.getItem("userEmail");
  const username = localStorage.getItem("userName");

  if (!email || !username) {
    window.location.href = "index.html"; // redirect la login
  } else {
    document.getElementById("user-name").textContent = username;
    document.getElementById("user-email").textContent = email;
  }
};

// Logout
function logout() {
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userName");
  window.location.href = "index.html";
}

// Buton "Open Deposit"
function openDeposit() {
  window.location.href = "deposit.html";
}
