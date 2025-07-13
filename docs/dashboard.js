document.addEventListener('DOMContentLoaded', function () {
  const user = JSON.parse(localStorage.getItem('user'));
  const deposits = JSON.parse(localStorage.getItem('deposits')) || [];
  const referrals = JSON.parse(localStorage.getItem('referrals')) || { level1: [], level2: [] };

  if (!user) {
    window.location.href = 'index.html';
    return;
  }

  document.getElementById('userName').innerText = user.username;

  // Total depozite
  let totalDeposited = deposits.reduce((sum, dep) => sum + parseFloat(dep.amount), 0);

  // Calcul dobândă estimată
  function calculateInterest(amount) {
    if (amount < 2000) return amount * 0.035;
    if (amount <= 5000) return amount * 0.055;
    return amount * 0.075;
  }

  let expectedInterest = deposits.reduce((sum, dep) => sum + calculateInterest(parseFloat(dep.amount)), 0);

  // Calcul referral bonus (2% din lvl1, 1% din lvl2)
  const level1Bonus = referrals.level1.reduce((sum, ref) => sum + parseFloat(ref.amount) * 0.02, 0);
  const level2Bonus = referrals.level2.reduce((sum, ref) => sum + parseFloat(ref.amount) * 0.01, 0);
  const referralBonus = level1Bonus + level2Bonus;

  // Afișare în pagină
  document.getElementById('totalDeposited').innerText = totalDeposited.toFixed(2) + ' USDT';
  document.getElementById('expectedInterest').innerText = expectedInterest.toFixed(2) + ' USDT';
  document.getElementById('referralBonus').innerText = referralBonus.toFixed(2) + ' USDT';
});
