'use strict';

const Mailer = require('./Mailer.js');
const config = require('../config/config.js');

const RESULTS = require('./Results.js');

const async = require('async');

class Analyzer {

    constructor(result) {
        this.result = result;
    }
    /**
    * Verify if the result is for a Front End developer
    * @method isFrontEnd
    * @return {boolean}
    */
    isFrontEnd() {
        return this.result.html >= 7 && this.result.css >= 7 && this.result.js >= 7;
    }
    /**
    * Verify if the result is for a Back End developer
    * @method isFrontEnd
    * @return {boolean}
    */
    isBackEnd() {
        return this.result.python >= 7 && this.result.django >= 7;
    }
    /**
    * Verify if the result is for a Mobile developer
    * @method isFrontEnd
    * @return {boolean}
    */
    isMobile() {
        return this.result.ios >= 7 || this.result.android >= 7;
    }
    /**
    * Send Email to each hability found in the test
    * @method sendEmail
    * @param  {Array}    abilities abilities found in the test
    * @param  {Function} callback  callback returning when the method is done
    * @return {Function} callback
    */
    sendEmail(abilities, callback) {
        
        const mailer = new Mailer(config.email.sender, this.result.userEmail, `Obrigado por se candidatar ${this.result.userName}!`);

        mailer.readTemplate('response', (err, html) => {
            
            if (err) {
                return callback(err);
            }
            
            return async.each(abilities, (hability, eachCallback) => {
                return mailer.send(html, hability, eachCallback);
            }, err => {
                return callback(err, this.result);
            });
            
        });
    }
     /**
    * Analyze the test sent by the taker
    * @method test
    * @param  {Function} callback  callback returning when the method is done
    * @return {Function} callback
    */
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