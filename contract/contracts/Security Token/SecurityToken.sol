// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "contracts/Security Token/securityCrowdsale/ERC1155Mintable.sol";

contract SecurityToken is ERC1155Mintable {

    string public name;
    string public symbol;
    uint256[]  ids;

    constructor(
    string memory _uri,
    string memory _name,
    string memory _symbol
    ) 
    ERC1155(_uri) 
    
    {
        name = _name;
        symbol = _symbol;

    }

    function mintToken(uint256 tokenId, string memory tokenURI,address benificary, uint256 amount) external returns(bool) {
        for (uint i = 0;i < ids.length;i++) {
            require (ids[i] != tokenId,"tokenId is dupplicate");
        }
        _setTokenURI(tokenId,tokenURI);
        mint(benificary,tokenId,amount,"");
        ids.push(tokenId);
        return true;
    }
    function getIds() public view returns(uint256[] memory) {
        return ids;
    }

}  

 