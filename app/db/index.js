'use strict';
const config = require('../config');
const logger = require('../logger');
const Mongoose = require('mongoose').connect(config.dbURI);



Mongoose.connection.on('error',error=>{
  logger.log('error','Mongoose connection error '+ error);
});


const chatUser = new Mongoose.Schema({
  profileID: String,
  fullName: String,
  profilePic: String
});

let userModel = Mongoose.model('chatUser',chatUser);

module.exports = {
  Mongoose,
  userModel
};
