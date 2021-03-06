'use strict';

const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
const Handlebars = require('handlebars');
const fs = require('fs');

class Mailer {
    constructor(from, to, subject) {

        //TO-DO Configurar oAuth
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: 'agssender@gmail.com',
                pass: 'MailSender1234'
            }

        });

        this.transporter = transporter;

        this.mailOptions = {
            from, 
            to,
            subject,
            generateTextFromHTML: true
        };

    }
    /**
    * Read an email template
    * @method readTemplate
    * @param  {String}   path      abilities found in the test
    * @param  {Function} callback  callback returning when the method is done
    * @return {Function} callback
    */
    readTemplate(path, callback) {
        return fs.readFile(`${__dirname}/../emailTemplates/${path}.html`, callback);
    }

    /**
    * Send an email
    * @method send
    * @param  {String}   emailTemplate templated loaded from readTemplate
    * @param  {Object}   result        result from the analyses
    * @param  {Function} callback  callback returning when the method is done
    * @return {Function} callback
    */
    send(emailTemplate, result, callback) {

        let template = Handlebars.compile(emailTemplate.toString());

        this.mailOptions.html = template({
            result:result, 
            imageUrl:`${__dirname}/../emailTemplates/images`
        });
        
        this.transporter.sendMail(this.mailOptions, (err, response) => {
            if (err) {
                console.error('Error ', err);
                return callback(err);
            }
            this.transporter.close();
            return callback();
        });

    }

}

module.exports = Mailer;