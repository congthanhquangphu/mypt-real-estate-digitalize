// const { Resolver } = require("@ethersproject/providers");
// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// const toWei = (num) => ethers.utils.parseEther(num.toString())

// describe("UtilityTokenCrowsale", function () {
//   let tokenInstance;
//   let tokenCrowdsaleInstance;
//   let TokenVestingInstance1,TokenVestingInstance2, TokenVesting,TokenVestingInstance3,TokenVestingInstance4;
  

//   let sevenDays = 5 * 60;
//   let oneDays =  60;

//   let _devDuration, 
//     _coreTeamDuration,
//     _reserveDuration,
//     _advisorDuration;

//   let _devStartTime,
//       _coreTeamStartTime,
//       _advisorStartTime,
//       _reserveStartTime;

//   let _devCliffDuration,
//       _coreTeamCliffDuration,
//       _reserveCliffDuration,
//       _advisorCliffDuration;
  

//   let developer,wallet,investor;
//   let _devFund, _coreTeamFund,_reserveFund,_advisorFund;

//   let _name, _symbol, _rate, _token, _openingTime, _privateClosingTime;
//   let rate,tx;
 
  
//   let devBalance,
//     walletBalance,
//     investorBalance,
//     coreTeamBalance,
//     totalSupply,
//     totalSupplyRaised,
//     tokenNumberOfCoreTeam,
//     tokenNumberOfDev,
//     tokenNumberOfInvestor
//     ;

//   let devPercentage    = 20;
//   let coreTeamPercentage = 20;
//   let reservePercentage = 25;
//   let advisorPercentage = 15
//   let privatePercentage  = 15;
//   let publicPercentage  = 5;


//   beforeEach(async function () {
//     provider = ethers.provider;
//     [ developer, 
//       wallet, 
//       _devFund, _coreTeamFund,_reserveFund,_advisorFund,
//       investor
//     ] = await ethers.getSigners();

   

//     _name = "Real Estate Utility Token";
//     _symbol = "REUT";

//     const DappToken = await ethers.getContractFactory("UtilityToken");
//     tokenInstance = await DappToken.deploy(_name, _symbol);
//     await tokenInstance.deployed();

//     _rate = 5000;
//     _token = tokenInstance.address;

//     const currentBlockNumber = await ethers.provider.getBlockNumber();
//     const blockNumber = await ethers.provider.getBlock(currentBlockNumber);

//     _openingTime = blockNumber.timestamp + sevenDays * 13;
//     _privateClosingTime = blockNumber.timestamp + sevenDays * 25;

//     _devStartTime =  blockNumber.timestamp + sevenDays * 1;
//     _coreTeamStartTime = blockNumber.timestamp + sevenDays * 1;
//     _reserveStartTime =  blockNumber.timestamp + sevenDays * 1;
//     _advisorStartTime =  blockNumber.timestamp + sevenDays * 1;

//     _devCliffDuration = sevenDays * 8;
//     _coreTeamCliffDuration = sevenDays * 12;
//     _reserveCliffDuration = sevenDays * 12;
//     _advisorCliffDuration = sevenDays * 12;


//     _devDuration = sevenDays * 48;
//     _coreTeamDuration = sevenDays * 48;
//     _reserveDuration = sevenDays * 48;
//     _advisorDuration = sevenDays * 48;


