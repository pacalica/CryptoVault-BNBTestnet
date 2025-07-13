document.getElementById("loginBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const username = document.getElementById("username").value.trim();

  if (!email || !username) {
    alert("Please enter both email and username.");
    return;
  }

  localStorage.setItem("email", email);
  localStorage.setItem("username", username);

  // redirect către pagina principală
  window.location.href = "index.html";
});
