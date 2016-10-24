/*jslint node: true */
"use strict";

var async = require('async');
var ethConnector = require('ethconnector');
var path = require('path');


var vaultAbi;
var vault;
var tokenCreatorAbi;
var tokenCreator;
var charityTokenAbi;
var charityToken;


var src;


exports.deploy = function(opts, cb) {
    var compilationResult;
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
            ethConnector.compile(src, function(err, result) {
                if (err) return cb(err);
                compilationResult = result;
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
            ethConnector.loadSol(path.join(__dirname, "../TokenCreator.sol"), function(err, _src) {
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
            ethConnector.compile(src, function(err, result) {
                if (err) return cb(err);
                compilationResult = result;
                cb();
            });
        },
        function(cb) {
            tokenCreatorAbi = JSON.parse(compilationResult.TokenCreator.interface);
            charityTokenAbi = JSON.parse(compilationResult.CharityToken.interface);
            ethConnector.deploy(compilationResult.TokenCreator.interface,
                compilationResult.TokenCreator.bytecode,
                0,
                0,
                opts.startFundngTime,
                opts.endFundingTime,
                opts.maximumFunding,
                vault.address,
                function(err, _tokenCreator) {
                    if (err) return cb(err);
                    tokenCreator = _tokenCreator;
                    cb();
                });
        },
        function(cb) {
            tokenCreator.tokenContract(function(err, _tokenContractAddr) {
                if (err) return cb(err);
                charityToken = ethConnector.web3.eth.contract(charityTokenAbi).at(_tokenContractAddr);
                cb();
            });
        }
    ], function(err) {
        if (err) return cb(err);
        cb(null,vault, tokenCreator, charityToken, compilationResult);
    });
};
