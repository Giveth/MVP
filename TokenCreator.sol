pragma solidity ^0.4.0;

// This contract creates Charity Tokens using CharityToken.sol

import "CharityToken.sol";

contract TokenCreator {

    uint public startFundingTime;       // In UNIX Time Format
    uint public endFundingTime;         // In UNIX Time Format

    uint public maximumFunding;         // In wei??

    uint public totalCollected;         // In wei??

    CharityToken public tokenContract;  // The new Campaign token
    address public vaultContract;       // The Address to hold the funds donated

// 'TokenCreator()' created the new Campaign Token with the begining and ending 
// Unix times the max funding allowed and the address to hold the donations

    function TokenCreator(
        uint _startFundingTime,
        uint _endFundingTime,
        uint _maximumFunding,
        address _vaultContract
    ) {
        if ((_endFundingTime < now) ||                //Cannot start in the past
            (_endFundingTime <= _startFundingTime) || 
            (_maximumFunding > 10000 ether) ||        //Can be increased later
            (_vaultContract == 0))                    //To prevent burning ETH
            {
            throw;
            }
        startFundingTime = _startFundingTime;
        endFundingTime = _endFundingTime;
        maximumFunding = _maximumFunding;
        tokenContract = new CharityToken ();
        vaultContract = _vaultContract;
    }
// Fallback function: when a normal send of ether is made to this contract 
// `proxyPayment()' is called witht he msg.sender as the owner
    function ()  payable {
        proxyPayment(msg.sender);
    }

    function proxyPayment(address _owner) {
// First we check that the Campaign can receive the value being sent to it
        if ((now<startFundingTime) ||
            (creator == 0) ||
            (now>endFundingTime) ||
            (msg.value == 0) ||
            (totalCollected + msg.value > maximumFunding))
        {
            throw;
        }
//Track how much the Campaign has collected
        totalCollected += msg.value;
//Sends the ETH to the Vault
        if (!vaultContract.send(msg.value)) {
            throw;
        }
// Creates an equal amount of Campaign Tokens as ether sent. The Campaign Tokens 
// are created in the address the doner specified (or sent from).
        if (!tokenContract.createTokens(_owner, msg.value)) {
            throw;
        }

        return;
    }
// When `seal()` is called no other funds can be sent to this Campaign
    function seal() {
        if (now < endFundingTime) throw;
        tokenContract.seal();
    }

}
