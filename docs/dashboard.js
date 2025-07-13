// Verificare autologin
window.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("user");
  const email = localStorage.getItem("email");

  if (!user || !email) {
    // Nu e logat → redirecționează la login
    window.location.href = "index.html";
    return;
  }

  // Afișează numele și emailul utilizatorului
  document.getElementById("displayName").textContent = user;
  document.getElementById("displayEmail").textContent = email;
});

// Logout
function handleLogout() {
  localStorage.removeItem("user");
  localStorage.removeItem("email");
  window.location.href = "index.html";
}

// Navigare în meniu lateral (opțional activare vizuală)
const navItems = document.querySelectorAll(".sidebar a");
navItems.forEach(item => {
  item.addEventListener("click", () => {
    navItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");
  });
});
