'use strict';

class UserController {

    create(request, reply) {
        console.log('chegou aqui');
        return reply({data: {"id": "56b7ecbc1ef21172377d6159", "type": "tests", "attributes": { "userName": 'asd'}}}).type('application/json');
    }

}

module.exports = new UserController();