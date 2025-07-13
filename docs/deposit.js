document.addEventListener('DOMContentLoaded', function () {
  const depositForm = document.getElementById('depositForm');
  const depositAddress = document.getElementById('depositAddress');
  const qrCode = document.getElementById('qrCode');
  const statusText = document.getElementById('statusText');

  const user = JSON.parse(localStorage.getItem('user')) || null;
  const deposits = JSON.parse(localStorage.getItem('deposits')) || [];

  if (!user) {
    window.location.href = "index.html";
  }

  // Adresa fixă de depunere
  const depositAddr = "0x124377FCe14439248a4959ce528314aA3A897321";
  depositAddress.textContent = depositAddr;

  new QRCode(qrCode, {
    text: depositAddr,
    width: 150,
    height: 150
  });

  depositForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const amount = parseFloat(document.getElementById('amount').value);
    const duration = document.getElementById('duration').value;

    if (isNaN(amount) || amount <= 0) {
      statusText.textContent = "Please enter a valid amount.";
      return;
    }

    let interest = 0;
    if (amount < 2000) {
      interest = 3.5;
    } else if (amount <= 5000) {
      interest = 5.5;
    } else if (amount <= 10000) {
      interest = 7.5;
    }

    deposits.push({
      userEmail: user.email,
      amount,
      duration,
      interest,
      timestamp: Date.now(),
      status: "pending"
    });

    localStorage.setItem('deposits', JSON.stringify(deposits));
    statusText.textContent = "Deposit submitted. Waiting for confirmation.";
    depositForm.reset();
  });
});
