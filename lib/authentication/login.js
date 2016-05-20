'use strict';

const getLogin = require('./handlers/get_login');

exports.register = (server, options, callback) => {

  server.route([{
		method: 'GET',
		path: '/login',
		config: {
			description: 'return the login page',
			handler: getLogin
		}
	},{
    method: 'POST',
    path: '/login',
    config: {
      auth: false,
      description: 'submit the login form',
      handler: postLogin
    }
  }]);

	return callback();
};

exports.register.attributes = {
	name: 'Login'
};
