// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

import "contracts/Security Token/securityCrowdsale/SecurityCrowdsale.sol";
import "contracts/Security Token/securityCrowdsale/PostDeliverySecurityCrowdsale.sol";
import "contracts/Security Token/securityCrowdsale/FinalizableSecurityCrowdsale.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "contracts/Security Token/securityCrowdsale/RefundablePostdeliverySecurityCrowdsale.sol";
import "contracts/Security Token/securityCrowdsale/RefundableSecurityCrowdsale.sol";



contract STCrowdsale is RefundablePostDeliveryCrowdsale, Ownable  {
    using SafeMath for uint256;

    uint256 public constant investorMinCap = 25 * 10**14; // 0.0025 ether;
    uint256 public constant investorHardCap = 50 * 10**18; // 50 ether;
    mapping ( address => uint256)  public  contributions;
  

    IERC1155 public token_;
    address payable public wallet_;


    constructor(
        address payable _wallet,
        IERC1155 _token
    )
       
    {
        token_ = _token;
        wallet_ = _wallet;  

    }


   function setURICrowdsale(uint256 tokenId,uint256 openingTime_, uint256 closingTime_,uint256 rate_,uint256 goal_,uint256 cap_) external onlyOwner {
        cap_ = cap_ * 10**18;
        _setTimeOfId(openingTime_,closingTime_,tokenId);
        _setCrowdsale(rate_,wallet_,tokenId,token_);
        _setGoalOfId(goal_, tokenId);
        _setFinalized(tokenId);
        _setCapOfId(cap_,tokenId);
    }
    function buyTokens(address beneficiary, uint256 id) external nonReentrant payable {
        
        console.log("----------------------------");
        uint256 weiAmount = msg.value;
        console.log("----------------------------");
        _preValidatePurchase(beneficiary, weiAmount,id);
        
        // calculate _token amount to be created
        uint256 tokens = _getTokenAmount(weiAmount,id);

        // update state
        _weiRaised[id] = _weiRaised[id].add(weiAmount);

        _processPurchase(beneficiary, id,tokens,"");

        _forwardFunds();
    
    }


  function getUserContribution (address _beneficiary) public view returns (uint256) {
    return (contributions[_beneficiary]);
  }



  


  function _finalization(uint256 id) internal virtual override {

    super._finalization(id);
  }

 

  function _preValidatePurchase (address _beneficiary, uint256 _weiAmount,uint256 id) internal virtual override   {
    super._preValidatePurchase(_beneficiary,_weiAmount,id);
    require(isOpen(id));
    require(!hasClosed(id));
    // uint256 _existingContribution = contributions[_beneficiary];
    // uint256 _newContribution = _existingContribution.add(_weiAmount);
    // require(_newContribution >= investorMinCap && _newContribution <= investorHardCap,"So luong tien nho hon muc toi thieu hoac lon hon muc toi da");


    // contributions[_beneficiary] = _newContribution;
  }
}
