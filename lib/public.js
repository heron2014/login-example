'use strict';

exports.register = (server, options, callback) => {

	server.route({
		method: 'GET',
		path: '/public/{params*}',
		config: {
			description: 'load assets',
			auth: false,
			handler: {
				directory: {
					path: 'public'
				}
			}
		}
	});

	return callback();
};

exports.register.attributes = {
	name: 'Public'
};
