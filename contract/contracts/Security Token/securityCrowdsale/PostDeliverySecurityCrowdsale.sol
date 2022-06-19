// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "contracts/Security Token/securityCrowdsale/TimedCrowdsale.sol";
import "contracts/Utility Token/utilityCrowdsale/Secondary.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "contracts/Security Token/securityCrowdsale/FinalizableSecurityCrowdsale.sol";


/**
 * @title PostDeliveryCrowdsale
 * @dev Crowdsale that locks tokens from withdrawal until it ends.
 */
abstract contract PostDeliveryCrowdsale is FinalizableCrowdsale {
    using SafeMath for uint256;

    // Mapping from token ID to account balances
    mapping(uint256 => mapping(address => uint256)) private _balances;
    __unstable__TokenVault private _vault;

    constructor()  {
        _vault = new __unstable__TokenVault();
    }

    /**
     * @dev Withdraw tokens only after crowdsale ends.
     * @param account Whose tokens will be withdrawn.
     */
    function withdrawTokens(address account,uint256 id) public virtual {
        require(hasClosed(id), "PostDeliveryCrowdsale: not closed");
        uint256 amount = _balances[id][account];
        require(amount > 0, "PostDeliveryCrowdsale: account is not due any tokens");

        _balances[id][account] = 0;
        _vault.transfer(token(),address(_vault), account, id, amount, "");
    }

    // /**
    //  * @return the balance of an account.
    //  */
    // function balanceOf(address account,uint256 id) public view returns (uint256) {
    //     return _balances[id][account];
    // }

    /**
     * @dev Overrides parent by storing due balances, and delivering tokens to the vault instead of the end user. This
     * ensures that the tokens will be available by the time they are withdrawn (which may not be the case if
     * `_deliverTokens` was called later).
     * @param to Token purchaser
     * @param amount Amount of tokens purchased
     */
    function _processPurchase(address to, uint256 id,uint256 amount, bytes memory data) internal  {
        _balances[id][to] = _balances[id][to].add(amount);
        _deliverTokens(address(_vault),id,amount,data);
        // super._processPurchase(to,id,amount,"");
    }
}

/**
 * @title __unstable__TokenVault
 * @dev Similar to an Escrow for tokens, this contract allows its primary account to spend its tokens as it sees fit.
 * This contract is an internal helper for PostDeliveryCrowdsale, and should not be used outside of this context.
 */
// solhint-disable-next-line contract-name-camelcase
contract __unstable__TokenVault is Secondary {
    function transfer(IERC1155 token,address from, address to,uint256 id, uint256 amount,bytes memory data) public onlyPrimary {
        console.log("123456");
        token.safeTransferFrom(from, to, id, amount, data);
    }
}
