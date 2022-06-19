// const { Resolver } = require("@ethersproject/providers");
// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("SecurityTokenCrowsale", function () {
//   let tokenInstance;
//   let tokenCrowdsaleInstance;
//   let TokenVestingInstance1,TokenVestingInstance2, TokenVesting;
//   // let investorMinCap = ethers.utils.parseEther('0.002');
//   // let investorHardCap = ethers.utils.parseEther('50');

//   let sevenDays = 5 * 60;
//   // let tenDays = 10 * 24 *60 * 60;
//   // let oneYear = 365 * 24 * 60 *60;
//   let oneDays =  60;

  

//   let developer,wallet;
//   let _devFund, _coreTeamFund,investor;

//   let _name, _symbol, _decimals, _rate, _token, _openingTime, _closingTime, _privateClosingTime;
//   // let ether50,ether100,ether1,ether2,ether30,ether40;
  
 

//   // let devPercentage    = 85;
//   // let privatePercentage  = 10;
//   // let publicPercentage  = 5;

//   beforeEach(async function () {
//     provider = ethers.provider;
//     [ developer, 
//       wallet, 
//       _devFund, _coreTeamFund,
//       investor
//     ] = await ethers.getSigners();

   
//     // devBalance = (await provider.getBalance(developer.address)) / 10**18;
//     // walletBalance = (await provider.getBalance(wallet.address)) / 10**18;
//     // // investor1Balance = (await provider.getBalance(wallet.address)) / 10**18;
//     // console.log(developer.address);
//     // console.log(devBalance.toString());
//     // console.log(wallet.address);
//     // console.log(walletBalance.toString());
//     // console.log(investor1.address);
//     // console.log(investor1Balance.toString());
//     _name = "REST Token";
//     _symbol = "REST";

//     const DappToken = await ethers.getContractFactory("SecurityToken");
//     tokenInstance = await DappToken.deploy("123456",_name, _symbol);
//     await tokenInstance.deployed();

//     _rate = 4000;
//     _token = tokenInstance.address;

//     const currentBlockNumber = await ethers.provider.getBlockNumber();
//     const blockNumber = await ethers.provider.getBlock(currentBlockNumber);

//     _openingTime = blockNumber.timestamp + sevenDays * 7;

//     _closingTime = blockNumber.timestamp + sevenDays * 17;


//     const Crowsale = await ethers.getContractFactory("STCrowdsale");
//     tokenCrowdsaleInstance = await Crowsale.deploy(
//       wallet.address,
//       tokenInstance.address,
//     );
 


//     // // await TokenVestingInstance.deployed();

//     // console.log("deployedToken: ", tokenInstance.address);
//     // console.log("tokenCrowsale: ", tokenCrowdsaleInstance.address);

//     let add_new_minter = await tokenInstance.addMinter(tokenInstance.address);

//     let minter = await tokenInstance
//       .connect(developer)
//       .addMinter(tokenCrowdsaleInstance.address);

//     // await tokenCrowdsaleInstance.begin();

//     await ethers.provider.send("evm_increaseTime", [1]);
//   });

//   it("Checking TokenCrowdSale Attributes", async function () {
//     const minCap = await tokenCrowdsaleInstance.investorMinCap();
//     expect(minCap.toString()).to.equal("2500000000000000");
//     const abc = await tokenCrowdsaleInstance.token_();
//     console.log(abc);
//   });

// describe("----------Crowdsale-----------", function () {
//     it("Tokens and Balancs of accounts", async function () {
      
//       console.log("Balances of accounts before Private Crowdsale:");
//     //   rate = await tokenCrowdsaleInstance.rate();
//     //   console.log("Rate:", rate.toString());
//       walletBalance = (await provider.getBalance(wallet.address)) / 10 ** 18;
//       devBalance =
//         (await provider.getBalance(_devFund.address)) / 10 ** 18;
//       coreTeamBalance = (await provider.getBalance(_coreTeamFund.address)) / 10 ** 18;
//       investorBalance = (await provider.getBalance(investor.address)) / 10 ** 18;      
//       crowdsaleBalance =
//         (await provider.getBalance(tokenCrowdsaleInstance.address)) / 10 ** 18;
//       console.log("Wallet Balance: ", walletBalance.toString());
//       console.log("Crowdsale Balance: ", crowdsaleBalance.toString());
//       console.log("Dev Balance: ", devBalance.toString());
//       console.log("Core Team Balance: ", coreTeamBalance.toString());
//       console.log("Investor Balance: ", investorBalance.toString());

