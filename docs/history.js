document.addEventListener('DOMContentLoaded', function () {
  const user = JSON.parse(localStorage.getItem('user'));
  const deposits = JSON.parse(localStorage.getItem('deposits')) || [];
  const withdrawals = JSON.parse(localStorage.getItem('withdrawals')) || [];

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const historyList = document.getElementById('historyList');

  // Funcție pentru formatare dată
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  }

  // Depuneri
  const userDeposits = deposits.filter(d => d.userEmail === user.email);
  if (userDeposits.length > 0) {
    const depositTitle = document.createElement('h3');
    depositTitle.textContent = "Deposit History";
    historyList.appendChild(depositTitle);

    userDeposits.forEach(dep => {
      const item = document.createElement('div');
      item.className = `history-item status-${dep.status}`;
      item.innerHTML = `
        <p><strong>Amount:</strong> ${dep.amount} USDT</p>
        <p><strong>Interest:</strong> ${dep.interest}%</p>
        <p><strong>Plan:</strong> ${dep.duration} months</p>
        <p><strong>Status:</strong> ${dep.status}</p>
        <p><strong>Date:</strong> ${formatDate(dep.timestamp)}</p>
      `;
      historyList.appendChild(item);
    });
  }

  // Retrageri
  const userWithdrawals = withdrawals.filter(w => w.userEmail === user.email);
  if (userWithdrawals.length > 0) {
    const withdrawTitle = document.createElement('h3');
    withdrawTitle.textContent = "Withdrawal History";
    historyList.appendChild(withdrawTitle);

    userWithdrawals.forEach(w => {
      const item = document.createElement('div');
      item.className = `history-item status-${w.status}`;
      item.innerHTML = `
        <p><strong>Amount:</strong> ${w.amount} USDT</p>
        <p><strong>Status:</strong> ${w.status}</p>
        <p><strong>Date:</strong> ${formatDate(w.timestamp)}</p>
      `;
      historyList.appendChild(item);
    });
  }

  if (userDeposits.length === 0 && userWithdrawals.length === 0) {
    historyList.innerHTML = "<p>No transactions found.</p>";
  }
});
