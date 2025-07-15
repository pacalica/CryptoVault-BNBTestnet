// deposit.js

document.addEventListener("DOMContentLoaded", () => {
  const confirmBtn = document.getElementById("confirmDeposit");
  const statusMsg = document.getElementById("statusMessage");

  confirmBtn.addEventListener("click", () => {
    const amount = parseFloat(document.getElementById("amount").value);
    const plan = parseInt(document.getElementById("plan").value);
    const duration = parseInt(document.getElementById("duration").value);

    if (!amount || amount <= 0) {
      statusMsg.textContent = "Please enter a valid amount.";
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      statusMsg.textContent = "User not logged in.";
      return;
    }

    const investment = {
      user: user.email,
      amount,
      plan,
      duration,
      timestamp: Date.now(),
      confirmed: false // se confirmă manual în admin
    };

    // Salvăm în localStorage
    const deposits = JSON.parse(localStorage.getItem("investments")) || [];
    deposits.push(investment);
    localStorage.setItem("investments", JSON.stringify(deposits));

    // Referral - o singură dată
    const ref = new URLSearchParams(window.location.search).get("ref");
    if (ref && !localStorage.getItem("referrerSet")) {
      const referrals = JSON.parse(localStorage.getItem("referrals")) || [];
      referrals.push({ referrer: ref, user: user.email, amount });
      localStorage.setItem("referrals", JSON.stringify(referrals));
      localStorage.setItem("referrerSet", "1");
    }

    statusMsg.textContent = "Deposit recorded! Awaiting admin confirmation.";
    confirmBtn.disabled = true;
  });
});
