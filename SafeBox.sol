pragma solidity ^0.4.0;

contract SafeBox {
    address public escapeCaller;
    address public escapeDestination;
    address public payer;
    uint public timeLock;
    uint constant absoluteMinTimeout = 1 days;

    event EscapeCalled(uint amount);
    event PaymentPrepared(uint idPayment, address destination, uint value, bytes data);
    event PaymentExecuted(uint idPayment, address destination, uint value, bytes data);
    event PaymentCancelled(uint idPayment);
    event EtherReceived(address from, uint value);

    function SafeBox(address _escapeCaller, address _escapeDestination, address _payer, uint _timeLock) {
        escapeDestination = _escapeDestination;
        escapeCaller = _escapeCaller;
        payer = _payer;
        timeLock = _timeLock;
    }

    modifier onlyScapeCaller { if (msg.sender != escapeCaller) throw; _; }

    /// Last Resort call, to allow for a reaction if something bad happens to
    /// the contract or if some security issue is uncovered.
    function escapeHatch() onlyScapeCaller {
        if (msg.sender != escapeCaller) throw;
        uint total = this.balance;
        if (!escapeDestination.send(total)) {
            throw;
        }
        EscapeCalled(total);
    }


    function changeScapeCaller(address _newEscapeCaller) onlyScapeCaller {
        escapeCaller = _newEscapeCaller;
    }

    modifier onlySelf { if (msg.sender != address(this)) throw; _; }

    function changePayer(address _newPayer) onlySelf {
        payer = _newPayer;
    }

    function changeTimelock(uint _newTimeLock) onlySelf {
        if (_newTimeLock < absoluteMinTimeout) throw;
        timeLock = _newTimeLock;
    }

    modifier onlyPayer { if (msg.sender != payer) throw; _; }

    struct Payment {
        uint minPayTime;
        bool cancelled;
        bool payed;
        address destination;
        uint value;
        bytes data;
    }

    Payment[] payments;

    function preparePayment(address _destination, uint _value, bytes _data, uint _minPayTime) onlyPayer returns(uint) {
        if (_minPayTime < now + timeLock) throw;
        uint idPayment= payments.length;
        payments.length ++;
        Payment payment = payments[idPayment];
        payment.minPayTime = _minPayTime;
        payment.destination = _destination;
        payment.value = _value;
        payment.data = _data;
        PaymentPrepared(idPayment, payment.destination, payment.value, payment.data);
        return idPayment;
    }

    function executePayment(uint _idPayment) onlyPayer {
        if (_idPayment >= payments.length) throw;

        Payment payment = payments[_idPayment];

        if (now < payment.minPayTime) throw;
        if (payment.cancelled) throw;
        if (payment.payed) throw;
        if (this.balance < payment.value) throw;

        payment.payed = true;
        if (! payment.destination.call.value(payment.value)(payment.data)) {
            throw;
        }
        PaymentExecuted(_idPayment, payment.destination, payment.value, payment.data);
     }

    function cancelPayment(uint _idPayment) onlyPayer {
        if (_idPayment >= payments.length) throw;

        Payment payment = payments[_idPayment];

        if (payment.cancelled) throw;
        if (payment.payed) throw;

        payment.cancelled = true;
        PaymentCancelled(_idPayment);
    }

    function receiveEther() payable {
        EtherReceived(msg.sender, msg.value);
    }
}
