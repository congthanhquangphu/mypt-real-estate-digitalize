// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "contracts/Security Token/securityCrowdsale/TimedCrowdsale.sol";

/**
 * @title FinalizableCrowdsale
 * @dev Extension of TimedCrowdsale with a one-off finalization action, where one
 * can do extra work after finishing.
 */
abstract contract FinalizableCrowdsale is TimedSecurityToken {
    using SafeMath for uint256;

    mapping ( uint256 => bool)  private _finalized;

    event CrowdsaleFinalized();

    function _setFinalized(uint256 id) internal  {
        _finalized[id] = false;
    }
    
    /**
     * @return true if the crowdsale is finalized, false otherwise.
     */
    function finalized(uint256 id) public view returns (bool) {
        return _finalized[id];
    }

    /**
     * @dev Must be called after crowdsale ends, to do some extra finalization
     * work. Calls the contract's finalization function.
     */
    function finalize(uint256 id) public {
        require(!_finalized[id], "FinalizableCrowdsale: already finalized");
        require(hasClosed(id), "FinalizableCrowdsale: not closed");

        _finalized[id] = true;

        _finalization(id);
        emit CrowdsaleFinalized();
    }

    /**
     * @dev Can be overridden to add finalization logic. The overriding function
     * should call super._finalization() to ensure the chain of finalization is
     * executed entirely.
     */
    function _finalization(uint256 id) internal virtual  {
        // solhint-disable-previous-line no-empty-blocks
    }
}
