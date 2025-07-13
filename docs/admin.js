<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CryptoVault | Dashboard</title>
  <link rel="stylesheet" href="style.css" />
</head>

<body>
  <div class="container">
    <h1>Welcome to CryptoVault</h1>
    <p id="user-info"></p>
    <div class="menu">
      <a href="dashboard.html">Dashboard</a>
      <a href="deposit.html">Open Deposit</a>
      <a href="deposits.html">Deposits</a>
      <a href="withdraw.html">Withdraw</a>
      <a href="history.html">History</a>
      <a href="team.html">My Team</a>
      <a href="affiliate.html">Affiliate Link</a>
      <a href="settings.html">Settings</a>
      <a href="security.html">Security</a>
      <a href="#" onclick="logout()">Exit</a>
    </div>
  </div>

  <script>
    window.onload = function () {
      const email = localStorage.getItem("userEmail");
      const name = localStorage.getItem("userName");
      if (!email || !name) {
        window.location.href = "index.html";
      } else {
        document.getElementById("user-info").innerText = `Logged in as: ${name} (${email})`;
      }
    };

    function logout() {
      localStorage.clear();
      window.location.href = "index.html";
    }
  </script>
</body>

</html>
