document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("withdrawForm");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.email) {
    alert("You must be logged in.");
    window.location.href = "index.html";
    return;
  }

  const withdrawals = JSON.parse(localStorage.getItem("withdrawals") || "[]");
  const pending = withdrawals.find(w => w.email === user.email && w.status === "pending");

  if (pending) {
    alert("You already have a pending withdrawal.");
    window.location.href = "dashboard.html";
    return;
  }

  form.addEventListener("submit", e => {
    e.preventDefault();

    const amount = parseFloat(document.getElementById("withdrawAmount").value);

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    withdrawals.push({
      email: user.email,
      amount: amount,
      status: "pending",
      timestamp: new Date().toISOString()
    });

    localStorage.setItem("withdrawals", JSON.stringify(withdrawals));
    alert("Withdrawal request submitted!");
    window.location.href = "dashboard.html";
  });
});
