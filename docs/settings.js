document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("You must be logged in.");
    return window.location.href = "index.html";
  }

  const emailInput = document.getElementById("email");
  const usernameInput = document.getElementById("username");

  emailInput.value = user.email || "";
  usernameInput.value = user.username || "";

  document.getElementById("settingsForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const newEmail = emailInput.value.trim();
    const newUsername = usernameInput.value.trim();

    if (!newEmail || !newUsername) {
      return alert("All fields are required.");
    }

    // Update localStorage
    user.email = newEmail;
    user.username = newUsername;
    localStorage.setItem("user", JSON.stringify(user));

    // Update in global users list
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map(u =>
      u.wallet === user.wallet ? { ...u, email: newEmail, username: newUsername } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Account updated successfully.");
    window.location.href = "dashboard.html";
  });
});
