require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    bnbTestnet: {
      url: process.env.BNB_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
