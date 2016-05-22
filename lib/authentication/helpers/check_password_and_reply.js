'use strict';

const redisClient = require('redis-connection')();
const bcrypt = require('bcrypt');    // https://github.com/nelsonic/bcrypt
const JWT = require('jsonwebtoken'); // https://github.com/dwyl/learn-json-web-tokens
const aguid = require('aguid'); // https://github.com/dwyl/aguid
const reject = require('./reject');

/**
 * check_password_and_reply does what its name suggests: checks the
 * password stored in the database for the person, if the password is correct,
 * i.e. bcrypt.compare is a match, create a new session for the person,
 * else, reply with the login form and error messages
 */
module.exports = (request, reply, result) => {

  var pw = request.payload.password;
  var hash = result.password;
  bcrypt.compare(pw, hash, function(err, res) { // check password match
    if(!err && res === true) { // no error and password matches
      // insert new session
      var sid = aguid(); //sesion id -some random string
      var token = JWT.sign({
        sid: sid,
        exp: Math.floor(new Date().getTime()/1000) + 7*24*60*60
      },process.env.JWT_SECRET);

      var session = {
        "valid" : true,
        "created" : new Date().getTime()
      };
      redisClient.set(sid, JSON.stringify(session));

      var name = result.name;
      return reply.redirect('/dashboard', {
        name: name,
        email: request.payload.email
      }).state('token', token); //set the cookie

    } else {
      return reject(request, reply);
    }
  });
}
