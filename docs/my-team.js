// my-team.js

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("Please log in first.");
    window.location.href = "index.html";
    return;
  }

  const allUsers = JSON.parse(localStorage.getItem("users")) || [];
  const level1 = allUsers.filter(u => u.ref === user.wallet || u.ref === user.email);
  const level2 = allUsers.filter(u => level1.some(l1 => l1.wallet === u.ref || l1.email === u.ref));

  const level1List = document.getElementById("level1List");
  const level2List = document.getElementById("level2List");

  if (level1.length === 0) {
    level1List.innerHTML = "<li>No direct referrals yet.</li>";
  } else {
    level1.forEach(ref => {
      const li = document.createElement("li");
      li.textContent = `${ref.email || ref.wallet} – joined`;
      level1List.appendChild(li);
    });
  }

  if (level2.length === 0) {
    level2List.innerHTML = "<li>No indirect referrals yet.</li>";
  } else {
    level2.forEach(ref => {
      const li = document.createElement("li");
      li.textContent = `${ref.email || ref.wallet} – joined`;
      level2List.appendChild(li);
    });
  }
});
