document.addEventListener("DOMContentLoaded", function () {
  const email = localStorage.getItem("userEmail");
  const username = localStorage.getItem("userName");

  if (!email || !username) {
    window.location.href = "index.html";
    return;
  }

  // Valori implicite
  let totalDeposited = 0;
  let interestEarned = 0;
  let referralBonus = 0;
  let availableBalance = 0;

  // Preluare depozite
  const deposits = JSON.parse(localStorage.getItem("deposits")) || [];
  const myDeposits = deposits.filter((d) => d.email === email);

  // Calcul depozite și dobândă
  myDeposits.forEach((d) => {
    const amount = parseFloat(d.amount);
    const plan = d.plan;
    const duration = parseInt(d.duration);
    const startDate = new Date(d.date);
    const now = new Date();
    const timePassed = Math.max((now - startDate) / (1000 * 60 * 60 * 24 * 30), 0); // luni trecute

    let rate = 0;
    if (amount < 2000) rate = 3.5;
    else if (amount <= 5000) rate = 5.5;
    else rate = 7.5;

    const earned = amount * (rate / 100) * Math.min(timePassed / duration, 1);

    totalDeposited += amount;
    interestEarned += earned;
  });

  // Preluare referal bonus
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = users.find((u) => u.email === email);
  referralBonus = currentUser?.referralBonus || 0;

  // Preluare retrageri
  const withdrawals = JSON.parse(localStorage.getItem("withdrawals")) || [];
  const userWithdrawals = withdrawals.filter((w) => w.email === email && w.status === "successful");
  const withdrawnAmount = userWithdrawals.reduce((sum, w) => sum + parseFloat(w.amount), 0);

  // Sold disponibil = dobândă + bonus - retrageri efectuate
  availableBalance = interestEarned + referralBonus - withdrawnAmount;

  // Afișare în pagină
  document.getElementById("totalDeposited").innerText = `${totalDeposited.toFixed(2)} USDT`;
  document.getElementById("interestEarned").innerText = `${interestEarned.toFixed(2)} USDT`;
  document.getElementById("referralBonus").innerText = `${referralBonus.toFixed(2)} USDT`;
  document.getElementById("availableBalance").innerText = `${availableBalance.toFixed(2)} USDT`;
});

function logout() {
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userName");
  window.location.href = "index.html";
}