//       const creatingToken = await tokenInstance.mintToken(1,"10",);
//       const uriOfToken = await tokenInstance.uri(1);
//       console.log(uriOfToken);

//       await tokenCrowdsaleInstance.connect(developer).setURICrowdsale(1,_openingTime,_closingTime,10,ethers.utils.parseEther("50"),1000);
//       await ethers.provider.send("evm_increaseTime", [sevenDays * 10]);      
//       tx = {
//         // to: tokenCrowdsaleInstance.address,
//         value: ethers.utils.parseEther("10"),
//       };
    
//     //   await developer.sendTransaction(tx);.

//     let supply = await tokenInstance.exists(1);
//       console.log("Check Total supply > 0:",supply);

//       await tokenCrowdsaleInstance.connect(investor).buyTokens(investor.address,1,{value: ethers.utils.parseEther("40")});
//       await ethers.provider.send("evm_increaseTime", [sevenDays * 2]);     
//       await tokenCrowdsaleInstance.connect(investor).buyTokens(investor.address,1,{value: ethers.utils.parseEther("30")});


//       walletBalance = (await provider.getBalance(wallet.address)) / 10 ** 18;
//       devBalance =
//         (await provider.getBalance(_devFund.address)) / 10 ** 18;
//       coreTeamBalance = (await provider.getBalance(_coreTeamFund.address)) / 10 ** 18;
//       investorBalance = (await provider.getBalance(investor.address)) / 10 ** 18;      
//       crowdsaleBalance =
//         (await provider.getBalance(tokenCrowdsaleInstance.address)) / 10 ** 18;
//       console.log("Wallet Balance: ", walletBalance.toString());
//       console.log("Crowdsale Balance: ", crowdsaleBalance.toString());
//       console.log("Dev Balance: ", devBalance.toString());
//       console.log("Core Team Balance: ", coreTeamBalance.toString());
//       console.log("Investor Balance: ", investorBalance.toString());

//       await ethers.provider.send("evm_increaseTime", [sevenDays * 10]);
//       await tokenCrowdsaleInstance.finalize(1);
//       await tokenCrowdsaleInstance
//         .connect(investor)
//         .withdrawTokens(investor.address,1);

//         supply = await tokenInstance.exists(1);
//         console.log("Check Total supply > 0:",supply);
      
//       let tokenNumberOfInvestor = await tokenInstance.balanceOf(investor.address,1);
//       console.log("Token Number of Investor",tokenNumberOfInvestor);

//       walletBalance = (await provider.getBalance(wallet.address)) / 10 ** 18;
//       devBalance =
//         (await provider.getBalance(_devFund.address)) / 10 ** 18;
//       coreTeamBalance = (await provider.getBalance(_coreTeamFund.address)) / 10 ** 18;
//       investorBalance = (await provider.getBalance(investor.address)) / 10 ** 18;      
//       crowdsaleBalance =
//         (await provider.getBalance(tokenCrowdsaleInstance.address)) / 10 ** 18;
//       console.log("Wallet Balance: ", walletBalance.toString());
//       console.log("Crowdsale Balance: ", crowdsaleBalance.toString());
//       console.log("Dev Balance: ", devBalance.toString());
//       console.log("Core Team Balance: ", coreTeamBalance.toString());
//       console.log("Investor Balance: ", investorBalance.toString());

//       tokenNumberOfInvestor = await tokenInstance.balanceOf(investor.address,1);
//       console.log("Token Number of Investor",tokenNumberOfInvestor);
        
