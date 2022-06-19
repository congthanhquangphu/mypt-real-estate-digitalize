// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
// import "contracts/Security Token/securityCrowdsale/FinalizableSecurityCrowdsale.sol";
import "@openzeppelin/contracts/utils/escrow/RefundEscrow.sol";
import "contracts/Security Token/securityCrowdsale/PostDeliverySecurityCrowdsale.sol";


/**
 * @title RefundableCrowdsale
 * @dev Extension of `FinalizableCrowdsale` contract that adds a funding goal, and the possibility of users
 * getting a refund if goal is not met.
 *
 * Deprecated, use `RefundablePostDeliveryCrowdsale` instead. Note that if you allow tokens to be traded before the goal
 * is met, then an attack is possible in which the attacker purchases tokens from the crowdsale and when they sees that
 * the goal is unlikely to be met, they sell their tokens (possibly at a discount). The attacker will be refunded when
 * the crowdsale is finalized, and the users that purchased from them will be left with worthless tokens.
 */
abstract contract RefundableCrowdsale is PostDeliveryCrowdsale {
    using SafeMath for uint256;

    // minimum amount of funds to be raised in weis
    mapping(uint256 => uint256) private _goal;

    // refund escrow used to hold funds while crowdsale is running
    RefundEscrow private _escrow;

    /**
     * @dev Constructor, creates RefundEscrow.
     * @param goal_ Funding goal
     */
    function _setGoalOfId(uint256 goal_, uint256 id) internal {
        require(goal_ > 0, "RefundableCrowdsale: goal is 0");
        _escrow = new RefundEscrow(wallet());
        _goal[id] = goal_;
    }

    /**
     * @return minimum amount of funds to be raised in wei.
     */
    function goal(uint256 id) public view returns (uint256) {
        return _goal[id];
    }

    /**
     * @dev Investors can claim refunds here if crowdsale is unsuccessful.
     * @param refundee Whose refund will be claimed.
     */
    function claimRefund(address payable refundee, uint256 id) public {
        require(finalized(id), "RefundableCrowdsale: not finalized");
        require(!goalReached(id), "RefundableCrowdsale: goal reached");


    
        _escrow.withdraw(refundee);
    }

    /**
     * @dev Checks whether funding goal was reached.
     * @return Whether funding goal was reached
     */
    function goalReached(uint256 id) public view returns (bool) {
        return weiRaised(id) >= _goal[id];
    }

    /**
     * @dev Escrow finalization task, called when finalize() is called.
     */
    function _finalization(uint256 id) internal virtual override {
        if (goalReached(id)) {
            _escrow.close();
            _escrow.beneficiaryWithdraw();
        } else {
            _escrow.enableRefunds();
        }

        super._finalization(id);
    }

    /**
     * @dev Overrides Crowdsale fund forwarding, sending funds to escrow.
     */
    function _forwardFunds() internal {
        _escrow.deposit{value: msg.value}(_msgSender());
    }
}
