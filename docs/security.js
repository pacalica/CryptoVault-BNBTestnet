document.addEventListener("DOMContentLoaded", () => {
  const email = localStorage.getItem("email") || "-";
  const username = localStorage.getItem("username") || "-";

  document.getElementById("currentEmail").textContent = email;
  document.getElementById("currentUsername").textContent = username;
});

function resetEmail() {
  const newEmail = document.getElementById("newEmail").value.trim();
  if (newEmail && newEmail.includes("@")) {
    localStorage.setItem("email", newEmail);
    alert("Email updated!");
    document.getElementById("currentEmail").textContent = newEmail;
    document.getElementById("newEmail").value = "";
  } else {
    alert("Please enter a valid email.");
  }
}

function resetUsername() {
  const newUsername = document.getElementById("newUsername").value.trim();
  if (newUsername.length >= 3) {
    localStorage.setItem("username", newUsername);
    alert("Username updated!");
    document.getElementById("currentUsername").textContent = newUsername;
    document.getElementById("newUsername").value = "";
  } else {
    alert("Username must be at least 3 characters.");
  }
}

function resetAll() {
  if (confirm("Are you sure you want to log out and clear all data?")) {
    localStorage.clear();
    window.location.href = "index.html";
  }
}

function logout() {
  localStorage.clear();
}
