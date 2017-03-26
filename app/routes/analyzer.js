'use strict';

const controller = require('../controllers/analyzerController.js');

module.exports = [
    {
        method: 'POST',
        path: '/tests',
        handler: controller.test
    }
];