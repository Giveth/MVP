pragma solidity ^0.4.0;

import "HumanStandardToken.sol";

// HumanStandardToken is Consensys's ERC 20 compliant token contract with the 
// approveAndCall function omitted

contract CharityToken is HumanStandardToken {

// The creator is the address that deployed the Charity Token, for Charity DAO
// it will be the Campaign Contract  
    address public creator;

// onlyCreator is a modifier that only allows the creator to call the function

    modifier onlyCreator { if (msg.sender != creator) throw; _; }

// charityToken is the function that deploys a new token 

    function CharityToken() HumanStandardToken(0,"Charity Token",18,"GIVE") {
        creator = msg.sender;
    }

// createTokens takes parameters beneficiary (the address receiving the tokens) 
// and amount (the amount of tokens the address is receiving) that can only be 
// called by the creator if the campaign has not been sealed. If it works it 
// will return success == true

    function createTokens(address beneficiary, uint amount
    ) onlyCreator returns (bool success) {
        if (sealed()) throw;              
        balances[beneficiary] += amount;  // Create Tokens for the beneficiary
        totalSupply += amount;            // Update total supply
        Transfer(0, beneficiary, amount); // Create an Event for the creation
        return true; 
    }

// seal can only be called by the Creator and it makes it impossible to create
// more tokens by changing the creator to 0

    function seal() onlyCreator returns (bool success)  {
        creator = 0;
        return true;
    }

// sealed checks to see if the the token contract can create tokens

    function sealed() constant returns (bool) {
        return creator == 0;
    }

}
