'use strict';
const validator = require('validator'); // github.com/chriso/validator.js
const help = require('../helpers/help');
const redisClient = require('redis-connection')();

module.exports = (request, reply, source, error) => {

  if (!request.payload || request.payload && error) {
    var errors, values; // return empty if not set.
    if(error && error.data) { // only attempt to extract errors if they exist
      errors = help.extract_validation_error(error); // the error field + message
      values = help.return_form_input_values(error); // avoid wiping form data
    }
    var title = 'Please login';
    //render the login form
    return reply.view('login', {title: title, error: errors, values: values}).code(error ? 400 : 200);

  } else { //no errors and the payload has valid email, lets look it up in DB:

    redisClient.get(request.payload.email, (errRedis, result) => {
      if (!errRedis && result) {
        //check password if matches
      } else {
        //email did not exist in the database so we send reply message
      }
    })
  }
}
