document.addEventListener("DOMContentLoaded", () => {
  const confirmBtn = document.querySelector("#confirm-deposit");
  const depositAddress = "0x124377FCe14439248a4959ce528314aA3A897321";

  confirmBtn.addEventListener("click", () => {
    const amount = prompt("Enter the amount you deposited (in USDT):");

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const userData = JSON.parse(localStorage.getItem("currentUser"));
    if (!userData) {
      alert("User not logged in.");
      window.location.href = "index.html";
      return;
    }

    const deposit = {
      amount: parseFloat(amount),
      address: depositAddress,
      date: new Date().toISOString(),
      status: "Pending",
    };

    let deposits = JSON.parse(localStorage.getItem("deposits")) || {};
    if (!deposits[userData.email]) {
      deposits[userData.email] = [];
    }

    deposits[userData.email].push(deposit);
    localStorage.setItem("deposits", JSON.stringify(deposits));

    alert("Deposit saved locally. It will be reviewed and confirmed manually.");
    window.location.href = "dashboard.html";
  });
});