//     //   console.log("Tokens of accounts before Private Crowdsale:");
//     //   // tx = {
//     //   //   to: tokenCrowdsaleInstance.address,
//     //   //   value: ethers.utils.parseEther("10"),
//     //   // };
//     //   // await investor.sendTransaction(tx);
//     //   totalSupplyRaised =
//     //     (await tokenCrowdsaleInstance.tokensRaised()) / 10 ** 18;
//     //   totalSupply = (await tokenInstance.totalSupply()) / 10 ** 18;
//     //   console.log("Tokens Total Supply raised :", totalSupplyRaised.toString());
//     //   console.log("Total Supply :", totalSupply.toString());
//     //   tokenNumberOfInvestor =
//     //     (await tokenInstance.balanceOf(investor.address)) / 10 ** 18;
//     //   tokenNumberOfDev =
//     //     (await tokenInstance.balanceOf(_devFund.address)) / 10 ** 18;
//     //     tokenNumberOfCoreTeam =
//     //     (await tokenInstance.balanceOf(_coreTeamFund.address)) / 10 ** 18;
//     //   console.log(
//     //     "Token Number of Investor :",
//     //     tokenNumberOfInvestor.toString()
//     //   );
//     //   console.log("Token Number of Dev:", tokenNumberOfDev.toString());
//     //   console.log("Token Number of Core Team:", tokenNumberOfCoreTeam.toString());

//       console.log("-------------------------------------------");

//       });

//     });

// //   describe("----------Crowdsale-----------", function () {
// //     it("Tokens and Balancs of accounts", async function () {
// //       await ethers.provider.send("evm_increaseTime", [sevenDays]);
// //       console.log("-------------WEEK 1-------------");
// //       console.log("Balances of accounts before Private Crowdsale:");
// //       rate = await tokenCrowdsaleInstance.rate();
// //       console.log("Rate:", rate.toString());
// //       walletBalance = (await provider.getBalance(wallet.address)) / 10 ** 18;
// //       devBalance =
// //         (await provider.getBalance(_devFund.address)) / 10 ** 18;
// //       coreTeamBalance = (await provider.getBalance(_coreTeamFund.address)) / 10 ** 18;
// //       investorBalance = (await provider.getBalance(investor.address)) / 10 ** 18;      
// //       crowdsaleBalance =
// //         (await provider.getBalance(tokenCrowdsaleInstance.address)) / 10 ** 18;
// //       console.log("Wallet Balance: ", walletBalance.toString());
// //       console.log("Crowdsale Balance: ", crowdsaleBalance.toString());
// //       console.log("Dev Balance: ", devBalance.toString());
// //       console.log("Core Team Balance: ", coreTeamBalance.toString());
// //       console.log("Investor Balance: ", investorBalance.toString());

// //       console.log("Tokens of accounts before Private Crowdsale:");
// //       // tx = {
// //       //   to: tokenCrowdsaleInstance.address,
// //       //   value: ethers.utils.parseEther("10"),
// //       // };
// //       // await investor.sendTransaction(tx);
// //       totalSupplyRaised =
// //         (await tokenCrowdsaleInstance.tokensRaised()) / 10 ** 18;
// //       totalSupply = (await tokenInstance.totalSupply()) / 10 ** 18;
// //       console.log("Tokens Total Supply raised :", totalSupplyRaised.toString());
// //       console.log("Total Supply :", totalSupply.toString());
// //       tokenNumberOfInvestor =
// //         (await tokenInstance.balanceOf(investor.address)) / 10 ** 18;
// //       tokenNumberOfDev =
// //         (await tokenInstance.balanceOf(_devFund.address)) / 10 ** 18;
// //         tokenNumberOfCoreTeam =
// //         (await tokenInstance.balanceOf(_coreTeamFund.address)) / 10 ** 18;
// //       console.log(
// //         "Token Number of Investor :",
// //         tokenNumberOfInvestor.toString()
// //       );
// //       console.log("Token Number of Dev:", tokenNumberOfDev.toString());
// //       console.log("Token Number of Core Team:", tokenNumberOfCoreTeam.toString());

// //       console.log("-------------------------------------------");