//     const Crowsale = await ethers.getContractFactory("UTCrowdsale");
//     tokenCrowdsaleInstance = await Crowsale.deploy(
//       _rate,
//       wallet.address,
//       tokenInstance.address,
//       _openingTime,
//       _privateClosingTime,
//       [
//         ethers.BigNumber.from(_devStartTime),
//         ethers.BigNumber.from(_coreTeamStartTime),
//         ethers.BigNumber.from(_reserveStartTime),
//         ethers.BigNumber.from(_advisorStartTime)
//       ],
//       [
//         ethers.BigNumber.from(_devCliffDuration),
//         ethers.BigNumber.from(_coreTeamCliffDuration),
//         ethers.BigNumber.from(_reserveCliffDuration),
//         ethers.BigNumber.from(_advisorCliffDuration)
//       ],
//       [
//         ethers.BigNumber.from(_devDuration),
//         ethers.BigNumber.from(_coreTeamDuration),
//         ethers.BigNumber.from(_reserveDuration),
//         ethers.BigNumber.from(_advisorDuration)
//       ],
//       [
//         _devFund.address,
//         _coreTeamFund.address,
//         _reserveFund.address,
//         _advisorFund.address
//       ],    
//     );
//     TokenVesting = await ethers.getContractFactory("TokenVesting");
//     TokenVestingInstance1 = await TokenVesting.deploy(
//       _devFund.address, 
//       _devStartTime,
//       _devCliffDuration,
//       _devDuration,
//       true
//     );

//     TokenVestingInstance2 = await TokenVesting.deploy(
//       _coreTeamFund.address,
//       _coreTeamStartTime,
//       _coreTeamCliffDuration,
//       _coreTeamDuration,
//       true
//     );

//     TokenVestingInstance3 = await TokenVesting.deploy(
//         _reserveFund.address,
//         _reserveStartTime,
//         _reserveCliffDuration,
//         _reserveDuration,
//         true
//       );
//       TokenVestingInstance4 = await TokenVesting.deploy(
//         _advisorFund.address,
//         _advisorStartTime,
//         _advisorCliffDuration,
//         _advisorDuration,
//         true
//       );


//     // // await TokenVestingInstance.deployed();

//     console.log("deployedToken: ", tokenInstance.address);
//     console.log("tokenCrowsale: ", tokenCrowdsaleInstance.address);

//     let add_new_minter = await tokenInstance.addMinter(tokenInstance.address);

//     let minter = await tokenInstance
//       .connect(developer)
//       .addMinter(tokenCrowdsaleInstance.address);

//     await tokenCrowdsaleInstance.begin1();
//     await tokenCrowdsaleInstance.begin();

//     await ethers.provider.send("evm_increaseTime", [1]);
//   });

// //   it("Checking TokenCrowdSale Attributes", async function () {
// //     rate = await tokenCrowdsaleInstance.rate();
// //     const _wallet = await tokenCrowdsaleInstance.wallet();
// //     const token = await tokenCrowdsaleInstance.token();
// //     const openingTime = await tokenCrowdsaleInstance.openingTime();
// //     const closingTime = await tokenCrowdsaleInstance.closingTime();
// //     const [devStartTime,x,y,z] = await tokenCrowdsaleInstance.startTime();
// //     expect(devStartTime).to.equal(_devStartTime);
// //     expect(rate).to.equal(5000);
// //     expect(_wallet).to.equal(wallet.address);
// //     expect(openingTime).to.equal(_openingTime);
// //     expect(closingTime).to.equal(_privateClosingTime);
// //     expect(token).to.equal(_token);
// //     // await ethers.provider.send('evm_increaseTime', [sevenDays*20]);
// //   });

//   describe("----------Crowdsale-----------", function () {
//     it("Tokens and Balancs of accounts", async function () {
//       await ethers.provider.send("evm_increaseTime", [sevenDays]);
//       console.log("-------------WEEK 1-------------");
//       console.log("Balances of accounts before Private Crowdsale:");
//       rate = await tokenCrowdsaleInstance.rate();
//       console.log("Rate:", rate.toString());
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

