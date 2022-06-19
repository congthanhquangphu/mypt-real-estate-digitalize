// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "contracts/Utility Token/utilityCrowdsale/ERC20Mintable.sol";

contract UtilityToken is ERC20, ERC20Mintable {
    constructor(string memory name_, string memory symbol_) ERC20(name_, symbol_) {
    }
}