// //       // await tokenCrowdsaleInstance.finalize();
// //       // await tokenCrowdsaleInstance
// //       //   .connect(investor1)
// //       //   .withdrawTokens(investor1.address);
// //       // await tokenCrowdsaleInstance.releaseVesting();


// //       await ethers.provider.send("evm_increaseTime", [sevenDays * 7]);
// //       console.log("-------------WEEK 8-------------");
// //       console.log("Balances of accounts before Private Crowdsale:");
// //       rate = await tokenCrowdsaleInstance.rate();
// //       console.log("Rate:", rate.toString());
// //       walletBalance = (await provider.getBalance(wallet.address)) / 10 ** 18;
// //       devBalance =
// //         (await provider.getBalance(_devFund.address)) / 10 ** 18;
// //       coreTeamBalance = (await provider.getBalance(_coreTeamFund.address)) / 10 ** 18;
// //       investorBalance = (await provider.getBalance(investor.address)) / 10 ** 18;      
// //       crowdsaleBalance =
// //         (await provider.getBalance(tokenCrowdsaleInstance.address)) / 10 ** 18;
// //       console.log("Wallet Balance: ", walletBalance.toString());
// //       console.log("Crowdsale Balance: ", crowdsaleBalance.toString());
// //       console.log("Dev Balance: ", devBalance.toString());
// //       console.log("Core Team Balance: ", coreTeamBalance.toString());
// //       console.log("Investor Balance: ", investorBalance.toString());

// //       console.log("Tokens of accounts before Private Crowdsale:");
// //       tx = {
// //         to: tokenCrowdsaleInstance.address,
// //         value: ethers.utils.parseEther("10"),
// //       };
// //       await investor.sendTransaction(tx);

// //       await tokenCrowdsaleInstance.releaseVesting();

// //       totalSupplyRaised =
// //         (await tokenCrowdsaleInstance.tokensRaised()) / 10 ** 18;
// //       totalSupply = (await tokenInstance.totalSupply()) / 10 ** 18;
// //       console.log("Tokens Total Supply raised :", totalSupplyRaised.toString());
// //       console.log("Total Supply :", totalSupply.toString());
// //       tokenNumberOfInvestor =
// //         (await tokenInstance.balanceOf(investor.address)) / 10 ** 18;
// //       tokenNumberOfDev =
// //         (await tokenInstance.balanceOf(_devFund.address)) / 10 ** 18;
// //         tokenNumberOfCoreTeam =
// //         (await tokenInstance.balanceOf(_coreTeamFund.address)) / 10 ** 18;
// //       console.log(
// //         "Token Number of Investor :",
// //         tokenNumberOfInvestor.toString()
// //       );
// //       console.log("Token Number of Dev:", tokenNumberOfDev.toString());
// //       console.log("Token Number of Core Team:", tokenNumberOfCoreTeam.toString());

// //       // await tokenCrowdsaleInstance.finalize();
// //       // await tokenCrowdsaleInstance
// //       //   .connect(investor)
// //       //   .withdrawTokens(investor.address);
// //       // await tokenCrowdsaleInstance.releaseVesting();

// //       console.log("-------------------------------------------");



// //       await ethers.provider.send("evm_increaseTime", [sevenDays * 8]);
// //       console.log("-------------WEEK 16-------------");
// //       console.log("Balances of accounts before Private Crowdsale:");
// //       rate = await tokenCrowdsaleInstance.rate();
// //       console.log("Rate:", rate.toString());
// //       walletBalance = (await provider.getBalance(wallet.address)) / 10 ** 18;
// //       devBalance =
// //         (await provider.getBalance(_devFund.address)) / 10 ** 18;
// //       coreTeamBalance = (await provider.getBalance(_coreTeamFund.address)) / 10 ** 18;
// //       investorBalance = (await provider.getBalance(investor.address)) / 10 ** 18;      
// //       crowdsaleBalance =
// //         (await provider.getBalance(tokenCrowdsaleInstance.address)) / 10 ** 18;
// //       console.log("Wallet Balance: ", walletBalance.toString());
// //       console.log("Crowdsale Balance: ", crowdsaleBalance.toString());
// //       console.log("Dev Balance: ", devBalance.toString());
// //       console.log("Core Team Balance: ", coreTeamBalance.toString());
// //       console.log("Investor Balance: ", investorBalance.toString());