//       console.log("Tokens of accounts before Private Crowdsale:");
//       // tx = {
//       //   to: tokenCrowdsaleInstance.address,
//       //   value: ethers.utils.parseEther("10"),
//       // };
//       // await investor.sendTransaction(tx);
//       totalSupplyRaised =
//         (await tokenCrowdsaleInstance.tokensRaised()) / 10 ** 18;
//       totalSupply = (await tokenInstance.totalSupply()) / 10 ** 18;
//       console.log("Tokens Total Supply raised :", totalSupplyRaised.toString());
//       console.log("Total Supply :", totalSupply.toString());
//       tokenNumberOfInvestor =
//         (await tokenInstance.balanceOf(investor.address)) / 10 ** 18;
//       tokenNumberOfDev =
//         (await tokenInstance.balanceOf(_devFund.address)) / 10 ** 18;
//         tokenNumberOfCoreTeam =
//         (await tokenInstance.balanceOf(_coreTeamFund.address)) / 10 ** 18;
//       console.log(
//         "Token Number of Investor :",
//         tokenNumberOfInvestor.toString()
//       );
//       console.log("Token Number of Dev:", tokenNumberOfDev.toString());
//       console.log("Token Number of Core Team:", tokenNumberOfCoreTeam.toString());

//       console.log("-------------------------------------------");


//       await ethers.provider.send("evm_increaseTime", [sevenDays * 15]);
//       console.log("-------------WEEK 15-------------");
//       tx = {
//         to: tokenCrowdsaleInstance.address,
//         value: ethers.utils.parseEther("10"),
//       };
  
//       await tokenCrowdsaleInstance.releaseVesting();
//     //   await tokenCrowdsaleInstance.finalize();
//     let price = await tokenCrowdsaleInstance.getPrice(50000);
//     await tokenCrowdsaleInstance.connect(investor).buyTokens(investor.address,{ value: toWei(price)});
//     //   await tokenCrowdsaleInstance
//     //     .connect(investor)
//     //     .withdrawTokens(investor.address);

//       console.log("Balances of accounts before Private Crowdsale:");
//       rate = await tokenCrowdsaleInstance.rate();
//       console.log("Rate:", rate.toString());
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

//       console.log("Tokens of accounts before Private Crowdsale:");
      

//       totalSupplyRaised =
//         (await tokenCrowdsaleInstance.tokensRaised()) / 10 ** 18;
//       totalSupply = (await tokenInstance.totalSupply()) / 10 ** 18;
//       console.log("Tokens Total Supply raised :", totalSupplyRaised.toString());
//       console.log("Total Supply :", totalSupply.toString());
//       tokenNumberOfInvestor =
//         (await tokenInstance.balanceOf(investor.address)) / 10 ** 18;
//       tokenNumberOfDev =
//         (await tokenInstance.balanceOf(_devFund.address)) / 10 ** 18;
//         tokenNumberOfCoreTeam =
//         (await tokenInstance.balanceOf(_coreTeamFund.address)) / 10 ** 18;
//       console.log(
//         "Token Number of Investor :",
//         tokenNumberOfInvestor.toString()
//       );
//       console.log("Token Number of Dev:", tokenNumberOfDev.toString());
//       console.log("Token Number of Core Team:", tokenNumberOfCoreTeam.toString());

//       // await tokenCrowdsaleInstance.finalize();
//       // await tokenCrowdsaleInstance
//       //   .connect(investor)
//       //   .withdrawTokens(investor.address);
//       // await tokenCrowdsaleInstance.releaseVesting();

//       console.log("-------------------------------------------");  

    
  
//       await ethers.provider.send("evm_increaseTime", [sevenDays * 15]);
//       console.log("-------------WEEK 30-------------");
//       tx = {
//         to: tokenCrowdsaleInstance.address,
//         value: ethers.utils.parseEther("10"),
//       };
  
//       await tokenCrowdsaleInstance.releaseVesting();
//       await tokenCrowdsaleInstance.finalize();
//       price = await tokenCrowdsaleInstance.getPrice(10000);
//       await tokenCrowdsaleInstance.connect(investor).buyTokens(investor.address,{ value: toWei(price)});
//       await tokenCrowdsaleInstance
//         .connect(investor)
//         .withdrawTokens(investor.address);

