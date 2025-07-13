document.getElementById('withdrawForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const amount = parseFloat(document.getElementById('withdrawAmount').value);
  if (isNaN(amount) || amount <= 0) {
    alert("Introdu o sumă validă.");
    return;
  }

  const withdrawals = JSON.parse(localStorage.getItem('withdrawals') || '[]');
  const hasPending = withdrawals.some(w => w.status === 'pending');
  if (hasPending) {
    alert('Ai deja o cerere de retragere în așteptare.');
    return;
  }

  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const currentBalance = parseFloat(userData.balance || 0);

  if (amount > currentBalance) {
    alert('Fonduri insuficiente. Nu poți retrage mai mult decât ai în cont.');
    return;
  }

  // Scădem suma retrasă (doar dacă cererea va fi aprobată ulterior)
  userData.balance = currentBalance - amount;
  localStorage.setItem('userData', JSON.stringify(userData));

  const newWithdrawal = {
    amount: amount,
    date: new Date().toLocaleString(),
    status: 'pending',
  };

  withdrawals.push(newWithdrawal);
  localStorage.setItem('withdrawals', JSON.stringify(withdrawals));
  alert('Cererea de retragere a fost trimisă. Status: pending.');

  document.getElementById('withdrawForm').reset();
});
