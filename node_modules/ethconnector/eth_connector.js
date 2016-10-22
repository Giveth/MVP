/*jslint node: true */
"use strict";

var async = require('async');
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var solc = require('solc');
var Web3 = require('web3');
var TestRPC = require("ethereumjs-testrpc");
var ethClient = new EthClient();
var EventEmitter = require('events').EventEmitter;
var util = require('util');

module.exports = ethClient;

function EthClient() {
    this.web3= new Web3();
}

util.inherits(EthClient, EventEmitter);

EthClient.prototype.init = function init(provider, opts, cb) {
    if (typeof opts === "function") {
        cb =opts;
        opts = {};
    }
    var self = this;
    if (provider.toUpperCase() === "TESTRPC") {
        self.web3.setProvider(TestRPC.provider(opts));
    } else {
        self.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    self.web3.eth.getAccounts(function(err, accounts) {
        if (err) return cb(err);
        self.accounts = accounts;
        self.emit('init');
        cb();
    });
};



EthClient.prototype.loadSol = function loadSol(file, imported, cb) {

    if (typeof imported === "function") {
        cb = imported;
        imported = {};
    }

    var src = "";

//    var file = path.resolve(path.join(__dirname, ".."), filename);
    if (imported[file]) {
        return cb(null, src);
    }

    imported[file] = true;
    fs.readFile(file, 'utf8' ,function(err, srcCode) {
        if (err) return cb(err);

        var r = /^import \"(.*)\";/gm;

        var arr = srcCode.match(r);

        srcCode = srcCode.replace(r, '');

        if (!arr) return cb(null, srcCode);

        async.eachSeries(arr, function(l, cb) {
            var r = /import \"(.*)\";/;
            var importfile = r.exec(l)[1];

            importfile = path.join(path.dirname(file), importfile);

            loadSol(importfile, imported, function(err, importSrc) {
                if (err) return cb(err);
                src = src + importSrc;
                cb();
            });
        }, function(err)  {
            if (err) return cb(err);
            src = src + "\n//File: " + file + "\n";
            src = src + srcCode;
            cb(null,src);
        });
    });
};

EthClient.prototype.applyConstants = function applyConstants(src, opts, cb) {

    var srcOut = src;

    _.each(opts, function(value, param) {
        var rule = new RegExp('constant ' + param + ' = (.*);','gm');
        var replacedText = 'constant ' + param + ' = ' + value + ';';

        srcOut = srcOut.replace(rule,replacedText);

    });

    async.setImmediate(function() {
        cb(null, srcOut);
    });
};

function fixErrorLines(src, errors) {
    var lines = src.split("\n");
    _.each(errors, function(error, idx) {
        var rErrPos = new RegExp('\:([0-9]+)\:([0-9]+)\:');
        var errPos = rErrPos.exec(error);
        var lineNum = parseInt(errPos[1])-1;
        var found = false;
        var offset = 1;
        var rFile = new RegExp("//File: (.*)","");
        while ((!found)&&(offset <= lineNum)) {
            var fileInfo = rFile.exec(lines[lineNum - offset]);
            if (fileInfo) {
                errors[idx] = error.replace(rErrPos, fileInfo[1] + " :" + offset + ":" + errPos[2] + ":" );
                found = true;
            } else {
                offset += 1;
            }
        }
    });
}

EthClient.prototype.compile = function compile(src, cb) {
    var result = solc.compile(src, 1);
    async.setImmediate(function() {
        if (!result.contracts) {
            fixErrorLines(src, result.errors);
            return cb(result.errors);
        }
        cb(null, result.contracts);
    });
};

// Parameters:
// interface, code, accountIdx, value, constructor arguments . . ., cb
EthClient.prototype.deploy = function deploy(abi, code, accountIdx, value) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 4, arguments.length-1);
    var cb = arguments[arguments.length-1];

    args.push({
        from: self.accounts[accountIdx],
        value: value,
        data: code,
//        gas: 4712000
        gas: 5500000
    });

    args.push(function (err, contract) {
        if (err) return cb(err);
        if (typeof contract.address != 'undefined') {
            cb(null, contract);
        }
    });

    var contract = self.web3.eth.contract(JSON.parse(abi));
    contract.new.apply(contract, args);
};