// //       console.log("Tokens of accounts before Private Crowdsale:");
// //       tx = {
// //         to: tokenCrowdsaleInstance.address,
// //         value: ethers.utils.parseEther("10"),
// //       };
// //       await investor.sendTransaction(tx);

// //       await tokenCrowdsaleInstance.releaseVesting();

// //       totalSupplyRaised =
// //         (await tokenCrowdsaleInstance.tokensRaised()) / 10 ** 18;
// //       totalSupply = (await tokenInstance.totalSupply()) / 10 ** 18;
// //       console.log("Tokens Total Supply raised :", totalSupplyRaised.toString());
// //       console.log("Total Supply :", totalSupply.toString());
// //       tokenNumberOfInvestor =
// //         (await tokenInstance.balanceOf(investor.address)) / 10 ** 18;
// //       tokenNumberOfDev =
// //         (await tokenInstance.balanceOf(_devFund.address)) / 10 ** 18;
// //         tokenNumberOfCoreTeam =
// //         (await tokenInstance.balanceOf(_coreTeamFund.address)) / 10 ** 18;
// //       console.log(
// //         "Token Number of Investor :",
// //         tokenNumberOfInvestor.toString()
// //       );
// //       console.log("Token Number of Dev:", tokenNumberOfDev.toString());
// //       console.log("Token Number of Core Team:", tokenNumberOfCoreTeam.toString());

// //       // await tokenCrowdsaleInstance.finalize();
// //       // await tokenCrowdsaleInstance
// //       //   .connect(investor)
// //       //   .withdrawTokens(investor.address);
// //       // await tokenCrowdsaleInstance.releaseVesting();

// //       console.log("-------------------------------------------");

// //       console.log("---------------FINALIZE---------------------");
// //       await ethers.provider.send("evm_increaseTime", [sevenDays * 3]);
// //       await tokenCrowdsaleInstance.finalize();

// //       console.log("-------------------------------------------");

// //       await ethers.provider.send("evm_increaseTime", [sevenDays * 3]);
// //       console.log("-------------WEEK 22-------------");
// //       console.log("Balances of accounts before Private Crowdsale:");
// //       rate = await tokenCrowdsaleInstance.rate();
// //       console.log("Rate:", rate.toString());
// //       walletBalance = (await provider.getBalance(wallet.address)) / 10 ** 18;
// //       devBalance =
// //         (await provider.getBalance(_devFund.address)) / 10 ** 18;
// //       coreTeamBalance = (await provider.getBalance(_coreTeamFund.address)) / 10 ** 18;
// //       investorBalance = (await provider.getBalance(investor.address)) / 10 ** 18;      
// //       crowdsaleBalance =
// //         (await provider.getBalance(tokenCrowdsaleInstance.address)) / 10 ** 18;
// //       console.log("Wallet Balance: ", walletBalance.toString());
// //       console.log("Crowdsale Balance: ", crowdsaleBalance.toString());
// //       console.log("Dev Balance: ", devBalance.toString());
// //       console.log("Core Team Balance: ", coreTeamBalance.toString());
// //       console.log("Investor Balance: ", investorBalance.toString());

// //       console.log("Tokens of accounts before Private Crowdsale:");
// //       tx = {
// //         to: tokenCrowdsaleInstance.address,
// //         value: ethers.utils.parseEther("10"),
// //       };
// //       await investor.sendTransaction(tx);

// //       await tokenCrowdsaleInstance.releaseVesting();
      
// //       await tokenCrowdsaleInstance
// //         .connect(investor)
// //         .withdrawTokens(investor.address);

