/*jslint node: true */
"use strict";

var Web3 = require('web3');
// create an instance of web3 using the HTTP provider.
// NOTE in mist web3 is already available, so check first if its available before instantiating
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var BigNumber = require('bignumber.js');

var milestoneTrackerHelper = require('milestonetracker');

var eth = web3.eth;

var Adam  = "0xC2d9F9c9dD6f76784a8f56f936953b6661A12da8";   // AP
var Barry = "0x39cfe11c1321c7b506eb1d967af6ea35dd6ef304";   // BW
var Griff = "0x839395e20bbb182fa440d08f850e6c7a8f6f0780";   // Griff
var Gian  = "0x82aEB1D8939f514318449fa8Ec704A94DC16E01D";   // Gian
var Jordi = "0x1dba1131000664b884a1ba238464159892252d3a";   // Jordi
var Grace = "0x64A1C14aCF4D3d1F8F0316f6C924Ec8f35a27BCF";
var MultisigAddy = "0x32bacc8B241FB172fEE18bDa32527126c6f3c5f7";
var ETHprice = 8.20;


var vaultAddr = '0xd5abcc4c80fd01d8822f35f379fbcebf7a8b8679';

var vaultAbi = [{"constant":true,"inputs":[],"name":"maxSecurityGuardDelay","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"escapeHatch","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newTimeLock","type":"uint256"}],"name":"setTimelock","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newEscapeCaller","type":"address"}],"name":"changeEscapeCaller","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numberOfAuthorizedPayments","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_authorize","type":"bool"}],"name":"authorizeSpender","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idPayment","type":"uint256"}],"name":"cancelPayment","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idPayment","type":"uint256"},{"name":"_delay","type":"uint256"}],"name":"delayPayment","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_description","type":"string"},{"name":"_recipient","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_paymentDelay","type":"uint256"}],"name":"authorizePayment","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idPayment","type":"uint256"}],"name":"collectAuthorizedPayment","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"authorizedPayments","outputs":[{"name":"description","type":"string"},{"name":"spender","type":"address"},{"name":"earliestPayTime","type":"uint256"},{"name":"canceled","type":"bool"},{"name":"paid","type":"bool"},{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"},{"name":"securityGuardDelay","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"receiveEther","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"securityGuard","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newSecurityGuard","type":"address"}],"name":"setSecurityGuard","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"escapeDestination","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"timeLock","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"allowedSpenders","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_maxSecurityGuardDelay","type":"uint256"}],"name":"setMaxSecurityGuardDelay","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"absoluteMinTimeLock","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"escapeCaller","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"_escapeCaller","type":"address"},{"name":"_escapeDestination","type":"address"},{"name":"_absoluteMinTimeLock","type":"uint256"},{"name":"_timeLock","type":"uint256"},{"name":"_securityGuard","type":"address"},{"name":"_maxSecurityGuardDelay","type":"uint256"}],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"idPayment","type":"uint256"},{"indexed":false,"name":"recipient","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"PaymentAuthorized","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"idPayment","type":"uint256"},{"indexed":false,"name":"recipient","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"PaymentExecuted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"idPayment","type":"uint256"}],"name":"PaymentCanceled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"EtherReceived","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"spender","type":"address"},{"indexed":false,"name":"authorized","type":"bool"}],"name":"SpenderAuthorization","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"EscapeCalled","type":"event"}];
var vault = web3.eth.contract(vaultAbi).at(vaultAddr);


var milestones = [{
        description:"Milestone Grace: Testing the Giveth concept through a website. Building brand awareness and reaching to the community. For this simple milestone 5 ether",
        url:"http://www.giveth.io",
        minDoneDate:Math.floor(new Date('2016-01-01').getTime() /1000),
        maxDoneDate:Math.floor(new Date('2017-05-01').getTime() /1000),
        responsable: Grace,
        reviewer:MultisigAddy,
        reviewTime:86400*7,
        payDestination:vaultAddr,
        payData:vault.authorizePayment.getData(
            "Milestone Website",
            Grace,
            web3.toWei(5),
            0
        )
    }, {
        description:"Milestone Jordi: Developing the basic smart contract architecture for milestone payments, MiniMe Token, and a working vault and deploying them on the Live Net after Thorough Testing - $4000 USD in ETH at the market rate on 12/14/16  at midnight ($8.25) to Jordi Baylina",
        url:"http://www.giveth.io",
        minDoneDate:Math.floor(new Date('2016-01-01').getTime() /1000),
        maxDoneDate:Math.floor(new Date('2017-05-01').getTime() /1000),
        responsable: Jordi,
        reviewer:MultisigAddy,
        reviewTime:86400*7,
        payDestination:vaultAddr,
        payData:vault.authorizePayment.getData(
            "MilestoneB",
            Jordi,
            web3.toWei(4000/ETHprice),
            0
        )
    }, {
        description:"Milestone Barry: Test the smart contract architecture for milestone payments, MiniMe token, and the vault; review all the code looking for bugs and make the final approval before deploying live on the blockchain: $1000 USD in ETH at the market rate on 12/14/16 at midnight ($8.25) to Barry White",
        url:"http://www.giveth.io",
        minDoneDate:Math.floor(new Date('2016-01-01').getTime() /1000),
        maxDoneDate:Math.floor(new Date('2017-05-01').getTime() /1000),
        responsable: Barry,
        reviewer:MultisigAddy,
        reviewTime:86400*7,
        payDestination:vaultAddr,
            payData:vault.authorizePayment.getData( "MilestoneC",
            Barry,
            web3.toWei(1000/ETHprice),
            0
        )
    }, {
        description:"Milestone Griff: Promote Giveth and coordinate between all the interested parties and teams; lead the project making sure things get done: a weekly salary of $350 for 32 days ($1600) + Code review, adding descriptive comments, admin, editing ReadMes and doing any thing else needed to support the development $35/hour for 28 hours ($980) + 1 blog post ($150) minus $230 because this was too much money for a charity project that I had a lot of fun working on: Total = $2500 in ETH at the market rate on 12/14/16 at midnight ($8.25) to Griff Green",
        url:"http://www.giveth.io",
        minDoneDate:Math.floor(new Date('2016-01-01').getTime() /1000),
        maxDoneDate:Math.floor(new Date('2017-05-01').getTime() /1000),
        responsable: Griff,
        reviewer:MultisigAddy,
        reviewTime:86400*7,
        payDestination:vaultAddr,
        payData:vault.authorizePayment.getData(
            "MilestoneD",
            Griff,
            web3.toWei(2500/ETHprice),
            0
        )
    }];




var milestonesBytes = milestoneTrackerHelper.milestones2bytes(milestones);