//       console.log("Balances of accounts before Private Crowdsale:");
//       rate = await tokenCrowdsaleInstance.rate();
//       console.log("Rate:", rate.toString());
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

//       console.log("Tokens of accounts before Private Crowdsale:");
      

//       totalSupplyRaised =
//         (await tokenCrowdsaleInstance.tokensRaised()) / 10 ** 18;
//       totalSupply = (await tokenInstance.totalSupply()) / 10 ** 18;
//       console.log("Tokens Total Supply raised :", totalSupplyRaised.toString());
//       console.log("Total Supply :", totalSupply.toString());
//       tokenNumberOfInvestor =
//         (await tokenInstance.balanceOf(investor.address)) / 10 ** 18;
//       tokenNumberOfDev =
//         (await tokenInstance.balanceOf(_devFund.address)) / 10 ** 18;
//         tokenNumberOfCoreTeam =
//         (await tokenInstance.balanceOf(_coreTeamFund.address)) / 10 ** 18;
//       console.log(
//         "Token Number of Investor :",
//         tokenNumberOfInvestor.toString()
//       );
//       console.log("Token Number of Dev:", tokenNumberOfDev.toString());
//       console.log("Token Number of Core Team:", tokenNumberOfCoreTeam.toString());

//       // await tokenCrowdsaleInstance.finalize();
//       // await tokenCrowdsaleInstance
//       //   .connect(investor)
//       //   .withdrawTokens(investor.address);
//       // await tokenCrowdsaleInstance.releaseVesting();

//       console.log("-------------------------------------------");



//     //   await ethers.provider.send("evm_increaseTime", [sevenDays * 8]);
//     //   console.log("-------------WEEK 16-------------");
//     //   console.log("Balances of accounts before Private Crowdsale:");
//     //   rate = await tokenCrowdsaleInstance.rate();
//     //   console.log("Rate:", rate.toString());
//     //   walletBalance = (await provider.getBalance(wallet.address)) / 10 ** 18;
//     //   devBalance =
//     //     (await provider.getBalance(_devFund.address)) / 10 ** 18;
//     //   coreTeamBalance = (await provider.getBalance(_coreTeamFund.address)) / 10 ** 18;
//     //   investorBalance = (await provider.getBalance(investor.address)) / 10 ** 18;      
//     //   crowdsaleBalance =
//     //     (await provider.getBalance(tokenCrowdsaleInstance.address)) / 10 ** 18;
//     //   console.log("Wallet Balance: ", walletBalance.toString());
//     //   console.log("Crowdsale Balance: ", crowdsaleBalance.toString());
//     //   console.log("Dev Balance: ", devBalance.toString());
//     //   console.log("Core Team Balance: ", coreTeamBalance.toString());
//     //   console.log("Investor Balance: ", investorBalance.toString());

//     //   console.log("Tokens of accounts before Private Crowdsale:");
//     //   tx = {
//     //     to: tokenCrowdsaleInstance.address,
//     //     value: ethers.utils.parseEther("10"),
//     //   };
//     //   await investor.sendTransaction(tx);

//     //   await tokenCrowdsaleInstance.releaseVesting();

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

//     //   // await tokenCrowdsaleInstance.finalize();
//     //   // await tokenCrowdsaleInstance
//     //   //   .connect(investor)
//     //   //   .withdrawTokens(investor.address);
//     //   // await tokenCrowdsaleInstance.releaseVesting();

//     //   console.log("-------------------------------------------");

//     //   console.log("---------------FINALIZE---------------------");
//     //   await ethers.provider.send("evm_increaseTime", [sevenDays * 3]);
//     //   await tokenCrowdsaleInstance.finalize();

//     //   console.log("-------------------------------------------");

