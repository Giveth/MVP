var Adam  = "0xC2d9F9c9dD6f76784a8f56f936953b6661A12da8";   // AP
var Barry = "0x39cfe11c1321c7b506eb1d967af6ea35dd6ef304";   // BW
var Griff = "0x839395e20bbb182fa440d08f850e6c7a8f6f0780";   // Griff
var Gian  = "0x82aEB1D8939f514318449fa8Ec704A94DC16E01D";   // Gian
var Jordi = "0x1dba1131000664b884a1ba238464159892252d3a";   // Jordi
var Grace = "0x64A1C14aCF4D3d1F8F0316f6C924Ec8f35a27BCF";   // Grace
var Vojtech = "0xf9a2595bFAe0694f114042679b3A9a536Bb7A5D8"; // Vojtech
var MultisigAddy = "0x32bacc8B241FB172fEE18bDa32527126c6f3c5f7";
var ETHprice = 10;



var vaultAbi = [{"constant":true,"inputs":[],"name":"maxSecurityGuardDelay","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"escapeHatch","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idPayment","type":"uint256"}],"name":"executePayment","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newTimeLock","type":"uint256"}],"name":"setTimelock","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newEscapeCaller","type":"address"}],"name":"changeEscapeCaller","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numberOfAuthorizedPayments","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_authorize","type":"bool"}],"name":"authorizeSpender","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idPayment","type":"uint256"}],"name":"cancelPayment","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_idPayment","type":"uint256"},{"name":"_delay","type":"uint256"}],"name":"delayPayment","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_description","type":"string"},{"name":"_recipient","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_paymentDelay","type":"uint256"}],"name":"authorizePayment","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"authorizedPayments","outputs":[{"name":"description","type":"string"},{"name":"spender","type":"address"},{"name":"earliestPayTime","type":"uint256"},{"name":"canceled","type":"bool"},{"name":"paid","type":"bool"},{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"},{"name":"securityGuardDelay","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"receiveEther","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"securityGuard","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newSecurityGuard","type":"address"}],"name":"setSecurityGuard","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"escapeDestination","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"timeLock","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"allowedSpenders","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_maxSecurityGuardDelay","type":"uint256"}],"name":"setMaxSecurityGuardDelay","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"absoluteMinTimeLock","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"escapeCaller","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"_escapeCaller","type":"address"},{"name":"_escapeDestination","type":"address"},{"name":"_absoluteMinTimeLock","type":"uint256"},{"name":"_timeLock","type":"uint256"},{"name":"_securityGuard","type":"address"},{"name":"_maxSecurityGuardDelay","type":"uint256"}],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"idPayment","type":"uint256"},{"indexed":false,"name":"recipient","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"PaymentAuthorized","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"idPayment","type":"uint256"},{"indexed":false,"name":"recipient","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"PaymentExecuted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"idPayment","type":"uint256"}],"name":"PaymentCancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"EtherReceived","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"spender","type":"address"},{"indexed":false,"name":"authorized","type":"bool"}],"name":"SpenderAuthorization","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"EscapeCalled","type":"event"}];
var vault = web3.eth.contract(vaultAbi).at(vaultAddr);




