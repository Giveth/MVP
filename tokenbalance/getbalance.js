/*jslint node: true */
/*global eth, BigNumber */
"use strict";

var fromBlock = 2591560;
//var fromBlock = 1916999;
var toBlock = eth.blockNumber;
//var toBlock = 1430757;

var D160 = new BigNumber("10000000000000000000000000000000000000000",16);

var tokenAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"seal","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"beneficiary","type":"address"},{"name":"amount","type":"uint256"}],"name":"createTokens","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"sealed","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"tokenController","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[],"type":"constructor"},{"payable":false,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];
var token = eth.contract(tokenAbi).at("0xa0feaf0070267a593d30c1f52874ff68e18d1c77");


var accounts = {};

function getImplicatedAccounts() {
    var i;


    var transferFilter = token.Transfer({}, {fromBlock: fromBlock, toBlock: toBlock});
    var transferEvents = transferFilter.get();

    console.log("transferEvents: " + transferEvents.length);

    for (i=0; i< transferEvents.length; i++) {
        var transfer = transferEvents[i];
        accounts[transfer.args._to] = true;
    }

    accounts = Object.keys(accounts);
}

var balances = [];
function getBalancesAndCompress() {
    var i;
    var acc = new BigNumber(0);
    for (i=0; i<accounts.length; i++) {
        var amount = token.balanceOf(accounts[i], toBlock);
        var addressNum = new BigNumber(accounts[i].substring(2), 16);
        if (amount.greaterThan(0)) {
            balances.push("0x"+addressNum.toString(16));
            balances.push("0x"+amount.toString(16));
            acc = acc.add(amount);
        }
        if (i%100 === 0) console.log("Processed: " + i);
    }
    console.log("Added Balance = "+ acc.toString(10));
    console.log("totalSupply = " + token.totalSupply(toBlock).toString(10));
}

console.log("startScript");
getImplicatedAccounts();
console.log("Total implicated accounts: " + accounts.length);
getBalancesAndCompress(accounts);
console.log("NonZero accounts: " + balances.length);

console.log(JSON.stringify(balances, null, 2));


