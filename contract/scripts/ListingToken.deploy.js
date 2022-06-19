// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.

require('dotenv').config();
const hre = require("hardhat");

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

async function main() {

    let feePercent = 5;
    let URI = "Real Estate Digital System"
    let developer,wallet,tokenInstance, listingInstance;

  
    const provider = hre.ethers.provider;
  
    // 9,8,7,6,5,4
    developer = new hre.ethers.Wallet(process.env.DEVELOPER_PRIVATE_KEY, provider);    
    wallet = new hre.ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);  

   
  
  
      // Get the ContractFactories and Signers here.
      const securityToken = await ethers.getContractFactory("SecurityToken");
      const listing = await ethers.getContractFactory("Listing");
    
  
      // To deploy our contracts
      tokenInstance = await securityToken.deploy(URI,"Thanh Vs Phuc", "TP");
      
      
      
      await tokenInstance.deployed();
      
      
      listingInstance = await listing.deploy(
        feePercent,
        wallet.address,
      );

      console.log("Security Token  Address: ", tokenInstance.address);
    console.log("contract Address of Listing on marketplace: ", listingInstance.address);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
