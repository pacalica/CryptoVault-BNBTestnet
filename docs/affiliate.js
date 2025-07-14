document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.wallet) {
    alert("You must be logged in.");
    return window.location.href = "index.html";
  }

  const baseUrl = window.location.origin + window.location.pathname.replace("affiliate.html", "index.html");
  const referralLink = `${baseUrl}?ref=${user.wallet}`;
  document.getElementById("refLink").value = referralLink;
});

function copyLink() {
  const input = document.getElementById("refLink");
  input.select();
  input.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert("Referral link copied to clipboard!");
}
