/*jslint node: true */
/*global describe, it, before, beforeEach, after, afterEach */
"use strict";



var charityDAOHelper = require('../js/charitydao_helper.js');
var ethConnector = require('ethconnector');
var BigNumber = require('bignumber.js');


var assert = require("assert"); // node.js core module
var async = require('async');
var _ = require('lodash');

var verbose = true;




describe('Normal Chaity DAO procedure', function(){
    var vault;
    var tokenCreator;
    var charityToken;


    before(function(done) {
//        ethConnector.init('testrpc', done);
        ethConnector.init('rpc', done);
    });
    it('should deploy all the contracts ', function(done){
        this.timeout(200000000);
        var now = Math.floor(new Date().getTime() /1000);

        charityDAOHelper.deploy({
            owners: [
                ethConnector.accounts[0],
                ethConnector.accounts[1],
                ethConnector.accounts[2],
                ethConnector.accounts[3],
                ethConnector.accounts[4],
                ethConnector.accounts[5],
                ethConnector.accounts[6]
            ],
            required: 3,
            startFundngTime: now + 10*60,
            endFundingTime: now + 20*60,
            maximumFunding: ethConnector.web3.toWei(1000000)
        }, function(err, _vault, _tokenCreator, _charityToken) {
            assert.ifError(err);
            assert.ok(_vault.address);
            assert.ok(_tokenCreator.address);
            assert.ok(_charityToken.address);
            vault = _vault;
            tokenCreator = _tokenCreator;
            charityToken = _charityToken;
            done();
        });
    });
});
