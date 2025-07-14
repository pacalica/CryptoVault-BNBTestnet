document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.email) {
    alert("You must be logged in.");
    return window.location.href = "index.html";
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const deposits = JSON.parse(localStorage.getItem("deposits") || "[]");

  const level1List = document.getElementById("level1List");
  const level2List = document.getElementById("level2List");

  const level1 = users.filter(u => u.referrer === user.wallet);
  const level2 = users.filter(u => level1.some(l1 => l1.wallet === u.referrer));

  const calcCommissions = (refList, level) => {
    return refList.map(ref => {
      const total = deposits
        .filter(d => d.email === ref.email && d.confirmed)
        .reduce((sum, d) => sum + Number(d.amount), 0);
      const percent = level === 1 ? 0.02 : 0.01;
      const commission = total * percent;

      return {
        email: ref.email,
        wallet: ref.wallet,
        total,
        commission
      };
    });
  };

  const displayReferrals = (target, data) => {
    if (data.length === 0) {
      target.innerHTML = "<li>No referrals yet.</li>";
    } else {
      data.forEach(ref => {
        const li = document.createElement("li");
        li.innerHTML = `Wallet: <b>${ref.wallet}</b><br>
                        Deposits: ${ref.total} USDT<br>
                        Commission Earned: <b>${ref.commission.toFixed(2)} USDT</b>`;
        target.appendChild(li);
      });
    }
  };

  const level1Data = calcCommissions(level1, 1);
  const level2Data = calcCommissions(level2, 2);

  displayReferrals(level1List, level1Data);
  displayReferrals(level2List, level2Data);
});
