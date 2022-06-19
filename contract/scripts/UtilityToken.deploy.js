// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
require('dotenv').config();
const hre = require("hardhat");

async function main() {
let tokenInstance;
  let tokenCrowdsaleInstance;
  let TokenVestingInstance1,TokenVestingInstance2, TokenVesting,TokenVestingInstance3,TokenVestingInstance4;
  

  let sevenDays = 5 * 60;
  let oneDays =  60;

  let _devDuration, 
    _coreTeamDuration,
    _reserveDuration,
    _advisorDuration;

  let _devStartTime,
      _coreTeamStartTime,
      _advisorStartTime,
      _reserveStartTime;

  let _devCliffDuration,
      _coreTeamCliffDuration,
      _reserveCliffDuration,
      _advisorCliffDuration;
  

  let developer,wallet;
  let _devFund, _coreTeamFund,_reserveFund,_advisorFund;

  let _name, _symbol, _rate, _openingTime, _privateClosingTime;
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
    

//   let devPercentage    = 20;
//   let coreTeamPercentage = 20;
//   let reservePercentage = 25;
//   let advisorPercentage = 15
//   let privatePercentage  = 15;
//   let publicPercentage  = 5;


  const provider = hre.ethers.provider;
  
    // 9,8,7,6,5,4
  developer = new hre.ethers.Wallet(process.env.DEVELOPER_PRIVATE_KEY, provider);    
  wallet = new hre.ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);  
  _devFund = new hre.ethers.Wallet(process.env.DEVFUND_PRIVATE_KEY, provider);  
  _coreTeamFund = new hre.ethers.Wallet(process.env.CORETEAMFUND_PRIVATE_KEY, provider);  
  _reserveFund = new hre.ethers.Wallet(process.env.RESERVEFUND_PRIVATE_KEY, provider);  
  _advisorFund = new hre.ethers.Wallet(process.env.ADVISORFUND_PRIVATE_KEY, provider);  

   

    _name = "Real Estate Utility Token";
    _symbol = "REUT";

    const DappToken = await ethers.getContractFactory("UtilityToken");
    tokenInstance = await DappToken.deploy(_name, _symbol);
    await tokenInstance.deployed();

    _rate = 5000;
    _token = tokenInstance.address;

    const currentBlockNumber = await ethers.provider.getBlockNumber();
    const blockNumber = await ethers.provider.getBlock(currentBlockNumber);

    _openingTime = blockNumber.timestamp + sevenDays * 13;
    _privateClosingTime = blockNumber.timestamp + sevenDays * 25;

    _devStartTime =  blockNumber.timestamp + sevenDays * 1;
    _coreTeamStartTime = blockNumber.timestamp + sevenDays * 1;
    _reserveStartTime =  blockNumber.timestamp + sevenDays * 1;
    _advisorStartTime =  blockNumber.timestamp + sevenDays * 1;

    _devCliffDuration = sevenDays * 8;
    _coreTeamCliffDuration = sevenDays * 12;
    _reserveCliffDuration = sevenDays * 12;
    _advisorCliffDuration = sevenDays * 12;


    _devDuration = sevenDays * 48;
    _coreTeamDuration = sevenDays * 48;
    _reserveDuration = sevenDays * 48;
    _advisorDuration = sevenDays * 48;


    const Crowsale = await ethers.getContractFactory("UTCrowdsale");
    tokenCrowdsaleInstance = await Crowsale.deploy(
      _rate,
      wallet.address,
      tokenInstance.address,
      _openingTime,
      _privateClosingTime,
      [
        ethers.BigNumber.from(_devStartTime),
        ethers.BigNumber.from(_coreTeamStartTime),
        ethers.BigNumber.from(_reserveStartTime),
        ethers.BigNumber.from(_advisorStartTime)
      ],
      [
        ethers.BigNumber.from(_devCliffDuration),
        ethers.BigNumber.from(_coreTeamCliffDuration),
        ethers.BigNumber.from(_reserveCliffDuration),
        ethers.BigNumber.from(_advisorCliffDuration)
      ],
      [
        ethers.BigNumber.from(_devDuration),
        ethers.BigNumber.from(_coreTeamDuration),
        ethers.BigNumber.from(_reserveDuration),
        ethers.BigNumber.from(_advisorDuration)
      ],
      [
        _devFund.address,
        _coreTeamFund.address,
        _reserveFund.address,
        _advisorFund.address
      ],    
    );
    TokenVesting = await ethers.getContractFactory("TokenVesting");
    TokenVestingInstance1 = await TokenVesting.deploy(
      _devFund.address, 
      _devStartTime,
      _devCliffDuration,
      _devDuration,
      true
    );

    TokenVestingInstance2 = await TokenVesting.deploy(
      _coreTeamFund.address,
      _coreTeamStartTime,
      _coreTeamCliffDuration,
      _coreTeamDuration,
      true
    );

    TokenVestingInstance3 = await TokenVesting.deploy(
        _reserveFund.address,
        _reserveStartTime,
        _reserveCliffDuration,
        _reserveDuration,
        true
      );
      TokenVestingInstance4 = await TokenVesting.deploy(
        _advisorFund.address,
        _advisorStartTime,
        _advisorCliffDuration,
        _advisorDuration,
        true
      );


    // // await TokenVestingInstance.deployed();

    console.log("deployedToken: ", tokenInstance.address);
    console.log("tokenCrowsale: ", tokenCrowdsaleInstance.address);

    let add_new_minter = await tokenInstance.addMinter(tokenInstance.address);

    let minter = await tokenInstance
      .connect(developer)
      .addMinter(tokenCrowdsaleInstance.address);

    await tokenCrowdsaleInstance.begin1();
    await tokenCrowdsaleInstance.begin();

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
