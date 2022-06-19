// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "contracts/Utility Token/utilityCrowdsale/Crowdsale.sol";
import "contracts/Utility Token/utilityCrowdsale/ERC20Mintable.sol";
import "contracts/Utility Token/utilityCrowdsale/VestingToken.sol";
import "contracts/Utility Token/utilityCrowdsale/FinalizableCrowdsale.sol";
import "contracts/Utility Token/utilityCrowdsale/PostDeliveryCrowdsale.sol";
import "contracts/Utility Token/roles/MinterRole.sol";
import "hardhat/console.sol";


contract UTCrowdsale is Crowdsale, FinalizableCrowdsale, PostDeliveryCrowdsale, MinterRole {
    using SafeMath for uint256;

    uint256 public constant investorMinCap = 10**14; // 0.0001 ether;
    uint256 public constant investorHardCap = 50 * 10**18; // 50 ether;
    mapping ( address => uint256)  public  contributions;
    uint256 public TokensRaised = 0;
    uint256 public tokenTotalSupply =   10**9 * 10**18; // 1 tỷ token 
    uint256 public privateSaleSupply = 15 * 10**7 * 10**18; // 150 triệu token để bán cho vòng private
    uint256 public publicSaleSupply  =   20 * 10**7 * 10**18; //  50 triệu token để bán cho vòng public
   



    // Percentage for token Distribution
    uint256 public immutable devPercentage    = 20;
    uint256 public immutable coreTeamPercentage  = 20;
    uint256 public immutable reservePercentage = 25;
    uint256 public immutable advisorPercentage = 15;
    uint256 public immutable privateSalePercentage = 15;
    uint256 public immutable publicSalePercentage = 5;




    struct FundAddress {
      address payable devFund;
      address payable coreTeamFund;
      address payable reserveFund;
      address payable advisorFund;
    }

    FundAddress public fundAddress;

    ERC20Mintable public _ERC20Mintable;

  struct StartTime {  
      uint256 devStartTime;
      uint256 coreTeamStartTime;
      uint256 reserveStartTime;
      uint256 advisorStartTime;
  }

  StartTime public startTime;
  


  TokenVesting public devTimelock;
  TokenVesting public coreTeamTimelock;
  TokenVesting public reserveTimelock;
  TokenVesting public advisorTimelock;
  

  struct CliffDuration {
    uint256 devCliffDuration;
    uint256 coreTeamCliffDuration;
    uint256 reserveCliffDuration;
    uint256 advisorCliffDuration;
    }
    CliffDuration public cliffDuration;

    struct Duration {
    uint256 devDuration;
    uint256 coreTeamDuration;
    uint256 reserveDuration;
    uint256 advisorDuration;
    }
    Duration public duration;

    constructor(
    uint256 _rate,
    address payable _wallet,
    IERC20 _token,
    uint256 _openingTime,
    uint256 _privateClosingTime,
    StartTime memory _startTime,
    CliffDuration memory _cliffDuration,
    Duration memory _duration,
    FundAddress memory  _fundAddress
 
  )
    
    Crowdsale(_rate, _wallet, _token)
    TimedCrowdsale(_openingTime, _privateClosingTime)

  {
    startTime.coreTeamStartTime = _startTime.coreTeamStartTime;
    startTime.devStartTime = _startTime.devStartTime;
    startTime.advisorStartTime = _startTime.advisorStartTime;
    startTime.reserveStartTime = _startTime.reserveStartTime;

    cliffDuration.coreTeamCliffDuration = _cliffDuration.coreTeamCliffDuration;
    cliffDuration.devCliffDuration = _cliffDuration.devCliffDuration;
    cliffDuration.advisorCliffDuration = _cliffDuration.advisorCliffDuration;
    cliffDuration.reserveCliffDuration = _cliffDuration.reserveCliffDuration;

    duration.advisorDuration = _duration.advisorDuration;
    duration.coreTeamDuration = _duration.coreTeamDuration;
    duration.devDuration = _duration.devDuration;
    duration.reserveDuration = _duration.reserveDuration;

    fundAddress.advisorFund = _fundAddress.advisorFund;
    fundAddress.coreTeamFund = _fundAddress.coreTeamFund;
    fundAddress.reserveFund = _fundAddress.reserveFund;
    fundAddress.devFund = _fundAddress.devFund;
    
   

    _ERC20Mintable = ERC20Mintable(address(_token));
    

  }


  
  function getUserContribution (address _beneficiary) public view returns (uint256) {
    return (contributions[_beneficiary]);
  }

  function tokensRaised() public view returns (uint256) {
    return TokensRaised;
  }

  function withdrawTokens(address beneficiary) public virtual override {
    super.withdrawTokens(beneficiary);
  }


  function _finalization() internal virtual override {
    if (hasClosedPrivate()) {
      _rate = 2000;
      
    }

    super._finalization();
  }

  function begin() external payable onlyMinter {
    
    
    
    advisorTimelock = new TokenVesting(fundAddress.advisorFund,startTime.advisorStartTime,cliffDuration.advisorCliffDuration,duration.advisorDuration, true);
    coreTeamTimelock   = new TokenVesting(fundAddress.coreTeamFund,startTime.coreTeamStartTime,cliffDuration.coreTeamCliffDuration, duration.coreTeamDuration, true);
    
    _ERC20Mintable.mint(address(coreTeamTimelock),   tokenTotalSupply.mul(coreTeamPercentage).div(100));
    _ERC20Mintable.mint(address(advisorTimelock),   tokenTotalSupply.mul(advisorPercentage).div(100));
  
  }

  function begin1() external payable onlyMinter {
    
    
    devTimelock   = new TokenVesting(fundAddress.devFund,startTime.devStartTime,cliffDuration.devCliffDuration, duration.devDuration, true);
   
    reserveTimelock   = new TokenVesting(fundAddress.reserveFund,startTime.reserveStartTime,cliffDuration.reserveCliffDuration, duration.reserveDuration, true);

    _ERC20Mintable.mint(address(devTimelock),   tokenTotalSupply.mul(devPercentage).div(100));
    _ERC20Mintable.mint(address(reserveTimelock),   tokenTotalSupply.mul(reservePercentage).div(100));
   
  
  }


  function releaseVesting() public {
    if (devTimelock._releasableAmount(_ERC20Mintable) > 0) {
        devTimelock.release(_ERC20Mintable);
    }
      
    // timelock.seedTimelock.release(_ERC20Mintable);
    if (coreTeamTimelock._releasableAmount(_ERC20Mintable) > 0) {
        coreTeamTimelock.release(_ERC20Mintable);
    }

    if (reserveTimelock._releasableAmount(_ERC20Mintable) > 0) {
        reserveTimelock.release(_ERC20Mintable);
    }

    if (advisorTimelock._releasableAmount(_ERC20Mintable) > 0) {
        advisorTimelock.release(_ERC20Mintable);
    }
    
  }

  function getPrice(uint256 amount) view public returns(uint256){
        
        return amount / rate();
    }

  
  function buyTokens(address beneficiary) public payable nonReentrant  {

    uint256 weiAmount = msg.value;
    _preValidatePurchase(beneficiary, weiAmount);
    // calculate _token amount to be created
    uint256 tokens = _getTokenAmount(weiAmount);

    // update state
    _weiRaised = _weiRaised.add(weiAmount);

    TokensRaised += tokens;
    _processPurchase(beneficiary, tokens);

    _wallet.transfer(msg.value);
    
  }


  function _preValidatePurchase (address _beneficiary, uint256 _weiAmount) internal virtual override (TimedCrowdsale, Crowdsale)  {
    super._preValidatePurchase(_beneficiary,_weiAmount);
    require(isOpen(), "Crowsale is not open");
    uint256 _existingContribution = contributions[_beneficiary];
    uint256 _newContribution = _existingContribution.add(_weiAmount);
    require(_newContribution >= investorMinCap && _newContribution <= investorHardCap,"So luong tien nho hon muc toi thieu hoac lon hon muc toi da");

    uint256 tokens = _getTokenAmount(_weiAmount);
    
    if (_rate == 5000) {
      require ((TokensRaised + tokens) <= privateSaleSupply,"Exceeded the number of mint tokens");
    } else if (_rate == 2000) {
      require ((TokensRaised + tokens) <= publicSaleSupply,"Exceeded the number of mint tokens");
    }
    contributions[_beneficiary] = _newContribution;
  }
}
