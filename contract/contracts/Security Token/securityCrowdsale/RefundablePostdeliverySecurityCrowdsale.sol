// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "contracts/Security Token/securityCrowdsale/RefundableSecurityCrowdsale.sol";
import "hardhat/console.sol";


/**
 * @title RefundablePostDeliveryCrowdsale
 * @dev Extension of RefundableCrowdsale contract that only delivers the tokens
 * once the crowdsale has closed and the goal met, preventing refunds to be issued
 * to token holders.
 */
abstract contract RefundablePostDeliveryCrowdsale is RefundableCrowdsale {
    function withdrawTokens(address beneficiary,uint256 id) public virtual override {
        require(finalized(id), "RefundablePostDeliveryCrowdsale: not finalized");
        console.log('1');
        require(goalReached(id), "RefundablePostDeliveryCrowdsale: goal not reached");
        console.log('1');
        super.withdrawTokens(beneficiary,id);
    }
}
