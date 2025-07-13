window.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('withdrawalList');
  const withdrawals = JSON.parse(localStorage.getItem('withdrawals') || '[]');

  if (withdrawals.length === 0) {
    list.innerHTML = '<p>Nu există retrageri salvate.</p>';
    return;
  }

  withdrawals.forEach(w => {
    const div = document.createElement('div');
    div.className = `withdrawal-entry status-${w.status}`;
    div.innerHTML = `
      <p><strong>Suma:</strong> ${w.amount} USDT</p>
      <p><strong>Data:</strong> ${w.date}</p>
      <p><strong>Status:</strong> <span class="status">${w.status}</span></p>
    `;
    list.appendChild(div);
  });
});
