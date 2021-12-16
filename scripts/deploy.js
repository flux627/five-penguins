const hre = require("hardhat");

async function main() {
  const FivePenguins = await hre.ethers.getContractFactory("FivePenguins");
  const fivePenguins = await FivePenguins.deploy("Five Penguins", "5P", "ipfs://QmYGDk1YDiuRQwHi6EkDF9F6Gpbf8GURNJuvSaXZjxF8Y1");

  await fivePenguins.deployed();

  console.log("FivePenguins deployed to:", fivePenguins.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
