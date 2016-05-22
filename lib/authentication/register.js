'use strict';

const getRegister = require('./handlers/get_register');
const postRegister = require('./handlers/post_register');

exports.register = (server, options, callback) => {

  server.route([{
		method: 'GET',
		path: '/register',
		config: {
      auth: false,
			description: 'return the register page',
			handler: getRegister
		}
	},{
    method: 'POST',
		path: '/register',
		config: {
      auth: false,
			description: 'return the register page',
			handler: postRegister
		}
  }]);

	return callback();
};

exports.register.attributes = {
	name: 'Register'
};
