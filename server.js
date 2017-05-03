'use strict';
const express = require('express');
const app = express();
const chatcat = require('./app');
const passport = require('passport');

app.set('port',process.env.PORT || 3000);
app.set('view engine','ejs');

app.use(express.static('public'));
app.use('/',chatcat.session);
app.use(passport.initialize());
app.use(passport.session());
app.use(require('morgan')('combined',{
  stream:{
    write: message => {
      chatcat.logger.log('info',message);
    }
  }
}));
app.use('/',chatcat.router);


chatcat.ioServer(app).listen(app.get('port'),()=>{
  console.log('ChatCat running on port 3000');
})
