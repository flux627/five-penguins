const hre = require("hardhat");

async function main() {
  const signers = await hre.ethers.getSigners()

  console.log(signers[0].address)
  console.log(signers[1].address)
  console.log(`network: ${(hre.network.name)}`);
  process.exit()
  const FivePenguins = await hre.ethers.getContractFactory("FivePenguins");
  const fivePenguins = await FivePenguins.deploy("Five Penguins", "5P", "ipfs://QmYGDk1YDiuRQwHi6EkDF9F6Gpbf8GURNJuvSaXZjxF8Y1/");

  await fivePenguins.deployed();

  console.log("FivePenguins deployed to:", fivePenguins.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
