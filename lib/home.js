'use strict';

exports.register = (server, options, callback) => {

  server.route({
		method: 'GET',
		path: '/',
		config: {
			description: 'return the home page',
			handler: (request, reply) => {

				return reply.file('./public/home.html');
			}
		}
	});

	return callback();
};

exports.register.attributes = {
	name: 'Home'
};
