const hre = require("hardhat");

async function main() {
  // Deploy EduChain contract
  const EduChain = await hre.ethers.getContractFactory("EduChain");
  const eduChain = await EduChain.deploy();
  await eduChain.waitForDeployment();
  console.log("EduChain deployed to:", await eduChain.getAddress());

  // Deploy CertificateNFT contract
  const CertificateNFT = await hre.ethers.getContractFactory("CertificateNFT");
  const certificateNFT = await CertificateNFT.deploy();
  await certificateNFT.waitForDeployment();
  console.log("CertificateNFT deployed to:", await certificateNFT.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 