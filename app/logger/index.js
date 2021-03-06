'use strict';

const winston = require('winston');
const logger = new (winston.Logger)({
  transports:[
    new (winston.transports.File)({
      level:'debug',
      filename:'./chatCatDebig.log',
      handledExceptions:true
    }),
    new (winston.transports.Console)({
      level:'debug',
      json: true,
      handledExceptions: true
    })
  ],
  exitOnError: false
});

module.exports = logger;
