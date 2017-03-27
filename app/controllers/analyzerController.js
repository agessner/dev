'use strict';

const Analyzer = require('../lib/Analyzer.js');

const Boom = require('boom');

class AnalyzerController {

    /**
    * API endpoint for taking test applications
    * @method test
    * @param  {Object} request - https://hapijs.com/api#request-object
    * @param  {Object} reply - https://hapijs.com/api#reply-interface
    * @return {reply}  reply - https://hapijs.com/api#request-object
    */
    test(request, reply) {

        return new Analyzer(request.payload).test((err, data) => {
            
            if (err) {
                return reply(Boom.badImplementation(err));
            }

            return reply(data);
        });
        
    }

}

module.exports = new AnalyzerController();