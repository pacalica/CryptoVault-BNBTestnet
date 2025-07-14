document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("You must be logged in.");
    return window.location.href = "index.html";
  }

  const form = document.getElementById("passwordForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const current = document.getElementById("currentPassword").value;
    const newPass = document.getElementById("newPassword").value;
    const confirm = document.getElementById("confirmPassword").value;

    if (!current || !newPass || !confirm) {
      return alert("Please complete all fields.");
    }

    if (user.password !== current) {
      return alert("Current password is incorrect.");
    }

    if (newPass !== confirm) {
      return alert("New passwords do not match.");
    }

    user.password = newPass;
    localStorage.setItem("user", JSON.stringify(user));

    // Update in global users list
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map(u =>
      u.wallet === user.wallet ? { ...u, password: newPass } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Password updated successfully.");
    window.location.href = "dashboard.html";
  });
});
