let web3;
let contract;
const contractAddress = "0x124377FCe14439248a4959ce528314aA3A897321"; // <- înlocuiește cu adresa ta reală

async function connectWallet() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      web3 = new Web3(window.ethereum);
      const response = await fetch("abi.json");
      const abi = await response.json();
      contract = new web3.eth.Contract(abi, contractAddress);
      alert("Wallet connected");
    } catch (err) {
      alert("Connection error: " + err.message);
    }
  } else {
    alert("Please install MetaMask or another Web3 wallet.");
  }
}

async function deposit() {
  const accounts = await web3.eth.getAccounts();
  const amount = document.getElementById("amount").value;
  const duration = document.getElementById("duration").value;
  if (!contract) return alert("Wallet not connected");
  contract.methods.deposit(duration).send({
    from: accounts[0],
    value: web3.utils.toWei(amount, "ether")
  });
}

async function withdraw() {
  const accounts = await web3.eth.getAccounts();
  if (!contract) return alert("Wallet not connected");
  contract.methods.withdrawPayout().send({
    from: accounts[0]
  });
}
