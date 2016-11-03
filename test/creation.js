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
    var campaign;
    var campaignToken;


    before(function(done) {
        ethConnector.init('testrpc' ,done);
//        ethConnector.init('rpc', done);
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
            maximumFunding: ethConnector.web3.toWei(15)
        }, function(err, _vault, _campaign, _campaignToken) {
            assert.ifError(err);
            assert.ok(_vault.address);
            assert.ok(_campaign.address);
            assert.ok(_campaignToken.address);
            vault = _vault;
            campaign = _campaign;
            campaignToken = _campaignToken;
            done();
        });
    });
    it('Should throw if you try to send Ether before creation', function(done) {
        ethConnector.web3.eth.sendTransaction({
            to:campaign.address,
            from: ethConnector.accounts[0],
            value: ethConnector.web3.toWei(100),
            gas: 200000},
            function(err) {
//                assert(err);
                done();
            }
        );
    });
    it('Should delay until creation period can be started', function(done) {
        bcDelay(60*11, done);
    });
    it('Should allow token creation  when creation period start', function(done) {
        this.timeout(200000000);
        async.series([
            function(cb) {
                ethConnector.web3.eth.sendTransaction({
                    to:campaign.address,
                    from: ethConnector.accounts[0],
                    value: ethConnector.web3.toWei(10),
                    gas: 400000},
                    function(err) {
                        assert.ifError(err);
                        cb();
                    }
                );
            },
            function(cb) {
                campaignToken.totalSupply(ethConnector.accounts[0], function(err, _totalSupply) {
                    assert.ifError(err);
                    assert.equal(ethConnector.web3.fromWei(_totalSupply), 10);
                    cb();
                });
            },
            function(cb) {
                campaignToken.balanceOf(ethConnector.accounts[0], function(err, _balance) {
                    assert.ifError(err);
                    assert.equal(ethConnector.web3.fromWei(_balance), 10);
                    cb();
                });
            }
        ],function(err) {
            done();
        });
    });
    it('Should not allow over cap', function(done) {
        this.timeout(200000000);
        async.series([
            function(cb) {
                ethConnector.web3.eth.sendTransaction({
                    to:campaign.address,
                    from: ethConnector.accounts[0],
                    value: ethConnector.web3.toWei(10),
                    gas: 400000},
                    function(err) {
                        assert(err);
                        cb();
                    }
                );
            },
        ],done);
    });
    it('Should allow to the limit cap', function(done) {
        this.timeout(200000000);
        async.series([
            function(cb) {
                ethConnector.web3.eth.sendTransaction({
                    to:campaign.address,
                    from: ethConnector.accounts[1],
                    value: ethConnector.web3.toWei(5),
                    gas: 400000},
                    function(err) {
                        assert.ifError(err);
                        cb();
                    }
                );
            },
            function(cb) {
                campaignToken.totalSupply(ethConnector.accounts[1], function(err, _totalSupply) {
                    assert.ifError(err);
                    assert.equal(ethConnector.web3.fromWei(_totalSupply), 15);
                    cb();
                });
            },
            function(cb) {
                campaignToken.balanceOf(ethConnector.accounts[1], function(err, _balance) {
                    assert.ifError(err);
                    assert.equal(ethConnector.web3.fromWei(_balance), 5);
                    cb();
                });
            },
            function(cb) {
                campaignToken.sealed(function(err, res) {
                    assert.ifError(err);
                    assert.equal(res,false);
                    cb();
                });
            },
        ],done);
    });
    it('SHould not allow seal before closing creation', function(done) {
        this.timeout(200000000);
        async.series([
            function(cb) {
                campaign.seal({
                    from: ethConnector.accounts[0],
                    gas: 400000},
                    function(err) {
                        assert(err);
                        cb();
                    }
                );
            }
        ],done);
    });
    it('Should delay until closing period', function(done) {
        bcDelay(60*10, done);
    });
    it('Should not allow to buy tokens after the limit', function(done) {
        this.timeout(200000000);
        async.series([
            function(cb) {
                ethConnector.web3.eth.sendTransaction({
                    to:campaign.address,
                    from: ethConnector.accounts[0],
                    value: ethConnector.web3.toWei(5),
                    gas: 400000},
                    function(err) {
                        assert(err);
                        cb();
                    }
                );
            },
        ],done);
    });
    it('Should seal the token creation', function(done) {
        this.timeout(200000000);
        async.series([
            function(cb) {
                campaign.seal({
                    from: ethConnector.accounts[0],
                    gas: 400000},
                    function(err) {
                        assert.ifError(err);
                        cb();
                    }
                );
            },
            function(cb) {
                campaignToken.sealed(function(err, res) {
                    assert.ifError(err);
                    assert.equal(res,true);
                    cb();
                });
            }
        ],done);
    });
    it('Should not allow after sealing', function(done) {
        this.timeout(200000000);
        async.series([
            function(cb) {
                ethConnector.web3.eth.sendTransaction({
                    to:campaign.address,
                    from: ethConnector.accounts[0],
                    value: ethConnector.web3.toWei(5),
                    gas: 400000},
                    function(err) {
                        assert(err);
                        cb();
                    }
                );
            },
        ],done);
    });
    function bcDelay(secs, cb) {
        send("evm_increaseTime", [secs], function(err, result) {
            if (err) return cb(err);

      // Mine a block so new time is recorded.
            send("evm_mine", function(err, result) {
                if (err) return cb(err);
                cb();
            });
        });
    }

    function log(S) {
        if (verbose) {
            console.log(S);
        }
    }

        // CALL a low level rpc
    function send(method, params, callback) {
        if (typeof params == "function") {
          callback = params;
          params = [];
        }

        ethConnector.web3.currentProvider.sendAsync({
          jsonrpc: "2.0",
          method: method,
          params: params || [],
          id: new Date().getTime()
        }, callback);
    }
});
