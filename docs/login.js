// Verifică dacă utilizatorul e deja logat
window.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("user");
  const email = localStorage.getItem("email");

  if (user && email) {
    window.location.href = "dashboard.html";
  }
});

// Login form submit
function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!username || !email) {
    alert("Please fill in both fields.");
    return;
  }

  localStorage.setItem("user", username);
  localStorage.setItem("email", email);

  // Redirecționează către dashboard
  window.location.href = "dashboard.html";
}
