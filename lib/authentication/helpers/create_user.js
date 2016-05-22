'use strict';
const Boom        = require('boom');
const bcrypt      = require('bcrypt'); // see: https://github.com/nelsonic/bcrypt
const redisClient = require('redis-connection')();
const help = require('./help'); // helpers used to prepare the reply

module.exports = (request, reply) => {
  var email = help.escape(request.payload.email);
  var name = help.escape(request.payload.name);
  var password = help.escape(request.payload.password);

  redisClient.get(help.escape(request.payload.email), (redisErr, result) => {
    if (!result) { //err is when the person is not register, register the person
      bcrypt.genSalt(12, (err, salt) => {
        bcrypt.hash(help.escape(request.payload.password), salt, (err, hash) => {
          request.payload.password = hash; //save the password hash

          redisClient.set(help.escape(request.payload.email), JSON.stringify(request.payload),function (errR, r) {
            console.log('data saved in redis', r);
            return reply.view('success', {name: name, email: help.escape(request.payload.email)});
          });
        }); // end bcrypt.hash
      });// end bcrypt.genSalt
    } else { // if there is no error from redis the User, it Exists!!

      var title = 'Sorry, Please try a different email address!';
      var email = {message: 'That email address has already been registered.'};
      var values = {email: email, name: name, password: password};
      return reply.view('register', {title: title, error: email, values: values}).code(400);
    }
  }) //end redis request
}
