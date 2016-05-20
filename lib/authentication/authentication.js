var HapiAuthJWT =  require('hapi-auth-jwt2');
var validate = require('./helpers/jwt2_validate_func');

exports.register = function (server, options, next) {

  server.register(HapiAuthJWT, function (err) {

    server.auth.strategy('jwt', 'jwt', true,
    { key: process.env.JWT_SECRET,  validateFunc: validate,
      verifyOptions: { ignoreExpiration: true }
    });

  });

  return next();
}

exports.register.attributes = {
  name: 'Authentication'
};
