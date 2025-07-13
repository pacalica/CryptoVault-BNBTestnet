document.addEventListener('DOMContentLoaded', function () {
  const user = JSON.parse(localStorage.getItem('user'));
  const deposits = JSON.parse(localStorage.getItem('deposits')) || [];
  const withdrawals = JSON.parse(localStorage.getItem('withdrawals')) || [];

  const withdrawForm = document.getElementById('withdrawForm');
  const statusText = document.getElementById('withdrawStatus');

  if (!user) {
    window.location.href = "index.html";
  }

  // Calculează soldul total activ
  const totalBalance = deposits
    .filter(dep => dep.userEmail === user.email && dep.status === 'confirmed')
    .reduce((acc, dep) => {
      const profit = dep.amount * (dep.interest / 100);
      return acc + dep.amount + profit;
    }, 0);

  // Verifică dacă există o retragere în așteptare
  const pendingWithdrawals = withdrawals.filter(w => w.userEmail === user.email && w.status === 'pending');
  if (pendingWithdrawals.length > 0) {
    withdrawForm.style.display = 'none';
    statusText.textContent = "You already have a pending withdrawal.";
    return;
  }

  withdrawForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const amount = parseFloat(document.getElementById('withdrawAmount').value);
    if (isNaN(amount) || amount <= 0) {
      statusText.textContent = "Please enter a valid amount.";
      return;
    }

    if (amount > totalBalance) {
      statusText.textContent = "Insufficient balance for withdrawal.";
      return;
    }

    withdrawals.push({
      userEmail: user.email,
      amount,
      status: 'pending',
      timestamp: Date.now()
    });

    localStorage.setItem('withdrawals', JSON.stringify(withdrawals));
    statusText.textContent = "Withdrawal request submitted.";
    withdrawForm.reset();
    withdrawForm.style.display = 'none';
  });
});
