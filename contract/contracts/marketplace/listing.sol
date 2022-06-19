// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "hardhat/console.sol";

contract Listing is ReentrancyGuard {

    // Variables
    address payable public immutable feeAccount; // the account that receives fees
    uint256 public immutable feePercent; // the fee percentage on sales 
    uint256 public itemCount; 
    
    struct Item {
        uint256 itemId;
        IERC1155 token;
        uint256 tokenId;
        uint256 price;
        uint256 amount;
        address payable seller;
        // bool sold;
    }

    // itemId -> Item
    mapping(uint256 => Item) public items;

    event Offered(
        uint256 itemId,
        address indexed token,
        uint256 tokenId,
        uint256 price,
        uint256 amount,
        address indexed seller
    );
    event Bought(
        uint256 itemId,
        address indexed token,
        uint256 tokenId,
        uint256 price,
        uint256 amount,
        address indexed seller,
        address indexed buyer
    );

    constructor(uint256 _feePercent, address _wallet) {
        feeAccount = payable(_wallet);
        feePercent = _feePercent;
    }

    // Make item to offer on the marketplace
    function makeItem(IERC1155 _token, uint256 _tokenId, uint256 _price,uint256 amount) external nonReentrant {
        require(_price > 0, "Price must be greater than zero");
        // increment itemCount
        itemCount ++;
        // transfer token amount
        _token.safeTransferFrom(msg.sender, address(this),_tokenId,amount,"");
        // add new item to items mapping
        items[itemCount] = Item (
            itemCount,
            _token,
            _tokenId,
            _price,
            amount,
            payable(msg.sender)
        );
        // emit Offered event
        emit Offered(
            itemCount,
            address(_token),
            _tokenId,
            _price,
            amount,
            msg.sender
        );
    }

    function purchaseItem(uint256 _itemId,uint256 amount) external payable nonReentrant {
        uint256 _totalPrice = getTotalPrice(_itemId,amount);
        Item storage item = items[_itemId];
        require(_itemId > 0 && _itemId <= itemCount, "item doesn't exist");
        require(msg.value >= _totalPrice, "not enough ether to cover item price and market fee");
        // require(!item.sold, "item already sold");
        require(item.amount >= amount, "amount bigger than item.amount");
        // pay seller and feeAccount
        item.seller.transfer(item.price*amount);
        feeAccount.transfer(_totalPrice - item.price*amount);
        // update item to sold
        item.amount = item.amount - amount;

        // transfer token to buyer
        item.token.safeTransferFrom(address(this), msg.sender, item.tokenId,amount,"");
        // emit Bought event
        emit Bought(
            _itemId,
            address(item.token),
            item.tokenId,
            item.price,
            amount,
            item.seller,
            msg.sender
        );
    }
    function getTotalPrice(uint256 _itemId, uint256 amount) view public returns(uint256){
        return((items[_itemId].price*amount*(100 + feePercent))/100);
    }
    
}