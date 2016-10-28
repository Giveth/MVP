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
        if ((_endFundingTime < now) ||
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
        doPayment(msg.sender);
    }

    function proxyPayment(address _owner) payable {
        doPayment(_owner);
    }

    function doPayment(address _owner) internal {

        if ((now<startFundingTime) ||
            (now>endFundingTime) ||
            (msg.value == 0) ||
            (totalCollected + msg.value > maximumFuning))
        {
            throw;
        }

        totalCollected += msg.value;

        if (!vaultContract.send(msg.value)) {
            throw;
        }

        if (!tokenContract.createTokens(_owner, msg.value)) {
            throw;
        }

        return;
    }

    function seal() {
        if (now < endFundingTime) throw;
        tokenContract.seal();
    }

}
