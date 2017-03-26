'use strict';

const controller = require('../controllers/userController.js');

module.exports = [
    {
        method: 'POST',
        path: '/tests',
        handler: controller.create
    },
    {
        method: 'GET',
        path: '/tests',
        handler: (request, reply) => {
            return reply('eita');
        }
    }
];