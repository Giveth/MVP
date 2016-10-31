pragma solidity ^0.4.0;

import "HumanStandardToken.sol";

/// @title CharityToken Contract 
/// @author Jordi Baylina
/// @dev This token contract is a clone of ConsenSys's HumanStandardToken with 
/// the approveAndCall function omitted; it is ERC 20 compliant.

contract CharityToken is HumanStandardToken {

/// @dev The creator is the address that deployed the CharityToken, for this 
/// token it will be it will be the TokenCreator Contract  

    address public creator;

/// @dev The onlyCreator modifier only allows the creator to call the function

    modifier onlyCreator { if (msg.sender != creator) throw; _; }

/// @notice `CharityToken()` is the function that deploys a new 
/// HumanStandardToken with the parameters of 0 initial tokens, the name 
/// "CharityDAO Token" the decimal place of the smallest unit being 18, and the 
/// call sign being "GIVE". It will set the creator to be the contract that 
/// calls the function.

    function CharityToken() HumanStandardToken(0,"CharityDAO Token",18,"GIVE") {
        creator = msg.sender;
    }

/// @notice `createTokens()` will create tokens if the campaign has not been 
/// sealed. 
/// @dev `createTokens()` is called by the tokenCreator contract when 
/// someone sends ether to that contract or calls `proxyPayment()`
/// @param beneficiary The address receiving the tokens 
/// @param amount The amount of tokens the address is receiving
/// @return True if tokens are created

    function createTokens(address beneficiary, uint amount
    ) onlyCreator returns (bool success) {
        if (sealed()) throw;              
        balances[beneficiary] += amount;  // Create tokens for the beneficiary
        totalSupply += amount;            // Update total supply
        Transfer(0, beneficiary, amount); // Create an Event for the creation
        return true; 
    }

/// @notice `seal()` ends the Campaign by making it impossible to create more 
/// tokens. 
/// @dev `seal()` changes the creator to 0 and therefore can only be called by 
/// the tokenCreator contract once
/// @return True if the Campaign is sealed

    function seal() onlyCreator returns (bool success)  {
        creator = 0;
        return true;
    }

/// @notice `sealed()` checks to see if the the Campaign has been sealed
/// @return True if the Campaign has been sealed and can't receive funds

    function sealed() constant returns (bool) {
        return creator == 0;
    }
}
