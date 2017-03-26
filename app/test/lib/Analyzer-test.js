'use strict';

const sinon = require('sinon');
const chai = require('chai');
chai.should();

const fs = require('fs');
const nodemailer = require('nodemailer');

const Analyzer = require('../../lib/Analyzer.js');

const user = {
    userName: 'Airton Gessner',
    userEmail: 'ajgessner@hotmail.com',
};

const frontEndResult = {
    css: 8,
    html: 7,
    js: 10,
    django: 5,
    python: 4,
    android:2,
    ios: 5
};
Object.assign(frontEndResult, user);

const backEndResult = {
    css: 5,
    html: 4,
    js: 2,
    django: 8,
    python: 9,
    android:2,
    ios: 5
};
Object.assign(backEndResult, user);

const mobileResult = {
    css: 5,
    html: 4,
    js: 2,
    django: 5,
    python: 2,
    android:7,
    ios: 10
};
Object.assign(frontEndResult, user);

const completeResult = {
    css: 8,
    html:7,
    js: 8,
    django: 9,
    python: 10,
    android:10,
    ios: 10
};
Object.assign(completeResult, user);

describe('Analyzer Test', () => {

    describe('#isFrontEnd()', function() {
        it('should return true when the html, css, and js are above 7', () => {
            const analyzer = new Analyzer(frontEndResult);
            chai.assert.isTrue(analyzer.isFrontEnd());
        });
        it('should not return true when the html or css or js are lower than 7', () => {
            const analyzer = new Analyzer(mobileResult);
            chai.assert.isFalse(analyzer.isFrontEnd());
        });
    });

    describe('#isMobile()', function() {
        it('should return true when the ios and adroid are above 7', () => {
            const analyzer = new Analyzer(mobileResult);
            chai.assert.isTrue(analyzer.isMobile());
        });
        it('should not return true when the ios or adroid are lower than 7', () => {
            const analyzer = new Analyzer(backEndResult);
            chai.assert.isFalse(analyzer.isMobile());
        });
    });

    describe('#isBackEnd()', function() {
        it('should return true when the python and django are above 7', () => {
            const analyzer = new Analyzer(backEndResult);
            chai.assert.isTrue(analyzer.isBackEnd());
        });
        it('should not return true when the python or django are lower than 7', () => {
            const analyzer = new Analyzer(mobileResult);
            chai.assert.isFalse(analyzer.isBackEnd());
        });
    });

    describe('#test', function() {
        it('should return user data', (done) => {
            const analyzer = new Analyzer(completeResult);
            const readFileStub = sinon.sandbox.create().stub(fs, 'readFile').callsFake((filePath, cb) => {
                return cb(null, '');
            });

            const transporterStub = sinon.sandbox.create().stub(nodemailer, 'createTransport').callsFake(() => {
                return {
                    sendMail(options, cb){
                        return cb(null, completeResult);
                    },
                    close() {

                    }
                };
            });

            analyzer.test((err, data) => {
                
                chai.assert.equal(data, completeResult);

                return done();

            });
        });
    });

});