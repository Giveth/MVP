pragma solidity ^0.4.0;

contract Owned {
    /// Allows only the owner to call a function
    modifier onlyOwner { if (msg.sender != owner) throw; _; }

    address public owner;

    function Owned() { owner = msg.sender;}



    function changeOwner(address _newOwner) onlyOwner {
        owner = _newOwner;
    }
}

contract SSToken is Owned {

    string public name;                   //fancy name: eg Simon Bucks
    uint8 public decimals;                //How many decimals to show. ie. There could 1000 base units with 3 decimals. Meaning 0.980 SBX = 980 base units. It's like comparing 1 wei to 1 ether.
    string public symbol;                 //An identifier: eg SBX
    string public version = 'H0.1';       //human 0.1 standard. Just an arbitrary versioning scheme.


    SSTokenFactory tokenFactory;
    function SSToken(
        address _tokenFactory,
        address _parentToken,
        uint _parentSnapShot,
        string _tokenName,
        uint8 _decimalUnits,
        string _tokenSymbol,
        bool _isConstant
        ) {
        tokenFactory = SSTokenFactory(_tokenFactory);
        name = _tokenName;                                   // Set the name for display purposes
        decimals = _decimalUnits;                            // Amount of decimals for display purposes
        symbol = _tokenSymbol;                              // Set the symbol for display purposes
        parentToken = SSToken(_parentToken);
        parentSnapShot = _parentSnapShot;
        isConstant = _isConstant;
    }

    function transfer(address _to, uint256 _value) returns (bool success) {

        return doTransfer(msg.sender, _to, _value);
    }

    function transferFrom(address _from, address _to, uint256 _value) returns (bool success) {
        //same as above. Replace this line with the following if you want to protect against wrapping uints.
        //if (balances[_from] >= _value && allowed[_from][msg.sender] >= _value && balances[_to] + _value > balances[_to]) {

        if (isConstant) throw;
        if (allowed[_from][msg.sender] < _value) return false;
        doTransfer(_from, _to, _value);
    }

    function balanceOf(address _owner) constant returns (uint256 balance) {
        return balanceOfAt(_owner, nSnapshots);
    }

    function approve(address _spender, uint256 _value) returns (bool success) {
        if (isConstant) throw;
        allowed[msg.sender][_spender] = _value;
        Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender) constant returns (uint256 remaining) {
      return allowed[_owner][_spender];
    }

    /* Approves and then calls the receiving contract */
    function approveAndCall(address _spender, uint256 _value, bytes _extraData) returns (bool success) {
        if (isConstant) throw;
        allowed[msg.sender][_spender] = _value;
        Approval(msg.sender, _spender, _value);

        //call the receiveApproval function on the contract you want to be notified. This crafts the function signature manually so one doesn't have to include a contract in here just for this.
        //receiveApproval(address _from, uint256 _value, address _tokenContract, bytes _extraData)
        //it is assumed that when does this that the call *should* succeed, otherwise one would use vanilla approve instead.
        if(!_spender.call(bytes4(bytes32(sha3("receiveApproval(address,uint256,address,bytes)"))), msg.sender, _value, this, _extraData)) { throw; }
        return true;
    }

    function totalSupply() returns (uint) {
        return totalSupplyAt[nSnapshots];
    }

    struct  BalanceCheckPoint {
        // snapshot when starts to take effect this assignation
        uint fromSnapshot;
        // balance assigned to token holder from this snapshot
        uint balance;
    }

    SSToken parentToken;
    uint parentSnapShot;
    mapping (address => BalanceCheckPoint[]) balances;
    mapping (address => mapping (address => uint256)) allowed;
    uint public nSnapshots;
    mapping (uint => uint) public totalSupplyAt;
    bool public isConstant;


    function balanceOfAt(address _holder, uint _snapshot) constant returns (uint) {

            uint b;

            BalanceCheckPoint[] snapshots = balances[_holder];

            uint i;

            for (i = snapshots.length; i>0; i-- ) {
                BalanceCheckPoint snapShot = snapshots[i-1];
                if (nSnapshots >= snapShot.fromSnapshot) return snapShot.balance;
            }

            return (address(parentToken) != 0) ? parentToken.balanceOfAt(_holder, parentSnapShot) : 0;
    }

    function doTransfer(address _from, address _to, uint _value) internal returns(bool) {

           if (_value == 0) {
               return true;
           }

          // Remove _from votes
           var previousBalanceFrom = balanceOfAt(_from, nSnapshots);
           if (previousBalanceFrom < _value) {
               return false;
           }

           updateBalance(_from, previousBalanceFrom - _value);

           var previousBalanceTo = balanceOfAt(_to, nSnapshots);
           updateBalance(_to, previousBalanceTo + _value);

           Transfer(_from, _to, _value);

           return true;
    }

    function updateBalance(address _holder, uint _balance) internal  {
           BalanceCheckPoint[] snapshots = balances[_holder];

           if ((snapshots.length == 0) || (snapshots[snapshots.length -1].fromSnapshot < nSnapshots)) {
               BalanceCheckPoint newSnapshot = snapshots[ snapshots.length++ ];
               newSnapshot.fromSnapshot = nSnapshots;
               newSnapshot.balance = _balance;
           } else {
               BalanceCheckPoint oldSnapshot = snapshots[snapshots.length-1];
               oldSnapshot.balance = _balance;
           }
    }

    function createSnapshot() onlyOwner {
        if (isConstant) throw;
        NewSnapshot(nSnapshots ++);
    }

    function createChildToken(uint _snapshot, string _childTokenName, uint8 _childDecimalUnits, string _childTokenSymbol, bool _isConstant) {
        if ((_snapshot == nSnapshots)&&(!isConstant)) createSnapshot();

        SSToken childToken = tokenFactory.createChildToken(this, _snapshot, _childTokenName, _childDecimalUnits, _childTokenSymbol, _isConstant);
        NewChildToken(_snapshot, childToken);
    }

    function createTokens(address _dest, uint _value) onlyOwner {
        if (isConstant) throw;
        totalSupplyAt[nSnapshots] += _value;
        var previousBalanceTo = balanceOfAt(_dest, nSnapshots);
        updateBalance(_dest, previousBalanceTo + _value);
        NewTokens(_dest, _value);
    }

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
    event NewSnapshot(uint _snapshot);
    event NewChildToken(uint _snapshot, address _childToken);
    event NewTokens(address _dest, uint _value);

}

contract SSTokenFactory {
    function createChildToken(
        address _parentToken,
        uint _snapshot,
        string _tokenName,
        uint8 _decimalUnits,
        string _tokenSymbol,
        bool _isConstant
    ) returns (SSToken) {
        SSToken newToken = new SSToken(this, _parentToken, _snapshot, _tokenName, _decimalUnits, _tokenSymbol, _isConstant);
        return newToken;
    }
}



