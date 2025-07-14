// Verificare dacă userul este autentificat
document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const wallet = localStorage.getItem("wallet") || "unknown";

  if (!username || !email) {
    window.location.href = "index.html"; // Redirect dacă nu este logat
    return;
  }

  // Afișare date utilizator în dashboard
  const userElem = document.getElementById("username");
  const emailElem = document.getElementById("useremail");
  if (userElem) userElem.textContent = username;
  if (emailElem) emailElem.textContent = email;

  // Total investit (sumă preluată din localStorage sau 0)
  const invested = parseFloat(localStorage.getItem("totalInvested") || "0");
  const interest = calculateInterest(invested);
  const referralBonus = parseFloat(localStorage.getItem("refBonus") || "0");

  const investedElem = document.getElementById("totalInvested");
  const interestElem = document.getElementById("interestEstimate");
  const refBonusElem = document.getElementById("refBonus");

  if (investedElem) investedElem.textContent = `${invested.toFixed(2)} USDT`;
  if (interestElem) interestElem.textContent = `${interest.toFixed(2)} USDT`;
  if (refBonusElem) refBonusElem.textContent = `${referralBonus.toFixed(2)} USDT`;

  // Link afiliat
  const link = `${window.location.origin}/?ref=${wallet}`;
  const refLink = document.getElementById("refLink");
  if (refLink) refLink.value = link;
});

// Funcție pentru copiere link referral
function copyReferral() {
  const refLink = document.getElementById("refLink");
  if (refLink) {
    refLink.select();
    refLink.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("Referral link copied!");
  }
}

// Funcție calcul dobândă estimativă
function calculateInterest(amount) {
  if (amount >= 0 && amount < 2000) return amount * 0.035;
  if (amount >= 2000 && amount <= 5000) return amount * 0.055;
  if (amount > 5000) return amount * 0.075;
  return 0;
}

// Logout
function logout() {
  if (confirm("Are you sure you want to log out?")) {
    localStorage.clear();
    window.location.href = "index.html";
  }
}
