'use strict';
const passport = require('passport');
const config = require('../config');
const FacebookStrategy = require('passport-facebook').Strategy;
const h = require('../helper');
const logger = require('../logger');
const TwitterStrategy = require('passport-twitter').Strategy;

module.exports = ()=>{

  passport.serializeUser((user,done)=>{
    done(null, user.id);
  });

  passport.deserializeUser((id,done)=>{
    h.findById(id)
      .then(user => done(null,user))
      .catch(error => logger.log('error','Error when deserializing user '+error));
  });

  let authProcessor = (accessToken, refreshToken, profile, done)=>{
    h.findOne(profile.id)
      .then(result=>{
        if(result){
          done(null,result);
        } else{
            h.createNewUser(profile)
              .then(newChatUser => done(null,newChatUser))
              .catch(error => logger.log('error','Error when deserializing the user '+error));
        }
      });
  }

  passport.use(new FacebookStrategy(config.fb, authProcessor));
  passport.use(new TwitterStrategy(config.twitter, authProcessor));
}
