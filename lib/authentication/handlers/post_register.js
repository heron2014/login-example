'use strict';
const validator = require('validator'); // github.com/chriso/validator.js
const createPerson = require('../helpers/create_user');
const help = require('../helpers/help');

module.exports = (request, reply, source, error) => { //what is the pupose of source?

  if(!request.payload || request.payload && error) {
    //...

    return reply.view('register', {title: 'Please register', error: help.extract_validation_error(error), values: help.return_form_input_values(error)});
  } else {
    return createPerson(request, reply);
  }
}
