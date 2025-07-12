let web3;
let contract;

const contractAddress = "0x124377FCe14439248a4959ce528314aA3A897321"; // înlocuiește cu adresa ta reală
let abi;

async function loadAbi() {
  const response = await fetch('abi.json');
  abi = await response.json();
  contract = new web3.eth.Contract(abi, contractAddress);
}

async function connectWallet() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      web3 = new Web3(window.ethereum);
      await loadAbi();
      alert("Wallet connected!");
    } catch (error) {
      alert("Connection failed: " + error.message);
    }
  } else {
    alert("Please install MetaMask or compatible wallet!");
  }
}

async function deposit() {
  const amount = document.getElementById("amount").value;
  const duration = document.getElementById("duration").value;

  if (!amount || !duration) {
    return alert("Fill in both amount and duration.");
  }

  const accounts = await web3.eth.getAccounts();
  try {
    await contract.methods.deposit(duration).send({
      from: accounts[0],
      value: web3.utils.toWei(amount, "ether")
    });
    alert("Deposit successful!");
  } catch (err) {
    alert("Deposit failed: " + err.message);
  }
}
