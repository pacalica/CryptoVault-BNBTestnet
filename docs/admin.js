// admin.js

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.email !== "admin@vault.app") {
    alert("Access denied.");
    window.location.href = "index.html";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const deposits = JSON.parse(localStorage.getItem("deposits")) || [];
  const withdraws = JSON.parse(localStorage.getItem("withdraws")) || [];

  const userList = document.getElementById("userList");
  const totalDeposits = document.getElementById("totalDeposits");
  const withdrawList = document.getElementById("withdrawList");

  // Afișăm utilizatorii
  users.forEach(u => {
    const li = document.createElement("li");
    li.textContent = `${u.email || u.wallet} – ref: ${u.ref || "none"}`;
    userList.appendChild(li);
  });

  // Suma totală a depozitelor
  const sum = deposits.reduce((acc, dep) => acc + parseFloat(dep.amount || 0), 0);
  totalDeposits.textContent = `${sum.toFixed(2)} USDT`;

  // Lista cereri retragere
  if (withdraws.length === 0) {
    withdrawList.innerHTML = "<li>No withdraw requests.</li>";
  } else {
    withdraws.forEach(w => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${w.email || w.wallet}</strong> – ${w.amount} USDT 
        (<span class="${w.status}">${w.status}</span>)
      `;
      withdrawList.appendChild(li);
    });
  }
});
