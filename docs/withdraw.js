// withdraw.js

document.addEventListener("DOMContentLoaded", () => {
  const withdrawBtn = document.getElementById("requestWithdraw");
  const withdrawMsg = document.getElementById("withdrawMessage");
  const amountInput = document.getElementById("withdrawAmount");

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    withdrawMsg.textContent = "You must be logged in.";
    withdrawBtn.disabled = true;
    return;
  }

  const allRequests = JSON.parse(localStorage.getItem("withdrawals")) || [];
  const userPending = allRequests.find(req => req.user === user.email && req.status === "pending");

  if (userPending) {
    withdrawMsg.textContent = "You already have a pending withdrawal request.";
    withdrawBtn.disabled = true;
    return;
  }

  withdrawBtn.addEventListener("click", () => {
    const amount = parseFloat(amountInput.value);

    if (!amount || amount <= 0) {
      withdrawMsg.textContent = "Please enter a valid amount.";
      return;
    }

    const withdrawal = {
      user: user.email,
      amount,
      fee: amount * 0.05,
      net: amount * 0.95,
      timestamp: Date.now(),
      status: "pending"
    };

    allRequests.push(withdrawal);
    localStorage.setItem("withdrawals", JSON.stringify(allRequests));

    withdrawMsg.textContent = `Withdrawal request submitted: ${withdrawal.net.toFixed(2)} USDT after 5% fee.`;
    withdrawBtn.disabled = true;
  });
});
