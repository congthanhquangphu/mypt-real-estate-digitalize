// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "contracts/Security Token/securityCrowdsale/ERC1155Mintable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";



/**
 * @title Crowdsale
 * @dev Crowdsale is a base contract for managing a token crowdsale,
 * allowing investors to purchase tokens with ether. This contract implements
 * such functionality in its most fundamental form and can be extended to provide additional
 * functionality and/or custom behavior.
 * The external interface represents the basic interface for purchasing tokens, and conforms
 * the base architecture for crowdsales. It is *not* intended to be modified / overridden.
 * The internal interface conforms the extensible and modifiable surface of crowdsales. Override
 * the methods to add functionality. Consider using 'super' where appropriate to concatenate
 * behavior.
 */
abstract contract SecurityCrowdsale is Context, ReentrancyGuard {
    using SafeMath for uint256;

    address payable internal _wallet;

    IERC1155 internal _token;

    // How many token units a buyer gets per wei.
    // The rate is the conversion between wei and the smallest and indivisible token unit.
    // So, if you are using a rate of 1 with a ERC20Detailed token with 3 decimals called TOK
    // 1 wei will give you 1 unit, or 0.001 TOK.
    mapping (uint256 => uint256) internal _rate;

    // Amount of wei raised
    mapping (uint256 => uint256) internal _weiRaised; 

    /**
     * Event for token purchase logging
     * @param purchaser who paid for the tokens
     * @param beneficiary who got the tokens
     * @param value weis paid for purchase
     * @param amount amount of tokens purchased
     */
    event TokensPurchased(address indexed purchaser, address indexed beneficiary, uint256 value, uint256 amount);



    function _setCrowdsale(uint256 rate_, address payable wallet_, uint256 id, IERC1155 token_) internal {
        require(rate_ > 0, "Crowdsale: rate is 0");
        require(wallet_ != address(0), "Crowdsale: wallet is the zero address");

        _rate[id] = rate_;
        _wallet = wallet_;
        _token = token_;
    }

    

    /**
     * @return the address where funds are collected.
     */
    function wallet() public view returns (address payable) {
        return _wallet;
    }

    function token() public view returns (IERC1155) {
        return _token;
    }

    /**
     * @return the number of token units a buyer gets per wei.
     */
    function rate(uint256 id) public view returns (uint256) {
        return _rate[id];
    }

    /**
     * @return the amount of wei raised.
     */
    function weiRaised(uint256 id) public view returns (uint256) {
        return _weiRaised[id];
    }

    /**
     * @dev low level token purchase ***DO NOT OVERRIDE***
     * This function has a non-reentrancy guard, so it shouldn't be called by
     * another `nonReentrant` function.
     * @param beneficiary Recipient of the token purchase
     */
    

    /**
     * @dev Validation of an incoming purchase. Use require statements to revert state when conditions are not met.
     * Use `super` in contracts that inherit from Crowdsale to extend their validations.
     * Example from CappedCrowdsale.sol's _preValidatePurchase method:
     *     super._preValidatePurchase(beneficiary, weiAmount);
     *     require(weiRaised().add(weiAmount) <= cap);
     * @param beneficiary Address performing the token purchase
     * @param weiAmount Value in wei involved in the purchase
     */
    function _preValidatePurchase(address beneficiary, uint256 weiAmount,uint256 id) internal virtual  {
        require(beneficiary != address(0), "Crowdsale: beneficiary is the zero address");
        require(weiAmount != 0, "Crowdsale: weiAmount is 0");
   
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
    }

    /**
     * @dev Validation of an executed purchase. Observe state and use revert statements to undo rollback when valid
     * conditions are not met.
     * @param beneficiary Address performing the token purchase
     * @param weiAmount Value in wei involved in the purchase
     */
    function _postValidatePurchase(address beneficiary, uint256 weiAmount) internal view {
        // solhint-disable-previous-line no-empty-blocks
    }

    /**
     * @dev Source of tokens. Override this method to modify the way in which the crowdsale ultimately gets and sends
     * its tokens.
     * @param beneficiary Address performing the token purchase
     * @param tokenAmount Number of tokens to be emitted
     */
 

    /**
     * @dev Executed when a purchase has been validated and is ready to be executed. Doesn't necessarily emit/send
     * tokens.
     * @param to Address receiving the tokens
     * @param amount Number of tokens to be purchased
     */
    // function _processPurchase(address to, uint256 id,uint256 amount, bytes memory data) internal  {
        
    // }

    function _deliverTokens(address to, uint256 id,uint256 amount, bytes memory data) internal virtual {
        // _token._safeTransferFrom(from,to,id,amount,data);
        require( ERC1155Mintable(address(token())).mint(to,id,amount,data),"MintedCrowdsale: minting failed");
    }
    /**
     * @dev Override for extensions that require an internal state to check for validity (current user contributions,
     * etc.)
     * @param beneficiary Address receiving the tokens
     * @param weiAmount Value in wei involved in the purchase
     */
    // function _updatePurchasingState(address beneficiary, uint256 weiAmount) internal {
    //     // solhint-disable-previous-line no-empty-blocks
        
    // }

    /**
     * @dev Override to extend the way in which ether is converted to tokens.
     * @param weiAmount Value in wei to be converted into tokens
     * @return Number of tokens that can be purchased with the specified _weiAmount
     */

    function _getTokenAmount(uint256 weiAmount,uint256 id) internal view returns (uint256) {
        return weiAmount.mul(_rate[id]);
    }

    /**
     * @dev Determines how ETH is stored/forwarded on purchases.
     */
    // function _forwardFunds() internal {
    //     // _wallet.transfer(msg.value);
    //     super._forwardFunds();
    // }
}
