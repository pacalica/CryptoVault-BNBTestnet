const hre = require("hardhat");

async function main() {
  const CryptoVault = await hre.ethers.getContractFactory("CryptoVault");
  const vault = await CryptoVault.deploy();
  await vault.deployed();

  console.log(`✅ Contract deployed to: ${vault.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
