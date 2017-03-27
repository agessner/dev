'use strict';

var envConfig = null;
try {
	envConfig = require('../../.env.json');
} catch(e) {
}

module.exports = function() {
    var config = {
        server: {
            port: 3000,
            host: 'localhost',
            routes: { cors: true }
        },
        routes: './routes/',
        email: {
            sender: 'ajgessner@hotmail.com'
        }
    };
    if(envConfig) {
        Object.assing(config, envConfig);
    }
    return config;
}();