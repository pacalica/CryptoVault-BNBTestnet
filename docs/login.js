document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");

  // Dacă utilizatorul este deja logat, redirecționează automat
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    window.location.href = "dashboard.html";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();

    if (email && username) {
      const user = {
        email,
        username,
        balance: 0,
        deposits: [],
        withdrawals: [],
        referrals: [],
      };

      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "dashboard.html";
    } else {
      alert("Please enter both email and username.");
    }
  });
});
