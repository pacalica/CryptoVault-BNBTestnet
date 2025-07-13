document.addEventListener("DOMContentLoaded", function () {
  const userData = JSON.parse(localStorage.getItem("user"));

  if (!userData) {
    window.location.href = "index.html";
    return;
  }

  // Afișează numele utilizatorului
  document.getElementById("user-name").textContent = userData.username;

  // Calculează totalul investit
  let totalInvested = 0;
  let estimatedInterest = 0;

  const now = new Date();

  userData.deposits.forEach(deposit => {
    totalInvested += deposit.amount;

    // Calculează dobânda estimată (simplificată)
    const months = deposit.duration;
    const rate = deposit.interest;
    const interest = (deposit.amount * rate * months) / 100;
    estimatedInterest += interest;
  });

  // Afișează sumele
  document.getElementById("total-invested").textContent = totalInvested.toFixed(2) + " USDT";
  document.getElementById("balance").textContent = userData.balance.toFixed(2) + " USDT";
  document.getElementById("estimated-interest").textContent = estimatedInterest.toFixed(2) + " USDT";

  // Buton logout
  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "index.html";
  });
});
