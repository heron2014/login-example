'use strict';

const Hapi = require('hapi');
const Inert = require('inert');

const Home = require('./home');
const Public = require('./public');

exports.init = (port, callback) => {

  const server = new Hapi.Server();
  server.connection({ port: port });

  const plugins = [Inert, Home, Public];

  server.register(plugins, (err) => {

    if (err) {
      return callback(err);
    }

    server.start((err) => {
      return callback(err, server);
    });
  });

}