var milestonesBytes = milestoneTrackerHelper.milestones2bytes( {
        description:"MVP UI for Milestone Tracker: Developing the basic UI architecture for the Milestone Tracker Contract and all the rest of Giveth's UI's: enabling anyone using MetaMask, Mist, or Parity to generate new milestones and effectively implement all features in the Milestone Tracker Contract, this basic UI will be focused on functionality, enabling integration and easy customization for this UI to be added to other websites of various designs. To be considered finished, a workflow for the API requirements for Status.im need to be written out and communicated to the Status guys (Jordi's extra $400) and the web interface needs to be complete and working so that a milestone can be added to a campaign completely from the web3 interface: $5400 USD in ETH at the market rate to be split between Jordi ($2900) and Vojtech ($2500)",
        url:"http://www.giveth.io",
        minDoneDate:Math.floor(new Date('2017-01-01').getTime() /1000),
        maxDoneDate:Math.floor(new Date('2017-04-01').getTime() /1000),
        milestoneLeadLink:Jordi,
        reviewer:Griff,
        reviewTime:86400*7,
        payDestination:vaultAddr,
        payData:vault.authorizePayment.getData(
            "Milestone Tracker UI MVP",
            Jordi,
            web3.toWei(5400/ETHprice),
            0
        )
    }, {
        description:"MLP UI for a full Campaign: Making a few more Milestone Tracker UI iterations and building the Minimum Loveable version for a full Giveth Campaign from the donor’s perspective: enabling anyone using MetaMask, Mist, or Parity to generate new milestones, and effectively implement all needed actions donate to and observe a working Campaign utilizing the 3 basic contracts we have. This foundational set of UI’s will be focused on functionality and making it easy for other campaigns to take our code and integrate to their own website. To be considered finished, a workflow for the API requirements for Status.im needs to be written out and communicated to the Status guys (Jordi's extra $100) and the web interface needs to be complete and working for every actian a donor can take and it has to be minimally loveable. If the milestone is finished by the 15th of Feb: $5100 USD in ETH at the market rate to be split between Jordi ($2600) and Vojtech ($2500). If done by March 1st:  $3850 USD in ETH at the market rate to be split between Jordi ($1975) and Vojtech ($1875). If done after that $3100 USD in ETH at the market rate to be split between Jordi ($1600) and Vojtech ($1500).",
        url:"http://www.giveth.io",
        minDoneDate:Math.floor(new Date('2017-01-01').getTime() /1000),
        maxDoneDate:Math.floor(new Date('2017-04-01').getTime() /1000),
        milestoneLeadLink:Jordi,
        reviewer:Griff,
        reviewTime:86400*7,
        payDestination:vaultAddr,
        payData:vault.authorizePayment.getData(
            "Campaign UI MLP",
            Jordi,
            web3.toWei(5400/ETHprice),
            0
        )
    },{
        description: "Reviewing contracts and potentially adding invariance to the vault: Reviewing the any crazy ideas Jordi comes up with :-) looking for bugs and helping to make the final approval before deploying contracts live on the blockchain: $300 USD in ETH at the market rate to Barry White",
        url:"http://www.giveth.io",
        minDoneDate:Math.floor(new Date('2017-01-01').getTime() /1000),
        maxDoneDate:Math.floor(new Date('2017-05-01').getTime() /1000),
        milestoneLeadLink:Barry,
        reviewer:Jordi,
        reviewTime:86400*7,
        payDestination:vaultAddr,
            payData:vault.authorizePayment.getData(
            "Barry's Incredible Auditing",
            Barry,
            web3.toWei(300/ETHprice),
            0
        )
    }, {
        description:"The Airbnb in London for Grace, Griff, Jordi, and Vojtech. We are launching Giveth officially to the public at the Blockchain-Expo and we are staying close to Colony's offices in Shoreditch so after the Expo we can look to collaborate with Colony as much as possible as both projects evolve. The Airbnb is to be reimbursed in full: $1164 USD in ETH at the market rate to Griff Green, the URL shows the receipt posted on IPFS",
        url:"https://ipfs.pics/QmX6m4K59WHJRcPjVSUE2p56hCqADpQoevcEvbDxZwStsQ",
        minDoneDate:Math.floor(new Date('2017-01-01').getTime() /1000),
        maxDoneDate:Math.floor(new Date('2017-05-01').getTime() /1000),
        milestoneLeadLink:Griff,
        reviewer:Griff,
        reviewTime:86400*7,
        payDestination:vaultAddr,
        payData:vault.authorizePayment.getData(
            "London Airbnb",
            Griff,
            web3.toWei(1164/ETHprice),
            0
        )
    },  {
        description:"Build a new Giveth website. Vojtech will create a very clean design similar to https://slock.it but respecting our own brand, theme and colors. His work includes analysis of the website requirements, looking at projects from similar areas, UML modeling and prototyping (use case, sequence diagrams), designing distinct pages and infographics. He will link to the Medium blog as much as their API allows, add a twitter feed, add a facebook feed, list other campaigns, and provide pages for the future Giveth UIs and other projects. His total work is estimated to take 150-250h at a $20/hour rate in ETH at the market rate at the time of completion. Grace will support Vojtech on the final website structure, look and feel, content display & colors in accordance the brand identity and add any extra the finishing touches before it is launched live for $200 and $20/hour for UI Validation/Testing. This leads to an estimated $3500-6500 USD in ETH at the market rate to be split between Vojtech and Grace for developing the website, and it includes reasonable maintenance requirements after the website launch and milestone payment."
        url:"http://www.giveth.io",
        minDoneDate:Math.floor(new Date('2017-01-01').getTime() /1000),
        maxDoneDate:Math.floor(new Date('2017-05-01').getTime() /1000),
        milestoneLeadLink:Vojtech,
        reviewer:Grace,
        reviewTime:86400*7,
        payDestination:vaultAddr,
        payData:vault.authorizePayment.getData(
            "Building the Giveth Website v2.0",
            Vojtech,
            web3.toWei(xxx/ETHprice),
            0
        )
    }, {
        description:"Brand Management, website design and filling in the gaps: Creating the website including hosting/email setup, First draft website creating the Giveth logo and colors, reviewing blog posts and help to keep Griff in this reality from Dec 1st to Jan 26th: $1000 worth of ETH to be paid at the market rate asap to Grace Torrellas",
        url:"http://www.giveth.io",
        minDoneDate:Math.floor(new Date('2017-01-01').getTime() /1000),
        maxDoneDate:Math.floor(new Date('2017-05-01').getTime() /1000),
        milestoneLeadLink:Grace,
        reviewer:Griff,
        reviewTime:86400*7,
        payDestination:vaultAddr,
        payData:vault.authorizePayment.getData(
            "Grace’s Branding and Startup Work",
            Grace,
            web3.toWei(1000/ETHprice),
            0
        )
    }, {
        description:"Grace’s Expenses: Giveth T-shirts for the core team for the London launch at the blockchain-expo  ($106 USD). Reimbursement for the ticket to attend to the North American Bitcoin Conference $300 (includes a $50 discount coupon). Total = $406 USD in ETH at the market rate to be given asap to Grace Torrellas",
        url:"https://ipfs.pics/QmW3FgNGeD46kHEryFUw1ftEUqRw254WkKxYeKaouz7DJA",
        minDoneDate:Math.floor(new Date('2017-01-01').getTime() /1000),
        maxDoneDate:Math.floor(new Date('2017-05-01').getTime() /1000),
        milestoneLeadLink:Grace,
        reviewer:Griff,
        reviewTime:86400*7,
        payDestination:vaultAddr,
        payData:vault.authorizePayment.getData(
            "T-shirts and Tickets bought by Grace",
            Grace,
            web3.toWei(406/ETHprice),
            0
        )
    }, {
        description:"Grace’s Q1-2017 Milestones: Brand management and filling in the gaps, Promote Giveth, reach out to potential NGO’s/Charities to introduce the Giveth platform, ongoing updates to the website Search for potential campaigns to use with our minimum loveable product. Deliver presentation on Giveth at the GAVI Alliance --> $200/week. Get DAO.link up and running to manage Giveth’s structuring for $100. Create posts for our website $100/per post. Estimated Total ~$1200 USD per month in ETH at the market rate to be given to Grace Torrellas",
        url:"http://www.giveth.io",
        minDoneDate:Math.floor(new Date('2017-01-01').getTime() /1000),
        maxDoneDate:Math.floor(new Date('2017-05-01').getTime() /1000),
        milestoneLeadLink:Grace,
        reviewer:Griff,
        reviewTime:86400*7,
        payDestination:vaultAddr,
        payData:vault.authorizePayment.getData(
            "Grace’s Q1-2017 Milestones",
            Grace,
            web3.toWei(xx/ETHprice),
            0
        )
    }, {
        description:"Griff’s Milestone: Promote Giveth and coordinate between all the interested parties and teams; lead the project making sure things get done: a weekly salary of $350 for 39 days (Dec15-Jan26) ($1950) + Code review, adding descriptive comments, admin, editing ReadMes and doing anything else needed to support the development $35/hour for 23 hours ($805) + 2 blog posts ($300) plus spending 16 hours at the Blockchain-expo $25/hour ($400) minus $122 because this was too much money for a charity project that I had a lot of fun working on: Total = $3333 in ETH at the market rate on 1/26/17 at midnight ($ETH Price) to Griff Green",
        url:"http://www.giveth.io",
        minDoneDate:Math.floor(new Date('2017-01-01').getTime() /1000),
        maxDoneDate:Math.floor(new Date('2017-05-01').getTime() /1000),
        milestoneLeadLink:Griff,
        reviewer:Jordi,
        reviewTime:86400*7,
        payDestination:vaultAddr,
        payData:vault.authorizePayment.getData(
            "Griff Making Giveth Happen",
            Griff,
            web3.toWei(2500/ETHprice),
            0
        )
    }, {
        description:"Basic Governance Smart Contract: Designing, developing and deploying a basic DAO-like Smart Contract to allow the token holders to use their tokens to make group decisions (e.g. to determine if the completion of a milestone is valid (acting as a reviewer) and to accept proposed milestones (acting as a Donor). This might take a few iterations but the milestone will be considered complete when it is available for organizations to use with the Giveth Campaign (after thorough testing): 2500 USD in ETH at the market rate to Jordi and Friends",
        url:"http://www.giveth.io",
        minDoneDate:Math.floor(new Date('2017-01-01').getTime() /1000),
        maxDoneDate:Math.floor(new Date('2017-04-01').getTime() /1000),
        milestoneLeadLink:Jordi,
        reviewer:Griff,
        reviewTime:86400*7,
        payDestination:vaultAddr,
        payData:vault.authorizePayment.getData(
            "Basic DAO",
            Jordi,
            web3.toWei(2500/ETHprice),
            0
        )
    }, {
        description:"Delegated Pledging Smart Contract Research: We are still in the research phase, this may not be possible due to gas constraints and game theoretical attacks. Designing a basic liquid democracy-like Smart Contract (to allow Donors to send their tokens to delegates so that decisions about which project to invest in can be done by the Delegate, not the donor) is much more complicated than expected. This milestone will be completed when a design is understood and work can begin on developing a smart contract that can be deployed on the Ethereum blockchain: 2000 USD in ETH at the market rate to Jordi and Friends",
        url:"http://www.giveth.io",
        minDoneDate:Math.floor(new Date('2017-01-01').getTime() /1000),
        maxDoneDate:Math.floor(new Date('2017-07-01').getTime() /1000),
        milestoneLeadLink:Jordi,
        reviewer:Griff,
        reviewTime:86400*7,
        payDestination:vaultAddr,
        payData:vault.authorizePayment.getData(
            "Delegated Pledging",
            Jordi,
            web3.toWei(2000/ETHprice),
            0
        )
    });
