'use strict';

exports.register = (server, options, callback) => {

  server.route({
		method: 'GET',
		path: '/dashboard',
		config: {
      description: 'return the dashboard page',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
			handler: (request, reply) => {

        if (!request.auth.isAuthenticated) {

          return reply.redirect('login');

        } else {
        
          return reply.view('dashboard');
        }
			}
		}
	});

	return callback();
};

exports.register.attributes = {
	name: 'Dashboard'
};
