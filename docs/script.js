let provider;
let signer;
let contract;
let userAddress;
const CONTRACT_ADDRESS = "ADRESA_CONTRACTULUI_TAU"; // Înlocuiește cu adresa contractului tău
const USDT_ADDRESS = "ADRESA_USDT"; // Adresa USDT BEP20 (Mainnet: 0x55d398326f99059fF775485246999027B3197955)
const WALLETCONNECT_PROJECT_ID = "ccf751f6c14bbf8158dbd7f2bb24ce7b";

async function init() {
  if (localStorage.getItem("walletConnected") === "1") {
    await connectWallet();
  }
}

async function connectWallet() {
  try {
    const { ethers } = window;

    const walletConnectProvider = new window.WalletConnectProvider.default({
      projectId: WALLETCONNECT_PROJECT_ID,
      chains: [56], // BNB Chain Mainnet
      showQrModal: true,
    });

    await walletConnectProvider.enable();
    provider = new ethers.providers.Web3Provider(walletConnectProvider);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();
    localStorage.setItem("walletConnected", "1");

    document.getElementById("walletAddress").innerText =
      userAddress.slice(0, 6) + "..." + userAddress.slice(-4);

    // Încarcă ABI
    const response = await fetch("abi.json");
    const abi = await response.json();
    contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
  } catch (error) {
    console.error("Wallet connect error:", error);
    alert("Wallet connection failed.");
  }
}

async function deposit(amount, durationSeconds) {
  if (!contract) {
    alert("Please connect wallet first.");
    return;
  }

  const usdt = new ethers.Contract(
    USDT_ADDRESS,
    [
      "function approve(address spender, uint256 amount) public returns (bool)",
      "function allowance(address owner, address spender) public view returns (uint256)",
      "function balanceOf(address account) external view returns (uint256)",
      "function decimals() public view returns (uint8)",
    ],
    signer
  );

  const decimals = await usdt.decimals();
  const parsedAmount = ethers.utils.parseUnits(amount.toString(), decimals);

  try {
    const allowance = await usdt.allowance(userAddress, CONTRACT_ADDRESS);
    if (allowance.lt(parsedAmount)) {
      const approveTx = await usdt.approve(CONTRACT_ADDRESS, parsedAmount);
      await approveTx.wait();
    }

    const ref = new URLSearchParams(window.location.search).get("ref") || ethers.constants.AddressZero;
    const tx = await contract.deposit(parsedAmount, durationSeconds, ref);
    await tx.wait();

    alert("Deposit successful!");
  } catch (err) {
    console.error(err);
    alert("Deposit failed.");
  }
}

document.getElementById("connectWalletBtn").addEventListener("click", connectWallet);
window.addEventListener("load", init);
