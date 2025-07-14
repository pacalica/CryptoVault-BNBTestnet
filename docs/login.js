// login.js

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const usernameInput = document.getElementById("username");

  // Autologin dacă datele sunt deja salvate
  const savedEmail = localStorage.getItem("email");
  const savedUsername = localStorage.getItem("username");

  if (savedEmail && savedUsername) {
    window.location.href = "dashboard.html";
    return;
  }

  // Când formularul este trimis
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const username = usernameInput.value.trim();

    if (!email || !username) {
      alert("Te rugăm să completezi emailul și numele de utilizator.");
      return;
    }

    // Salvăm datele în localStorage
    localStorage.setItem("email", email);
    localStorage.setItem("username", username);

    // Redirecționează spre aplicație
    window.location.href = "dashboard.html";
  });
});
