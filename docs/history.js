// history.js

document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("historyBody");

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    tableBody.innerHTML = `<tr><td colspan="5">You are not logged in.</td></tr>`;
    return;
  }

  const allRequests = JSON.parse(localStorage.getItem("withdrawals")) || [];
  const userRequests = allRequests.filter(req => req.user === user.email);

  if (userRequests.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5">No withdrawal requests found.</td></tr>`;
    return;
  }

  userRequests.sort((a, b) => b.timestamp - a.timestamp).forEach(req => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${req.amount.toFixed(2)} USDT</td>
      <td>${req.fee.toFixed(2)}</td>
      <td>${req.net.toFixed(2)}</td>
      <td class="${req.status}">${req.status}</td>
      <td>${new Date(req.timestamp).toLocaleString()}</td>
    `;
    tableBody.appendChild(tr);
  });
});
