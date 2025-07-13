// docs/dashboard.js

document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user?.email || !user?.username) {
    window.location.href = 'index.html';
    return;
  }
  document.getElementById('username').textContent = user.username;
  document.getElementById('user-email').textContent = user.email;

  const totalDeposits = JSON.parse(localStorage.getItem('deposits') || '[]')
    .filter(d => d.email === user.email)
    .reduce((sum, d) => sum + parseFloat(d.amount), 0);
  
  document.getElementById('total-deposit').textContent = totalDeposits.toFixed(2) + ' USDT';
});
