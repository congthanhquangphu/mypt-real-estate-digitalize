// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;



import "contracts/Security Token/securityCrowdsale/ERC1155Supply.sol";
import "contracts/Utility Token/roles/MinterRole.sol";

/**
 * @dev Extension of {ERC20} that adds a set of accounts with the {MinterRole},
 * which have permission to mint (create) new tokens as they see fit.
 *
 * At construction, the deployer of the contract is the only minter.
 */
abstract contract ERC1155Mintable is ERC1155Supply {
    /**
     * @dev See {ERC20-_mint}.
     *
     * Requirements:
     *
     * - the caller must have the {MinterRole}.
     */
    function mint( address to,
        uint256 id,
        uint256 amount,
        bytes memory data) 
        public returns (bool) {

        _mint(to,id,amount,data);
        
        return true;
    }
}
