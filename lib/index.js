'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Handlebars = require('handlebars');
const Vision = require('vision');

const Home = require('./home');
const Login = require('./authentication/login');
const Register = require('./authentication/register');
const Registration = require('./authentication/registration');
const Authentication = require('./authentication/authentication');
const HapiLogin = require('./authentication/hapiLogin');

const Public = require('./public');

exports.init = (port, callback) => {

  const server = new Hapi.Server();
  server.connection({ port: port });

  const plugins = [Registration, Authentication, HapiLogin, Inert, Vision, Home, Login, Register, Public];

  server.register(plugins, (err) => {

    if (err) {
      return callback(err);
    }

    server.views({
      engines: {
        html: Handlebars
      },
      relativeTo: __dirname + '/../views/',
      path: '.',
      layout: 'index',
      layoutPath: 'layout'
    })

    server.start((err) => {
      return callback(err, server);
    });
  });

}
