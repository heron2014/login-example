'use strict';
const validator = require('validator'); // github.com/chriso/validator.js

module.exports = (request, reply, source, error) => {

  if(!request.payload || request.payload && error) {
    return reply.code(400);
  } else {
    var email = request.payload.email;
    return reply.view('success', {email: email});
  }
}
