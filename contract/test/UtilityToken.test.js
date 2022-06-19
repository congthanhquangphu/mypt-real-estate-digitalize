// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("Utility Token", function () {

//   it("Checking Utility Token", async function () {
//     const [developer,wallet,investor1,investor2,investor3] = await ethers.getSigners();
//     provider = ethers.provider;

//     const balance1 = (await provider.getBalance(developer.address)) / 10**18;
//     const balance2 = (await provider.getBalance(wallet.address)) / 10**18;
//     console.log(developer.address);
//     console.log(wallet.address);
//     console.log(balance1.toString());
//     console.log(balance2.toString());
//     const DappToken = await ethers.getContractFactory("UtilityToken");
//     const tokenInstance = await DappToken.deploy('Utility Token', 'UT');
//     await tokenInstance.deployed();

    
//     expect(await tokenInstance.name()).to.equal("Utility Token");

    
//   });
// });
