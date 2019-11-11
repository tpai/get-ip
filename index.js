'use strict';

const pug = require('pug');
const {
  getFirstForwardedIp,
  getSourceIp,
  getUserAgent
} = require('./selectors/event');

const index = pug.compileFile('./pages/index.pug');

exports.handler = (event, context, callback) => {
  const firstForwardedIp = getFirstForwardedIp(event)
  const sourceIp = getSourceIp(event)
  const userAgent = getUserAgent(event)
  console.log(event)
  callback(null, {
    statusCode: '200',
    body: index({
      ip: firstForwardedIp || sourceIp,
      userAgent
    }),
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
};
