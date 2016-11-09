/*jslint node: true */
"use strict";

var async = require('async');
var ethConnector = require('ethconnector');
var path = require('path');
var _ = require('lodash');


var vaultAbi;
var vault;
var campaignAbi;
var campaign;
var campaignTokenAbi;
var campaignToken;


var src;


exports.deploy = function(opts, cb) {
    var compilationResult = {};
    return async.series([
        function(cb) {
            ethConnector.loadSol(path.join(__dirname, "../wallet.sol"), function(err, _src) {
                if (err) return cb(err);
                src = _src;
                cb();
            });
        },
        function(cb) {
            ethConnector.applyConstants(src, opts, function(err, _src) {
                if (err) return cb(err);
                src = _src;
                cb();
            });
        },
        function(cb) {
            compilationResult.srcWallet = src;
            ethConnector.compile(src, function(err, result) {
                if (err) return cb(err);
                compilationResult = _.extend(result, compilationResult);
                cb();
            });
        },
        function(cb) {
            vaultAbi = JSON.parse(compilationResult.Wallet.interface);
            ethConnector.deploy(compilationResult.Wallet.interface,
                compilationResult.Wallet.bytecode,
                0,
                0,
                opts.owners,
                opts.required,
                0,
                function(err, _vault) {
                    if (err) return cb(err);
                    vault = _vault;
                    cb();
                });
        },

        function(cb) {
            ethConnector.loadSol(path.join(__dirname, "../Campaign.sol"), function(err, _src) {
                if (err) return cb(err);
                src = _src;
                cb();
            });
        },
        function(cb) {
            ethConnector.applyConstants(src, opts, function(err, _src) {
                if (err) return cb(err);
                src = _src;
                cb();
            });
        },
        function(cb) {
            compilationResult.srcCampaign = src;
            ethConnector.compile(src, function(err, result) {
                if (err) return cb(err);
                compilationResult = _.extend(result, compilationResult);
                cb();
            });
        },
        function(cb) {
            campaignAbi = JSON.parse(compilationResult.Campaign.interface);
            campaignTokenAbi = JSON.parse(compilationResult.CampaignToken.interface);
            ethConnector.deploy(compilationResult.Campaign.interface,
                compilationResult.Campaign.bytecode,
                0,
                0,
                opts.startFundngTime,
                opts.endFundingTime,
                opts.maximumFunding,
                vault.address,
                function(err, _campaign) {
                    if (err) return cb(err);
                    campaign = _campaign;
                    cb();
                });
        },
        function(cb) {
            campaign.tokenContract(function(err, _tokenContractAddr) {
                if (err) return cb(err);
                campaignToken = ethConnector.web3.eth.contract(campaignTokenAbi).at(_tokenContractAddr);
                cb();
            });
        }
    ], function(err) {
        if (err) return cb(err);
        cb(null,vault, campaign, campaignToken, compilationResult);
    });
};
