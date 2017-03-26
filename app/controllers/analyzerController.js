'use strict';

const Analyzer = require('../lib/Analyzer.js');

const Boom = require('boom');

class AnalyzerController {

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