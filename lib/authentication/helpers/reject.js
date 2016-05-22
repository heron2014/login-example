'use strict';
const help = require('./help');

module.exports = (request, reply) => {
  return reply.view('login', {
    error  : { email: {
      message: 'Sorry, that email or password is incorrect. Please try again.'}
    }, // yes, this is a deeply nested error object extracted in the view
    values : { email: help.escape(request.payload.email) }
  }).code(401);
}
