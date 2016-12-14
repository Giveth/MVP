var Web3 = require('web3');
// create an instance of web3 using the HTTP provider.
// NOTE in mist web3 is already available, so check first if its available before instantiating
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var BigNumber = require('bignumber.js');

var milestoneTrackerHelper = require('milestonetracker');

var eth = web3.eth;

var Adam = '0xf5cf678ff2a8500dc44fd94cee70c7b62f628173';
var Grace = '0xCf0ADEEAB9BFCA0ea7663C10a49067FCebAa2368';
var Jordi = '0xc6bd0efffa610c2bea8449c86c975a477eae9699';
var Colm = '0xf5cf678ff2a8500dc44fd94cee70c7b62f628173';
var Griff = '0xCf0ADEEAB9BFCA0ea7663C10a49067FCebAa2368';
var JGCMultisig = '0x2b92b2f2d18f383576946d50ec1c929938dfd003';

var vaultAddr = '0x3df03a94c2f2ab2531694b9891852a1e68c05357';

var vaultAbi = [{"constant":true,"inputs":[],"name":"maxSecurityGuardDelay","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"escapeHatch","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idPayment","type":"uint256"}],"name":"executePayment","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newTimeLock","type":"uint256"}],"name":"setTimelock","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newEscapeCaller","type":"address"}],"name":"changeEscapeCaller","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numberOfAuthorizedPayments","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_authorize","type":"bool"}],"name":"authorizeSpender","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idPayment","type":"uint256"}],"name":"cancelPayment","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idPayment","type":"uint256"},{"name":"_delay","type":"uint256"}],"name":"delayPayment","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_description","type":"string"},{"name":"_recipient","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_paymentDelay","type":"uint256"}],"name":"authorizePayment","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"authorizedPayments","outputs":[{"name":"description","type":"string"},{"name":"spender","type":"address"},{"name":"earliestPayTime","type":"uint256"},{"name":"canceled","type":"bool"},{"name":"paid","type":"bool"},{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"},{"name":"securityGuardDelay","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"receiveEther","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"securityGuard","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newSecurityGuard","type":"address"}],"name":"setSecurityGuard","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"escapeDestination","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"timeLock","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"allowedSpenders","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_maxSecurityGuardDelay","type":"uint256"}],"name":"setMaxSecurityGuardDelay","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"absoluteMinTimeLock","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"escapeCaller","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"_escapeCaller","type":"address"},{"name":"_escapeDestination","type":"address"},{"name":"_absoluteMinTimeLock","type":"uint256"},{"name":"_timeLock","type":"uint256"},{"name":"_securityGuard","type":"address"},{"name":"_maxSecurityGuardDelay","type":"uint256"}],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"idPayment","type":"uint256"},{"indexed":false,"name":"recipient","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"PaymentAuthorized","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"idPayment","type":"uint256"},{"indexed":false,"name":"recipient","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"PaymentExecuted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"idPayment","type":"uint256"}],"name":"PaymentCancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"EtherReceived","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"spender","type":"address"},{"indexed":false,"name":"authorized","type":"bool"}],"name":"SpenderAuthorization","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"EscapeCalled","type":"event"}];
var vault = web3.eth.contract(vaultAbi).at(vaultAddr);


var milestones = [{
        description:"Milestone A: Build a simple web page for the campaign",
        url:"http://www.giveth.io",
        minDoneDate:Math.floor(new Date('2016-01-01').getTime() /1000),
        maxDoneDate:Math.floor(new Date('2017-05-01').getTime() /1000),
        reviewer:Adam,
        reviewTime:86400*7,
        payDestination:vault.address,
        payData:vault.authorizePayment.getData(
            "MilestoneA",
            Grace,
            web3.toWei(15),
            0
        )
    }, {
        description:"Milestone B: Build the basic smart contract architecture for milestone payments, a token, and a working vault",
        url:"http://www.giveth.io",
        minDoneDate:Math.floor(new Date('2016-01-01').getTime() /1000),
        maxDoneDate:Math.floor(new Date('2017-05-01').getTime() /1000),
        reviewer:Adam,
        reviewTime:86400*7,
        payDestination:vault.address,
        payData:vault.authorizePayment.getData(
            "MilestoneB",
            Jordi,
            web3.toWei(400),
            0
        )
    }, {
        description:"Milestone C: Test the basic smart contract architecture for milestone payments, a token, and a working vault",
        url:"http://www.giveth.io",
        minDoneDate:Math.floor(new Date('2016-01-01').getTime() /1000),
        maxDoneDate:Math.floor(new Date('2017-05-01').getTime() /1000),
        reviewer:Adam,
        reviewTime:86400*7,
        payDestination:vault.address,
            payData:vault.authorizePayment.getData( "MilestoneC",
            Colm,
            web3.toWei(100),
            0
        )
    }, {
        description:"Milestone D: promote Giveth and coordinate between all the interested parties and teams",
        url:"http://www.giveth.io",
        minDoneDate:Math.floor(new Date('2016-01-01').getTime() /1000),
        maxDoneDate:Math.floor(new Date('2017-05-01').getTime() /1000),
        reviewer:Adam,
        reviewTime:86400*7,
        payDestination:vault.address,
        payData:vault.authorizePayment.getData(
            "MilestoneD",
            Griff,
            web3.toWei(100),
            0
        )
    }];

