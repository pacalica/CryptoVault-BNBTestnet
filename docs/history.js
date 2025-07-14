document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.email) {
    alert("You must be logged in.");
    return window.location.href = "index.html";
  }

  const deposits = JSON.parse(localStorage.getItem("deposits") || "[]")
    .filter(dep => dep.email === user.email);
  const withdrawals = JSON.parse(localStorage.getItem("withdrawals") || "[]")
    .filter(w => w.email === user.email);

  const depositList = document.getElementById("depositList");
  const withdrawList = document.getElementById("withdrawList");

  if (deposits.length === 0) {
    depositList.innerHTML = "<li>No deposits yet.</li>";
  } else {
    deposits.forEach(dep => {
      const li = document.createElement("li");
      li.innerHTML = `Amount: <b>${dep.amount} USDT</b>, Duration: ${dep.duration} month(s), Status: ${dep.confirmed ? "✅ Confirmed" : "⏳ Pending"}, Date: ${new Date(dep.timestamp).toLocaleString()}`;
      depositList.appendChild(li);
    });
  }

  if (withdrawals.length === 0) {
    withdrawList.innerHTML = "<li>No withdrawals yet.</li>";
  } else {
    withdrawals.forEach(w => {
      const li = document.createElement("li");
      let emoji = w.status === "pending" ? "⏳" : (w.status === "approved" ? "✅" : "❌");
      li.innerHTML = `Amount: <b>${w.amount} USDT</b>, Status: ${emoji} ${w.status}, Date: ${new Date(w.timestamp).toLocaleString()}`;
      withdrawList.appendChild(li);
    });
  }
});
