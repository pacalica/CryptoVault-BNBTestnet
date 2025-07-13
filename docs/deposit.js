document.addEventListener("DOMContentLoaded", () => {
  const email = localStorage.getItem("userEmail");
  const username = localStorage.getItem("userName");

  if (!email || !username) {
    window.location.href = "index.html";
    return;
  }

  const amountInput = document.getElementById("amount");
  const durationSelect = document.getElementById("duration");
  const estimatedInterest = document.getElementById("estimatedInterest");
  const totalReturn = document.getElementById("totalReturn");
  const planInfo = document.getElementById("planInfo");

  function updateEstimate() {
    const amount = parseFloat(amountInput.value) || 0;
    const duration = parseInt(durationSelect.value);

    let rate = 0;
    if (amount < 2000) {
      rate = 3.5;
      planInfo.innerText = "Plan 1: 3.5% / lună (0–1999 USDT)";
    } else if (amount <= 5000) {
      rate = 5.5;
      planInfo.innerText = "Plan 2: 5.5% / lună (2000–5000 USDT)";
    } else {
      rate = 7.5;
      planInfo.innerText = "Plan 3: 7.5% / lună (5001–10000 USDT)";
    }

    const interest = (amount * rate * duration) / 100;
    const total = amount + interest;

    estimatedInterest.innerText = interest.toFixed(2);
    totalReturn.innerText = total.toFixed(2);
  }

  amountInput.addEventListener("input", updateEstimate);
  durationSelect.addEventListener("change", updateEstimate);

  updateEstimate(); // Inițial
});