var milestonesBytes = milestoneTrackerHelper.milestones2bytes(milestones);



var milestones2 = [{
        description:"Milestone 1: Build a simple governance system for group decisions",
        url:"http://www.giveth.io",
        minDoneDate:Math.floor(new Date('2017-01-01').getTime() /1000),
        maxDoneDate:Math.floor(new Date('2017-05-01').getTime() /1000),
        reviewer:Adam,
        reviewTime:86400*7,
        payDestination:vault.address,
            payData:vault.authorizePayment.getData( "Milestone1",
            Griff,
            web3.toWei(100),
            0
        )
    }, {
        description:"Milestone 2: Build the delegated pledging smart contract",
        url:"http://www.giveth.io",
        minDoneDate:Math.floor(new Date('2016-01-01').getTime() /1000),
        maxDoneDate:Math.floor(new Date('2017-05-01').getTime() /1000),
        reviewer:Adam,
        reviewTime:86400*7,
        payDestination:vault.address,
        payData:vault.authorizePayment.getData(
            "Milestone2",
            Griff,
            web3.toWei(100),
            0
        )
    }, {
        description:"Milestone 3: Build the UI for the Milestone Tracker smart contract",
        url:"http://www.giveth.io",
        minDoneDate:Math.floor(new Date('2016-01-01').getTime() /1000),
        maxDoneDate:Math.floor(new Date('2017-05-01').getTime() /1000),
        reviewer:Adam,
        reviewTime:86400*7,
        payDestination:vault.address,
        payData:vault.authorizePayment.getData(
            "Milestone3",
            Griff,
            web3.toWei(100),
            0
        )
    }, {
        description:"Milestone 4: Build the UI for the vault smart contract",
        url:"http://www.giveth.io",
        minDoneDate:Math.floor(new Date('2016-01-01').getTime() /1000),
        maxDoneDate:Math.floor(new Date('2017-05-01').getTime() /1000),
        reviewer:Adam,
        reviewTime:86400*7,
        payDestination:vault.address,
        payData:vault.authorizePayment.getData(
            "Milestone4",
            Griff,
            web3.toWei(100),
            0
        )
    }, {
        description:"Milestone 5: Build the UI for the Multisig smart contract",
        url:"http://www.giveth.io",
        minDoneDate:Math.floor(new Date('2016-01-01').getTime() /1000),
        maxDoneDate:Math.floor(new Date('2017-05-01').getTime() /1000),
        reviewer:Adam,
        reviewTime:86400*7,
        payDestination:vault.address,
        payData:vault.authorizePayment.getData(
            "Milestone5",
            Griff,
            web3.toWei(100),
            0
        )
    }, {
        description:"Milestone 6: Build the UI for the token and token factory smart contracts",
        url:"http://www.giveth.io",
        minDoneDate:Math.floor(new Date('2016-01-01').getTime() /1000),
        maxDoneDate:Math.floor(new Date('2017-05-01').getTime() /1000),
        reviewer:Adam,
        reviewTime:86400*7,
        payDestination:vault.address,
        payData:vault.authorizePayment.getData(
            "Milestone6",
            Griff,
            web3.toWei(100),
            0
        )
    }, {
        description:"Milestone 7: Build the UI for the delegating pledging smart contracts",
        url:"http://www.giveth.io",
        minDoneDate:Math.floor(new Date('2016-01-01').getTime() /1000),
        maxDoneDate:Math.floor(new Date('2017-05-01').getTime() /1000),
        reviewer:Adam,
        reviewTime:86400*7,
        payDestination:vault.address,
        payData:vault.authorizePayment.getData(
            "Milestone7",
            Griff,
            web3.toWei(100),
            0
        )
    }, { description:"Milestone 8: Build the UI for the simple governance smart contracts",
        url:"http://www.giveth.io",
        minDoneDate:Math.floor(new Date('2016-01-01').getTime() /1000),
        maxDoneDate:Math.floor(new Date('2017-05-01').getTime() /1000),
        reviewer:Adam,
        reviewTime:86400*7,
        payDestination:vault.address,
        payData:vault.authorizePayment.getData(
            "Milestone8",
            Griff,
            web3.toWei(100),
            0
        )
    }];

var milestonesBytes2 = milestoneTrackerHelper.milestones2bytes(milestones2);

