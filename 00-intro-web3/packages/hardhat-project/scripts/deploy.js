// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  // const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  // const lockedAmount = hre.ethers.utils.parseEther("1");

  // const Lock = await hre.ethers.getContractFactory("Lock");
  // const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  // await lock.deployed();

  // console.log(
  //   `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  // );

  // Kush Token
  const supply = hre.ethers.utils.parseEther("21000000");

  const Kush = await hre.ethers.getContractFactory("KushToken");
  const kush = await Kush.deploy(supply);

  await kush.deployed();

  console.log(
    `KushToken is deployed with supply: ${supply.toString()}, deployed to address: ${kush.address}`
  );

  // Kush Faucet (with erc20)
  const KushFaucet = await hre.ethers.getContractFactory("KushFaucet");
  const kushFaucet = await KushFaucet.deploy(kush.address);

  await kushFaucet.deployed();

  console.log(
    `KushTokenFaucet is deployed to address: ${kushFaucet.address}`
  );

  // Kush NFT
  const KushNFT = await hre.ethers.getContractFactory("KushNFT");
  const kushNFT = await KushNFT.deploy("KushNFT", "KUSH");

  await kushNFT.deployed();

  console.log(
    `KushNFT is deployed to address: ${kushNFT.address}`
  );

  // Create Collection
  await kushNFT.createCollection('HTML', 'https://www.zupimages.net/up/23/08/rt0i.png');
  await kushNFT.createCollection('CSS', 'https://www.zupimages.net/up/23/08/dise.png');

  // // Create NFTs (in collection)< 
  await kushNFT.mint(0, 'html-01', 'https://www.zupimages.net/up/23/08/xaj3.png');
  await kushNFT.mint(0, 'html-02', 'https://www.zupimages.net/up/23/08/yne8.png');
  await kushNFT.mint(0, 'html-03', 'https://www.zupimages.net/up/23/08/hewz.png');
  await kushNFT.mint(1, 'css-01', 'https://www.zupimages.net/up/23/08/mppo.png');
  await kushNFT.mint(1, 'css-02', 'https://www.zupimages.net/up/23/08/matq.png');
  // await kushNFT.mint(1, 'css-03', 'https://www.zupimages.net/up/23/08/w64h.png');

  // Register user
  await kushNFT.registerConsumer();

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
