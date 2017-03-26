'use strict';

const Hapi = require('hapi');
const config = require('./config/config.js');

const server = new Hapi.Server();

server.connection(config.server);

/*
** ROUTER 
** Iterates over the files placed on config.routes so Hapi can route them
*/
const normalizedPath = require('path').join(__dirname, config.routes);
require('fs').readdirSync(normalizedPath).forEach(function(file) {
    server.route(require(config.routes + file));
});


server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});

