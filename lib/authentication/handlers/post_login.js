'use strict';
const validator = require('validator'); // github.com/chriso/validator.js
const help = require('../helpers/help');
const redisClient = require('redis-connection')();
const bcrypt = require('bcrypt');    // https://github.com/nelsonic/bcrypt
const JWT = require('jsonwebtoken'); // https://github.com/dwyl/learn-json-web-tokens
const checkPassword = require('../helpers/check_password_and_reply');
const reject = require('../helpers/reject');

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

    redisClient.get(help.escape(request.payload.email), (errRedis, result) => {

      if (!errRedis && result) {
        //check password if matches
        result = JSON.parse(result);
        return checkPassword(request, reply, result);
      } else {
        //email did not exist in the database so we send reply message
        return reject(request, reply);
      }
    })
  }
}
