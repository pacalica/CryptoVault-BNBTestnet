// admin.js

document.addEventListener("DOMContentLoaded", () => {
  const withdrawalList = document.getElementById("withdrawalList");
  const userBalanceInput = document.getElementById("userBalance");
  const newBalanceInput = document.getElementById("newBalance");
  const updateBalanceBtn = document.getElementById("updateBalance");
  const updateMessage = document.getElementById("updateMessage");

  const balances = JSON.parse(localStorage.getItem("balances")) || {};
  const withdrawals = JSON.parse(localStorage.getItem("withdrawals")) || [];

  // Afișează cererile de retragere
  function displayWithdrawals() {
    withdrawalList.innerHTML = "";
    withdrawals.forEach((w, index) => {
      const item = document.createElement("div");
      item.className = "mb-4 p-2 border rounded bg-gray-800";
      item.innerHTML = `
        <p><strong>User:</strong> ${w.user}</p>
        <p><strong>Amount:</strong> ${w.amount} USDT</p>
        <p><strong>Status:</strong> <span class="font-bold">${w.status}</span></p>
        <button class="approve-btn bg-green-600 text-white px-2 py-1 rounded mr-2" data-index="${index}">Approve</button>
        <button class="reject-btn bg-red-600 text-white px-2 py-1 rounded" data-index="${index}">Reject</button>
      `;
      withdrawalList.appendChild(item);
    });
  }

  // Actualizează statusul cererii
  function updateWithdrawalStatus(index, newStatus) {
    if (withdrawals[index]) {
      withdrawals[index].status = newStatus;
      if (newStatus === "approved") {
        const user = withdrawals[index].user;
        const amount = parseFloat(withdrawals[index].amount);
        if (balances[user]) {
          balances[user] -= amount;
        }
      }
      localStorage.setItem("withdrawals", JSON.stringify(withdrawals));
      localStorage.setItem("balances", JSON.stringify(balances));
      displayWithdrawals();
    }
  }

  // Adaugă evenimente pentru butoanele de aprobare/respingere
  withdrawalList.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    if (e.target.classList.contains("approve-btn")) {
      updateWithdrawalStatus(index, "approved");
    } else if (e.target.classList.contains("reject-btn")) {
      updateWithdrawalStatus(index, "rejected");
    }
  });

  // Modifică manual soldul unui utilizator
  updateBalanceBtn.addEventListener("click", () => {
    const user = userBalanceInput.value.trim();
    const newBalance = parseFloat(newBalanceInput.value);
    if (!user || isNaN(newBalance)) {
      updateMessage.textContent = "Please enter valid user and balance.";
      updateMessage.classList.add("text-red-500");
      return;
    }
    balances[user] = newBalance;
    localStorage.setItem("balances", JSON.stringify(balances));
    updateMessage.textContent = `Balance for ${user} updated to ${newBalance} USDT.`;
    updateMessage.classList.remove("text-red-500");
    updateMessage.classList.add("text-green-500");
    userBalanceInput.value = "";
    newBalanceInput.value = "";
  });

  displayWithdrawals();
});
