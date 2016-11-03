/*jslint node: true */
/*global describe, it, before, beforeEach, after, afterEach */
"use strict";

var campaignHelper = require('../js/campaign_helper.js');
var ethConnector = require('ethconnector');
var BigNumber = require('bignumber.js');

var assert = require("assert"); // node.js core module
var async = require('async');
var _ = require('lodash');
var ConfirmationNeeded;
var verbose = true;
var throwError = "Error: VM Exception while executing transaction: invalid JUMP";

function expectDiffToBe(newB, oldB, diffB, msg) {
    assert(
        oldB.add(diffB).minus(newB).abs().lt(1),
        msg + ". Expected " + diffB + " but got " + newB.minus(oldB)
    );
}

function getRandomAcc(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


describe('Normal Campaign creation procedure', function(){
    var vault;
    var campaign;
    var campaignToken;
    before(function(done) {
        ethConnector.init('testrpc', done);
    });
    it('should deploy all the contracts ', function(done){
        this.timeout(200000000);
        var now = Math.floor(new Date().getTime() /1000);
        campaignHelper.deploy({
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
            startFundngTime: now  ,
            endFundingTime: now + 20,
            maximumFunding: 1001
        }, function(err, _vault, _campaign, _campaignToken) {
            assert.ifError(err);
            assert.ok(_vault.address);
            assert.ok(_campaign.address);
            assert.ok(_campaignToken.address);
            vault = _vault;
            campaign = _campaign;
            campaignToken = _campaignToken;
            ConfirmationNeeded = vault.ConfirmationNeeded();

            done();
        });
    });

    it('Create Tokens', function (done) {
        this.timeout(2000);
        var buyer = getRandomAcc(0, 9);
        async.series([
            function(cb) {
                campaignToken.balanceOf(ethConnector.accounts[buyer],{from:ethConnector.accounts[buyer]}, cb);
            }, function(cb) {
                campaign.proxyPayment(ethConnector.accounts[buyer], {from:ethConnector.accounts[buyer], value:1000}, cb);
            }, function(cb) {
                campaignToken.balanceOf(ethConnector.accounts[buyer],{from:ethConnector.accounts[buyer]}, cb);
            }] , function(err, results ) {
                assert.ifError(err);
                var oldBal = new BigNumber(results[0]);
                var newBal = new BigNumber(results[2]);
                expectDiffToBe(newBal, oldBal, 1000, "failed to incrases token balance");
                done();
            });
    });

    it('Fail to exceed 1001 cap', function (done) {
        this.timeout(2000);
        var buyer = getRandomAcc(0, 9);
        async.series([
            function(cb) {
                campaignToken.balanceOf(ethConnector.accounts[buyer],{from:ethConnector.accounts[buyer]}, cb);
            }, function(cb) {
                campaign.proxyPayment(ethConnector.accounts[buyer], {from:ethConnector.accounts[buyer], value:2}, cb);
            }, function(cb) {
                campaignToken.balanceOf(ethConnector.accounts[buyer],{from:ethConnector.accounts[buyer]}, cb);
            }] , function(err, results ) {
                assert.equal(err,throwError, "Should throw we sold all the tokens");
                done();
            });
    });

    it('Timeout function, should fail to allow for after deadline tests', function (done) {
        this.timeout(30000);
        setTimeout(done, 20000);
    });

    it('Fail to mine block due to deadline passed', function (done) {
        this.timeout(2000);
        var buyer = getRandomAcc(0, 9);
        async.series([
            function(cb) {
                campaignToken.balanceOf(ethConnector.accounts[buyer],{from:ethConnector.accounts[buyer]}, cb);
            }, function(cb) {
                campaign.proxyPayment(ethConnector.accounts[buyer], {from:ethConnector.accounts[buyer], value:1}, cb);
            }, function(cb) {
                campaignToken.balanceOf(ethConnector.accounts[buyer],{from:ethConnector.accounts[buyer]}, cb);
            }] , function(err, results ) {
                assert.equal(err,throwError, "Should throw deadline is passed");
                done();
            });
    });

   it('Seal the deal' , function (done) {
        this.timeout(2000);
        async.series([
            function(cb) {
                campaignToken.sealed({from:ethConnector.accounts[0]}, cb);
            }, function(cb) {
                campaign.seal({from:ethConnector.accounts[0]}, cb);
            }, function(cb) {
                campaignToken.sealed({from:ethConnector.accounts[0]}, cb);
            }] , function(err, results) {
                assert.ifError(err);
                assert(!results[0], "charityToken shoudl not be sealed");
                assert(results[2], "charityToken seal failed");
                done();
            });
    });
});