//     //   await ethers.provider.send("evm_increaseTime", [sevenDays * 3]);
//     //   console.log("-------------WEEK 22-------------");
//     //   console.log("Balances of accounts before Private Crowdsale:");
//     //   rate = await tokenCrowdsaleInstance.rate();
//     //   console.log("Rate:", rate.toString());
//     //   walletBalance = (await provider.getBalance(wallet.address)) / 10 ** 18;
//     //   devBalance =
//     //     (await provider.getBalance(_devFund.address)) / 10 ** 18;
//     //   coreTeamBalance = (await provider.getBalance(_coreTeamFund.address)) / 10 ** 18;
//     //   investorBalance = (await provider.getBalance(investor.address)) / 10 ** 18;      
//     //   crowdsaleBalance =
//     //     (await provider.getBalance(tokenCrowdsaleInstance.address)) / 10 ** 18;
//     //   console.log("Wallet Balance: ", walletBalance.toString());
//     //   console.log("Crowdsale Balance: ", crowdsaleBalance.toString());
//     //   console.log("Dev Balance: ", devBalance.toString());
//     //   console.log("Core Team Balance: ", coreTeamBalance.toString());
//     //   console.log("Investor Balance: ", investorBalance.toString());

//     //   console.log("Tokens of accounts before Private Crowdsale:");
//     //   tx = {
//     //     to: tokenCrowdsaleInstance.address,
//     //     value: ethers.utils.parseEther("10"),
//     //   };
//     //   await investor.sendTransaction(tx);

//     //   await tokenCrowdsaleInstance.releaseVesting();
      
//     //   await tokenCrowdsaleInstance
//     //     .connect(investor)
//     //     .withdrawTokens(investor.address);

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

//     //   // await tokenCrowdsaleInstance.finalize();
//     //   // await tokenCrowdsaleInstance
//     //   //   .connect(investor)
//     //   //   .withdrawTokens(investor.address);
//     //   // await tokenCrowdsaleInstance.releaseVesting();


//     //   console.log("-------------------------------------------");

//     //   await ethers.provider.send("evm_increaseTime", [sevenDays * 8]);
//     //   console.log("-------------WEEK 30-------------");
//     //   console.log("Balances of accounts before Private Crowdsale:");
//     //   rate = await tokenCrowdsaleInstance.rate();
//     //   console.log("Rate:", rate.toString());
//     //   walletBalance = (await provider.getBalance(wallet.address)) / 10 ** 18;
//     //   devBalance =
//     //     (await provider.getBalance(_devFund.address)) / 10 ** 18;
//     //   coreTeamBalance = (await provider.getBalance(_coreTeamFund.address)) / 10 ** 18;
//     //   investorBalance = (await provider.getBalance(investor.address)) / 10 ** 18;      
//     //   crowdsaleBalance =
//     //     (await provider.getBalance(tokenCrowdsaleInstance.address)) / 10 ** 18;
//     //   console.log("Wallet Balance: ", walletBalance.toString());
//     //   console.log("Crowdsale Balance: ", crowdsaleBalance.toString());
//     //   console.log("Dev Balance: ", devBalance.toString());
//     //   console.log("Core Team Balance: ", coreTeamBalance.toString());
//     //   console.log("Investor Balance: ", investorBalance.toString());

//     //   console.log("Tokens of accounts before Private Crowdsale:");
//     //   tx = {
//     //     to: tokenCrowdsaleInstance.address,
//     //     value: ethers.utils.parseEther("10"),
//     //   };
//     //   await investor.sendTransaction(tx);

//     //   await tokenCrowdsaleInstance.releaseVesting();
//     //   await tokenCrowdsaleInstance
//     //     .connect(investor)
//     //     .withdrawTokens(investor.address);

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

//     //   // await tokenCrowdsaleInstance.finalize();
//     //   // await tokenCrowdsaleInstance
//     //   //   .connect(investor)
//     //   //   .withdrawTokens(investor.address);
//     //   // await tokenCrowdsaleInstance.releaseVesting();
//     });
