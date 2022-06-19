// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("SecurityToken", function () {

//   it("SecurityToken", async function () {
//     const [developer,wallet,investor] = await ethers.getSigners();
//     provider = ethers.provider;

//     const balance1 = (await provider.getBalance(developer.address)) / 10**18;
//     const balance2 = (await provider.getBalance(wallet.address)) / 10**18;
//     console.log(developer.address);
//     console.log(wallet.address);
//     console.log(balance1.toString());
//     console.log(balance2.toString());
//     const DappToken = await ethers.getContractFactory("SecurityToken");
//     const tokenInstance = await DappToken.deploy('1232542345423','Thanh','T');
//     await tokenInstance.deployed();

//     await tokenInstance.mintToken(1,"Thanh Dep Trai",investor.address,1000);
    
//     let tokenNumberOfInvestor =  await tokenInstance.balanceOf(investor.address,1);
//     console.log("Token Number of Investor:", tokenNumberOfInvestor.toString());
//     expect(await tokenInstance.uriOfContract()).to.equal("1232542345423");
//     expect(await tokenInstance.name()).to.equal("Thanh");
    
//   });
// });
