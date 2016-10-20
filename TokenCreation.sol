pragma solidity ^0.4.0;

contract SSToken {
    function createTokens(address _dest, uint _value) {}
    function changeOwner(address _newOwner) {}
    function owner() constant returns (address) {}
}

contract TokenCreation {

    address public escapeCaller;
    address public escapeDestination;

    uint public startFundingTime;
    uint public endFundingTime;

    uint public minimumFunding;
    uint public maximumFuning;

    uint public totalCollected;

    SSToken public tokenContract;
    address public fundingContract;


    mapping (address => uint256) public weiGiven;
    bool public funded;


    function TokenCreation(
        address _escapeCaller,
        address _escapeDestination,
        uint _startFundingTime,
        uint _endFundingTime,
        uint _minimumFunding,
        uint _maximumFunding,
        address _tokenContract,
        address _fundingContract
    ) {
        if ((_startFundingTime < now) ||
            (_endFundingTime <= _startFundingTime) ||
            (_maximumFunding < _minimumFunding) ||
            (_maximumFunding > 1000000 ether) ||
            (_tokenContract == 0) ||
            (fundingContract == 0))
            throw;
        escapeCaller = _escapeCaller;
        escapeDestination = _escapeDestination;
        startFundingTime = _startFundingTime;
        endFundingTime = _endFundingTime;
        minimumFunding = _minimumFunding;
        maximumFuning = _maximumFunding;
        tokenContract = SSToken(_tokenContract);
        fundingContract = _fundingContract;

        if (tokenContract.owner() != address(this)) throw;
    }


    /// Last Resort call, to allow for a reaction if something bad happens to
    /// the contract or if some security issue is uncovered.
    function escapeHatch() {
        if (msg.sender != escapeCaller) throw;
        uint total = this.balance;
        if (!escapeDestination.send(total)) {
            throw;
        }
        EscapeCalled(total);
    }


    function ()  payable {
        proxyPayment(msg.sender);
    }


    function proxyPayment(address _owner) payable {

        uint toFund;
        uint toReturn;

        if ((now<startFundingTime) ||
            (now>endFundingTime) ||
            (totalCollected >= maximumFuning) ||
            (msg.value == 0))
            throw;

        if (totalCollected + msg.value > maximumFuning) {
            toFund = maximumFuning -totalCollected;
            toReturn = totalCollected + msg.value - maximumFuning;
        } else {
            toFund = msg.value;
            toReturn = 0;
        }

        weiGiven[_owner] += toFund;

        totalCollected += toFund;

        // If funded, send all the collected ether to the fund
        if (!funded) {
            if (totalCollected >= minimumFunding) {
                funded = true;
                if (!fundingContract.send(totalCollected)) throw;
            }
        } else {
            if (!fundingContract.send(toFund)) throw;
        }

        tokenContract.createTokens(_owner, toFund);

        if (toReturn > 0) {
            if (!msg.sender.send(toReturn)) throw;
        }
    }


    function refund() {
        if (now < endFundingTime) throw;
        if (funded) throw;
        if (weiGiven[msg.sender] == 0) throw;
        weiGiven[msg.sender] = 0;
        if (! msg.sender.send(weiGiven[msg.sender])) throw;
    }

    function transferOwnership() {
        if (now < endFundingTime) throw;
        tokenContract.changeOwner(fundingContract);
    }


    event EscapeCalled(uint amount);
}
