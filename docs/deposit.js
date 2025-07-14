document.getElementById("depositForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const amount = parseFloat(document.getElementById("amount").value);
  const duration = document.getElementById("duration").value;
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.email) {
    alert("You must be logged in.");
    return window.location.href = "index.html";
  }

  if (isNaN(amount) || amount <= 0) {
    return alert("Please enter a valid amount.");
  }

  if (!duration) {
    return alert("Please select a deposit duration.");
  }

  const deposits = JSON.parse(localStorage.getItem("deposits") || "[]");

  deposits.push({
    email: user.email,
    amount: amount,
    duration: parseInt(duration),
    timestamp: new Date().toISOString(),
    confirmed: false, // manually confirmed later by admin
  });

  localStorage.setItem("deposits", JSON.stringify(deposits));
  alert("Deposit submitted. Waiting for manual confirmation.");
  window.location.href = "dashboard.html";
});
