require('env2')('.env');
var redisClient = require('redis-connection')();

module.exports = function (decoded, request, callback) {

  // do your checks to see if the session is valid
  redisClient.get(decoded.id, function (rediserror, reply) {

    if(rediserror) {
      console.log(rediserror);
    }

    var session;
    if(reply) {
      session = JSON.parse(reply);
    }
    else { // unable to find session in redis ... reply is null
      return callback(rediserror, false);
    }

    if (session.valid === true) {
      return callback(rediserror, true, session);
    }
    else {
      return callback(rediserror, false);
    }
  });
};
