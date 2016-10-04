This is the repository for the first prototype of CharityDAO: An Open Source Platform for Effective Decentralized Charitable Giving.

#Collaboration Strategy

We hope to cooperate, collaborate and integrate with projects that can add value to CharityDAO development  whenever possible. WeiFund, Benefactory, Colony, Boardroom, WingsDAO, MakerDAO, and Status.im all are very interesting and have potential to help us improve CharityDAO.

# MVP

This is a very limited initial version of the CharityDAO. The goal is to create the bare minimum that is needed to start funding projects. The MVP will be completely centralized and will not have almost any advantages to projects like GoFundMe, but it will evolve from here, this is merely Phase 1. 

#Design Specifications for the MVP (Phase 1)


All ether will be held in a newly deployed version of The DAO’s Curator Multisig (CharityDAO Vault) until it is sent to the final recipients. 

Projects seeking ether will use our github to deploy a standard smart contract (Campaign) to direct donor funding through the Vault. When ether comes in, an array (effectively a non-transferable token) will track the amount of ether donated by each donor’s address.

Once a Donor’s ether goes into the Vault, they then can direct their funds as they wish to the Campaign’s recipient (Funding Contract). For Phase 1 it will likely be a standard account address or a Multisig Vault.

The first Campaign is the CharityDAO Campaign itself: This Campaign is special, it receives a transaction (but adjustable) fee from other Campaigns when the Vault transfers ether to maintain the CharityDAO’s code development and to discourage attack vectors.


There is a limit of one Vault transfer a week per Campaign

#Design Specifications Post MVP (Subject to Dramatic Changes)


Funding Contract framework will be developed to allow ETH to be released periodically automatically and will include an “escape hatch” or better said, an “Unfund me button” that will send the money back to the Vault. This button can be pushed by the Campaign token holders by vote, the CharityDAO Vault, or by the recipient themselves (Phase 2). 


Eventually the Campaign Framework will evolve to be tokenized. These tokens then can be transferred to allow for more complex systems to evolve (Phase 3). 


People will only control the ETH that they donated in Phase 1, eventually the Campaign Framework will evolve to have more DAO-like options (Phase 4).


One such system is Liquid Democracy which will be implemented when it reaches an appropriate scale (Phase 5+). This will allow Campaigns to be able to be categorized by topic so that donors can give to one place address and multiple Funding Contracts will be funded at once. This could be done organically with Liquid Democracy. Delegates can state their topic of interest: Animal Health and Safety, Ethereum User Experience, Syrian Refugees, etc. and then fund projects related to that topic as they wish.


