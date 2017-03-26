'use strict';

const Mailer = require('./Mailer.js');
const config = require('../config/config.js');

const RESULTS = require('./Results.js');

const async = require('async');

class Analyzer {

    constructor(result) {
        this.result = result;
    }
    
    isFrontEnd() {
        return this.result.html >= 7 && this.result.css >= 7 && this.result.js >= 7;
    }

    isBackEnd() {
        return this.result.python >= 7 && this.result.django >= 7;
    }

    isMobile() {
        return this.result.ios >= 7 && this.result.android >= 7;
    }

    sendEmail(habilities, callback) {
        
        const mailer = new Mailer(config.email.sender, this.result.userEmail, `Obrigado por se candidatar ${this.result.userName}!`);

        mailer.readTemplate('response', (err, html) => {
            
            if (err) {
                return callback(err);
            }
            
            return async.each(habilities, (hability, eachCallback) => {
                return mailer.send(html, hability, eachCallback);
            }, err => {
                return callback(err, this.result);
            });
            
        });
    }

    test(callback) {

        let habilities = [];
        if (this.isFrontEnd()) {
            habilities.push(RESULTS.FRONT_END);
        }
        if (this.isBackEnd()) {
            habilities.push(RESULTS.BACK_END);
        }
        if (this.isMobile()) {
            habilities.push(RESULTS.MOBILE);
        }

        if (!habilities.length) {
            habilities.push(undefined);
        }

        this.sendEmail(habilities, callback);
    }
}

module.exports = Analyzer;