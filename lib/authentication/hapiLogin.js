'use strict';

const HapiLogin =  require('hapi-login');
const Joi = require('joi');
const postLogin = require('./handlers/post_login');

exports.register = (server, options, callback) => {

  var login_fields = {
    name  : Joi.string().required(),
    email : Joi.string().email().required()
  }

  var opts = {
    fields: login_fields,
    handler: postLogin,
    fail_action_handler: postLogin
  };

  server.register({register: HapiLogin, options: opts}, function (err) {

    if (err) {
      return callback(err);
    }

  });

  return callback();
}

exports.register.attributes = {
  name: 'HapiLogin'
};