// //       totalSupplyRaised =
// //         (await tokenCrowdsaleInstance.tokensRaised()) / 10 ** 18;
// //       totalSupply = (await tokenInstance.totalSupply()) / 10 ** 18;
// //       console.log("Tokens Total Supply raised :", totalSupplyRaised.toString());
// //       console.log("Total Supply :", totalSupply.toString());
// //       tokenNumberOfInvestor =
// //         (await tokenInstance.balanceOf(investor.address)) / 10 ** 18;
// //       tokenNumberOfDev =
// //         (await tokenInstance.balanceOf(_devFund.address)) / 10 ** 18;
// //         tokenNumberOfCoreTeam =
// //         (await tokenInstance.balanceOf(_coreTeamFund.address)) / 10 ** 18;
// //       console.log(
// //         "Token Number of Investor :",
// //         tokenNumberOfInvestor.toString()
// //       );
// //       console.log("Token Number of Dev:", tokenNumberOfDev.toString());
// //       console.log("Token Number of Core Team:", tokenNumberOfCoreTeam.toString());

// //       // await tokenCrowdsaleInstance.finalize();
// //       // await tokenCrowdsaleInstance
// //       //   .connect(investor)
// //       //   .withdrawTokens(investor.address);
// //       // await tokenCrowdsaleInstance.releaseVesting();


// //       console.log("-------------------------------------------");

// //       await ethers.provider.send("evm_increaseTime", [sevenDays * 8]);
// //       console.log("-------------WEEK 30-------------");
// //       console.log("Balances of accounts before Private Crowdsale:");
// //       rate = await tokenCrowdsaleInstance.rate();
// //       console.log("Rate:", rate.toString());
// //       walletBalance = (await provider.getBalance(wallet.address)) / 10 ** 18;
// //       devBalance =
// //         (await provider.getBalance(_devFund.address)) / 10 ** 18;
// //       coreTeamBalance = (await provider.getBalance(_coreTeamFund.address)) / 10 ** 18;
// //       investorBalance = (await provider.getBalance(investor.address)) / 10 ** 18;      
// //       crowdsaleBalance =
// //         (await provider.getBalance(tokenCrowdsaleInstance.address)) / 10 ** 18;
// //       console.log("Wallet Balance: ", walletBalance.toString());
// //       console.log("Crowdsale Balance: ", crowdsaleBalance.toString());
// //       console.log("Dev Balance: ", devBalance.toString());
// //       console.log("Core Team Balance: ", coreTeamBalance.toString());
// //       console.log("Investor Balance: ", investorBalance.toString());

// //       console.log("Tokens of accounts before Private Crowdsale:");
// //       tx = {
// //         to: tokenCrowdsaleInstance.address,
// //         value: ethers.utils.parseEther("10"),
// //       };
// //       await investor.sendTransaction(tx);

// //       await tokenCrowdsaleInstance.releaseVesting();
// //       await tokenCrowdsaleInstance
// //         .connect(investor)
// //         .withdrawTokens(investor.address);

// //       totalSupplyRaised =
// //         (await tokenCrowdsaleInstance.tokensRaised()) / 10 ** 18;
// //       totalSupply = (await tokenInstance.totalSupply()) / 10 ** 18;
// //       console.log("Tokens Total Supply raised :", totalSupplyRaised.toString());
// //       console.log("Total Supply :", totalSupply.toString());
// //       tokenNumberOfInvestor =
// //         (await tokenInstance.balanceOf(investor.address)) / 10 ** 18;
// //       tokenNumberOfDev =
// //         (await tokenInstance.balanceOf(_devFund.address)) / 10 ** 18;
// //         tokenNumberOfCoreTeam =
// //         (await tokenInstance.balanceOf(_coreTeamFund.address)) / 10 ** 18;
// //       console.log(
// //         "Token Number of Investor :",
// //         tokenNumberOfInvestor.toString()
// //       );
// //       console.log("Token Number of Dev:", tokenNumberOfDev.toString());
// //       console.log("Token Number of Core Team:", tokenNumberOfCoreTeam.toString());

// //       // await tokenCrowdsaleInstance.finalize();
// //       // await tokenCrowdsaleInstance
// //       //   .connect(investor)
// //       //   .withdrawTokens(investor.address);
// //       // await tokenCrowdsaleInstance.releaseVesting();












      
      
//     // });
//   });




















































































  
