pragma solidity ^0.4.0;

import "CharityToken.sol";

contract TokenCreator {

    uint public startFundingTime;
    uint public endFundingTime;

    uint public maximumFuning;

    uint public totalCollected;

    CharityToken public tokenContract;
    address public vaultContract;

    function TokenCreator(
        uint _startFundingTime,
        uint _endFundingTime,
        uint _maximumFunding,
        address _vaultContract
    ) {
        if ((_startFundingTime < now) ||
            (_endFundingTime <= _startFundingTime) ||
            (_maximumFunding > 1000000 ether) ||
            (_vaultContract == 0))
            throw;
        startFundingTime = _startFundingTime;
        endFundingTime = _endFundingTime;
        maximumFuning = _maximumFunding;
        tokenContract = new CharityToken ();
        vaultContract = _vaultContract;
    }

    function ()  payable {
        proxyPayment(msg.sender);
    }


    function proxyPayment(address _owner) payable {

        if ((now<startFundingTime) ||
            (now>endFundingTime) ||
            (totalCollected >= maximumFuning) ||
            (msg.value == 0) ||
            (totalCollected + msg.value > maximumFuning))
            throw;

        totalCollected += maximumFuning;

        if (!vaultContract.send(msg.value)) throw;
        if (!tokenContract.createTokens(_owner, msg.value)) throw;
    }

    function seal() {
        if (now < endFundingTime) throw;
        tokenContract.seal();
        suicide(vaultContract);
    }

}
