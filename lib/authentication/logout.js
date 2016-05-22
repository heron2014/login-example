'use strict';

exports.register = (server, options, callback) => {

  server.route({
		method: 'GET',
		path: '/logout',
		config: {
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
			description: 'logout the user',
			handler: (request, reply) => {

        console.log(request.headers);
    
				return reply.redirect('/');
			}
		}
	});

	return callback();
};

exports.register.attributes = {
	name: 'Logout'
};
