This is the repository for the first prototype of CharityDAO (name to be changed): An Open Source Platform for Effective Charitable Giving.


#Collaboration Strategy

We hope to cooperate, collaborate and integrate with projects that can add value to Charity development whenever possible. WeiFund, Benefactory, Colony, Boardroom, WingsDAO, MakerDAO, and Status.im all are very interesting and have potential to help us improve the Charity Dapp.


# MVP


The MVP is a very limited initial version of the Charity Dapp. The goal is to create the bare minimum that is needed to start funding projects, it will not be until Phase 2 and 3 where utility will come into the system (being able to fund and unfund milestone based smart contracts and allowing the Donors to give the project they are funding feedback). The MVP will be completely centralized, will desperately need a UI and will not have many advantages to currently running projects like GoFundMe, but it will evolve from here, this is still the early stages, the actual development only started in late October!




#Design Specifications for the MVP (Phase 1)


All ether will be held in a newly deployed version of The DAO’s Curator Multisig (Charity Vault) until it is sent to the final recipients (this has been updated for Solidity 0.4.0). 


Projects seeking ether will use our github to run a deploy.js script to initiate their set of standard smart contracts (Campaign) which will direct donor funding through the Vault. When ether comes in, a non-transferable token will track the amount of ether donated by each donor’s address. 


Once a Donor’s ether goes into the Vault, they can request that their funds be sent to the Campaign’s recipient (Donation Contract). For Phase 1, the request will be informal, and the ether will be manually sent to a standard account address or a Multisig Vault. Quickly use their tokens to request to the funding contract (SafeBox.sol) will come later, and this will all be worked out on the UI.


The first Campaign is the Charity Dapp itself: This Campaign is special, it receives a transaction (but adjustable) fee from other Campaigns when the Vault transfers ether to any Campaign, this is to maintain the code development and to discourage attack vectors…. This is still being thought out.


There is a limit of one Vault transfer a week per Campaign


#Design Specifications Post MVP (Subject to Dramatic Changes)


#PHASE 1: The Funding Framework 

A set of approved and tested contracts that DO NOT HOLD FUNDS

Enabling automated time based payment approvals

Enabling Milestone approvals 

The Recipients can claim they completed the milestone, and the Donors can approve it or reject it (if they don’t think the recipient completed the milestone) if there is a dispute, the Vault has the final say.

The voting control over the milestone approval process allows any single token holder to stop the milestone payment approval.

More contracts will be developed over the life of the project.
The initial understanding is to do 1 token contract per Funding Contract. 


#PHASE 1b: The UI Dev work needs to start ASAP
The UX and UI design is not explicitly covered by this document, but this is a major priority, actually more important than the backend development after the MVP, keeping track of all the tokens will be impossible without a solid UI.


#PHASE 2: Communication with the Donors 
A polling system/basic proposal system will be implemented so that the Campaign Owners can communicate with the donors (Phase 2/3).


#Future Additions


People will only control the ETH that they donated in the beginning, but the Campaign Framework could evolve to have more DAO-like options, once the 51% attack can be solved (Phase 4).


Tree structures for tags to categorize Campaigns by type of charity. The tags will be up voted by users (Phase 5).


One DAO like option to be integrated is Liquid Democracy which will be implemented when it reaches an appropriate scale (Phase 6+). This will allow Campaigns to be able to be categorized by topic so that donors can give to one place address and multiple Funding Contracts will be funded at once. This could be done organically with Liquid Democracy. Delegates can state their topic of interest: Animal Health and Safety, Ethereum User Experience, Syrian Refugees, etc. and then fund projects related to that topic as they wish.


Integrating Reputation Systems and other useful Ethereum projects, especially Colony (Phase 6+). 
