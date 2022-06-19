// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "contracts/Security Token/securityCrowdsale/SecurityCrowdsale.sol";
import "contracts/Security Token/securityCrowdsale/ERC1155Capped.sol";

/**
 * @title TimedSecurityToken
 * @dev Crowdsale accepting contributions only within a time frame.
 */
abstract contract TimedSecurityToken is ERC1155Capped  {

    using SafeMath for uint256;
    
    mapping(uint256 => uint256) private _openingTime;
    mapping(uint256 => uint256) private _closingTime;

    /**
     * Event for crowdsale extending
     * @param newClosingTime new closing time
     * @param prevClosingTime old closing time
     */
    event TimedCrowdsaleExtended(uint256 prevClosingTime, uint256 newClosingTime);



    function _setTimeOfId(uint256 openingTime_, uint256 closingTime_, uint256 id) internal {
        // solhint-disable-next-line not-rely-on-time
        require(openingTime_ >= block.timestamp, "TimedSecurityToken: opening time is before current time");
        // solhint-disable-next-line max-line-length
        require(closingTime_ > openingTime_, "TimedSecurityToken: opening time is not before closing time");

        _openingTime[id] = openingTime_;
        _closingTime[id] = closingTime_;
    }


    /**
     * @return the crowdsale opening time.
     */
    function openingTime(uint256 id) public view returns (uint256) {
        return _openingTime[id];
    }

    /**
     * @return the crowdsale closing time.
     */

    function closingTime(uint256 id) public view returns (uint256) {
        return _closingTime[id];
    }

    /**
     * @return true if the crowdsale is open, false otherwise.
     */
    function isOpen(uint256 id) public view returns (bool) {
        // solhint-disable-next-line not-rely-on-time
        return block.timestamp >= _openingTime[id];
    }

    /**
     * @dev Checks whether the period in which the crowdsale is open has already elapsed.
     * @return Whether crowdsale period has elapsed
     */
    function hasClosed(uint256 id) public view returns (bool) {
        // solhint-disable-next-line not-rely-on-time
        return block.timestamp > _closingTime[id];
    }

    /**
     * @dev Extend parent behavior requiring to be within contributing period.
     * @param beneficiary Token purchaser
     * @param weiAmount Amount of wei contributed
     */
    function _preValidatePurchase(address beneficiary, uint256 weiAmount,uint256 id) internal virtual override   {
        super._preValidatePurchase(beneficiary, weiAmount,id);
    }

    /**
     * @dev Extend crowdsale.
     * @param newClosingTime Crowdsale closing time
     */
    function _extendTime(uint256 newClosingTime,uint256 id) internal {
        require(!hasClosed(id), "TimedSecurityToken: already closed");
        // solhint-disable-next-line max-line-length
        require(newClosingTime > _closingTime[id], "TimedSecurityToken: new closing time is before current closing time");

        // emit TimedCrowdsaleExtended(prevClosingTime,newClosingTime);
        _closingTime[id] = newClosingTime;
    }
}
