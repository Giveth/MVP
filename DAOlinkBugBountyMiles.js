var Adam  = "0xC2d9F9c9dD6f76784a8f56f936953b6661A12da8";   // AP
var Barry = "0x39cfe11c1321c7b506eb1d967af6ea35dd6ef304";   // BW
var Griff = "0x839395e20bbb182fa440d08f850e6c7a8f6f0780";   // Griff
var Gian  = "0x82aEB1D8939f514318449fa8Ec704A94DC16E01D";   // Gian
var Jordi = "0x1dba1131000664b884a1ba238464159892252d3a";   // Jordi
var Grace = "0x64A1C14aCF4D3d1F8F0316f6C924Ec8f35a27BCF";
// var Vojtech = ""
var MultisigAddy = "0x32bacc8B241FB172fEE18bDa32527126c6f3c5f7";
var ETHprice = 7.70;



var vaultAbi = [{"constant":true,"inputs":[],"name":"maxSecurityGuardDelay","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"escapeHatch","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idPayment","type":"uint256"}],"name":"executePayment","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newTimeLock","type":"uint256"}],"name":"setTimelock","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newEscapeCaller","type":"address"}],"name":"changeEscapeCaller","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numberOfAuthorizedPayments","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_authorize","type":"bool"}],"name":"authorizeSpender","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idPayment","type":"uint256"}],"name":"cancelPayment","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idPayment","type":"uint256"},{"name":"_delay","type":"uint256"}],"name":"delayPayment","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_description","type":"string"},{"name":"_recipient","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_paymentDelay","type":"uint256"}],"name":"authorizePayment","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"authorizedPayments","outputs":[{"name":"description","type":"string"},{"name":"spender","type":"address"},{"name":"earliestPayTime","type":"uint256"},{"name":"canceled","type":"bool"},{"name":"paid","type":"bool"},{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"},{"name":"securityGuardDelay","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"receiveEther","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"securityGuard","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newSecurityGuard","type":"address"}],"name":"setSecurityGuard","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"escapeDestination","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"timeLock","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"allowedSpenders","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_maxSecurityGuardDelay","type":"uint256"}],"name":"setMaxSecurityGuardDelay","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"absoluteMinTimeLock","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"escapeCaller","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"_escapeCaller","type":"address"},{"name":"_escapeDestination","type":"address"},{"name":"_absoluteMinTimeLock","type":"uint256"},{"name":"_timeLock","type":"uint256"},{"name":"_securityGuard","type":"address"},{"name":"_maxSecurityGuardDelay","type":"uint256"}],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"idPayment","type":"uint256"},{"indexed":false,"name":"recipient","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"PaymentAuthorized","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"idPayment","type":"uint256"},{"indexed":false,"name":"recipient","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"PaymentExecuted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"idPayment","type":"uint256"}],"name":"PaymentCancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"EtherReceived","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"spender","type":"address"},{"indexed":false,"name":"authorized","type":"bool"}],"name":"SpenderAuthorization","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"EscapeCalled","type":"event"}];
var vault = web3.eth.contract(vaultAbi).at(vaultAddr);




var milestonesBytes = milestoneTrackerHelper.milestones2bytes( {
        description:"The Vault's Hack our Honeypot Bug Bounty Program: To incentivize hackers to attack our vault, we will crowd source the funds that will be stored in the vault and pay interest to the participants willing to put their ETH at risk. Anyone that wants to participate can deposit their ETH into our vault and once 5000 ETH has been stored in the vault for 30 days, the 5000 ETH along with an extra 200 ETH worth of interest (this is an APR of about 48%!) will be paid out proportionally to the participants. Also worth noting, the Giveth Core Devs will also try to hack the vault, but if we succeed, we will return the funds to the original owners, but the 200 ETH will not be paid out to anyone.",
        url:"http://www.giveth.io",
        minDoneDate:Math.floor(new Date('2017-01-01').getTime() /1000),
        maxDoneDate:Math.floor(new Date('2017-05-01').getTime() /1000),
        reviewer:Jordi,
        reviewTime:86400*7,
        payDestination:vaultAddr,
        payData:vault.authorizePayment.getData(
            "Hack our Honeypot Bug Bounty",
            MultisigAddy,
            web3.toWei(200),
            0
        )
    }, {
        description: "Giveth's Bug Bounty Program: During the Vault's Hack our Honeypot Bug Bounty program, if other smaller bugs are found and issues are posted on our github the lead to coding changes Griff and Jordi will happily reward the issue creators anywhere between 1 and 30 ETH depending on the severity of the bug (1 ETH for cosmetic fixes, 2-10 ETH for gas optimization and 10-30 ETH for critical bug discovery). All issues created before the end of the vault's 30 day holding period ends will be paid out if they lead to code changes, after that issues that lead to code changes will not be paid out, they will be made out of the goodness of the github user's heart... as is customary in open source projects :-)."
        url:"http://www.giveth.io",
        minDoneDate:Math.floor(new Date('2017-01-01').getTime() /1000),
        maxDoneDate:Math.floor(new Date('2017-05-01').getTime() /1000),
        reviewer:Jordi,
        reviewTime:86400*7,
        payDestination:vaultAddr,
        payData:vault.authorizePayment.getData(
            "Giveth Bug Bounty",
            MultisigAddy,
            web3.toWei(150),
            0
        )
    }, {
        description: "Building and Distributing Giveth's Bug Bounty Program: Designing the code that allows the Vault bug bounty to happen (xxx to Jordi) and promoting and explaining the bug bounty on social media (Griff will do for free) distributing ETH to the people that find issues and integrating the code changes (xxx Griff and Jordi), DAO.Link managing the legal protection for the program (xxx to DAO.link (Grace? :-D)) "
        url:"http://www.giveth.io",
        minDoneDate:Math.floor(new Date('2017-01-01').getTime() /1000),
        maxDoneDate:Math.floor(new Date('2017-05-01').getTime() /1000),
        reviewer:Jordi,
        reviewTime:86400*7,
        payDestination:vaultAddr,
        payData:vault.authorizePayment.getData(
            "The creation of Giveth's Bug Bounty Programs",
            MultisigAddy,
            web3.toWei(xxx),
            0
        )
    });
