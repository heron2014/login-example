'use strict';

exports.register = (server, options, callback) => {

  server.route({
		method: 'GET',
		path: '/',
		config: {
      auth: false,
			description: 'return the home page',
			handler: (request, reply) => {

				return reply.view('home');
			}
		}
	});

	return callback();
};

exports.register.attributes = {
	name: 'Home'
};
