import { WalletConnectProvider } from '@walletconnect/ethereum-provider';

let provider, signer, contract;
let connectedAddress = null;
const contractAddress = "0x..."; // Înlocuiește cu adresa contractului tău
const contractABI = []; // Încarcă abi.json separat și importă-l aici sau copiază ABI-ul complet

const walletConnectProjectId = "ccf751f6c14bbf8158dbd7f2bb24ce7b";

async function connectWallet() {
  try {
    provider = await WalletConnectProvider.init({
      projectId: walletConnectProjectId,
      chains: [56],
      showQrModal: true,
    });

    await provider.connect();
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    signer = ethersProvider.getSigner();
    connectedAddress = await signer.getAddress();
    contract = new ethers.Contract(contractAddress, contractABI, signer);

    document.getElementById('wallet-address').textContent = shortenAddress(connectedAddress);
    localStorage.setItem('walletAddress', connectedAddress);

    console.log("Wallet connected:", connectedAddress);
  } catch (error) {
    console.error("Connection failed:", error);
  }
}

function shortenAddress(addr) {
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

function autoLogin() {
  const savedWallet = localStorage.getItem('walletAddress');
  if (savedWallet) {
    connectWallet();
  }
}

async function makeDeposit(planDuration) {
  const amountInput = document.getElementById('deposit-amount');
  const usdtAmount = parseFloat(amountInput.value);

  if (isNaN(usdtAmount) || usdtAmount <= 0) {
    alert("Enter a valid amount");
    return;
  }

  const usdtAddress = "0x55d398326f99059fF775485246999027B3197955"; // USDT BEP20
  const usdt = new ethers.Contract(usdtAddress, [
    "function approve(address spender, uint256 amount) public returns (bool)"
  ], signer);

  const amountInWei = ethers.utils.parseUnits(usdtAmount.toString(), 18);

  try {
    await usdt.approve(contractAddress, amountInWei);
    await contract.deposit(amountInWei, planDuration);

    alert("Deposit successful!");
  } catch (err) {
    console.error(err);
    alert("Deposit failed");
  }
}

window.onload = autoLogin;
document.getElementById('connect-btn').onclick = connectWallet;
document.getElementById('deposit-btn').onclick = () => {
  const selectedPlan = parseInt(document.querySelector('input[name="plan"]:checked').value);
  makeDeposit(selectedPlan);
};
