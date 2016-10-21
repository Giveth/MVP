pragma solidity ^0.4.0;

import "HumanStandardToken.sol";


contract CharityToken is HumanStandardToken {

    address public creator;

    modifier onlyCreator { if (msg.sender != creator) throw; _; }

    function CharityToken() HumanStandardToken(0,"Charity Token",18,"ChT") {
        creator = msg.sender;
    }

    function createTokens(address beneficiary, uint amount) onlyCreator returns (bool success) {
        if (sealed()) throw;
        balances[beneficiary] += amount;               // Give the creator all initial tokens
        totalSupply += amount;                        // Update total supply
        Transfer(0, beneficiary, amount);             // Simulate a creation as a Transfer from 0.
        return true;
    }


    function seal() onlyCreator returns (bool success)  {
        creator = 0;
        return true;
    }

    function sealed() constant returns (bool) {
        return creator == 0;
    }

}
