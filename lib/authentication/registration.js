'use strict';

const HapiRegister =  require('hapi-register');
const Joi = require('joi');
const postRegister = require('./handlers/post_register');

exports.register = (server, options, callback) => {

  var register_fields = {
    name  : Joi.string().required(),
    email : Joi.string().email().required()
  }

  var opts = {
    fields: register_fields,
    handler: postRegister,
    fail_action_handler: postRegister
  };

  server.register({register: HapiRegister, options: opts}, function (err) {

    if (err) {
      return callback(err);
    }

  });

  return callback();
}

exports.register.attributes = {
  name: 'Registration'
};
