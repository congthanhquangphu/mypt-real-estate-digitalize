// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (token/ERC20/extensions/ERC20Capped.sol)

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "contracts/Security Token/securityCrowdsale/SecurityCrowdsale.sol";


/**
 * @dev Extension of {ERC20} that adds a cap to the supply of tokens.
 */
abstract contract ERC1155Capped is SecurityCrowdsale {
    mapping (uint256 => uint256) private _cap;
    
    /**
     * @dev Sets the value of the `cap`. This value is immutable, it can only be
     * set once during construction.
     */
    function _setCapOfId(uint256 cap_,uint256 id) internal {
        require(cap_ > 0, "ERC20Capped: cap is 0");
        _cap[id] = cap_;
    }

    /**
     * @dev Returns the cap on the token's total supply.
     */
    function cap(uint256 id) public view virtual returns (uint256) {
        return _cap[id];
    }

    /**
     * @dev See {ERC20-_mint}.
     */
    function _preValidatePurchase(address beneficiary, uint256 weiAmount,uint256 id) internal virtual override {
        require(beneficiary != address(0), "Crowdsale: beneficiary is the zero address");
        require(_getTokenAmount((weiRaised(id)+ weiAmount),id)  <= cap(id), "ERC1155Capped: cap exceeded");
    }
}
