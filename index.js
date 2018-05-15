'use strict';

const youtubeDl = require('youtube-dl');
const pug = require('pug');

const index = pug.compileFile('./pages/index.pug');
const main = pug.compileFile('./pages/main.pug');

exports.handler = (event, context, callback) => {
  if (!event.queryStringParameters) {
    callback(null, {
      statusCode: '200',
      body: index(),
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } else {
    const { api, url } = event.queryStringParameters;
    youtubeDl.getInfo(url, [], (err, info) => {
      if (err) {
        callback(null, {
          statusCode: '400',
          body: err,
        });
      }

      if (typeof api !== 'undefined') {
        callback(null, {
          statusCode: '200',
          body: JSON.stringify(info),
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        });
      } else {
        const { title, thumbnail, url, formats, _filename } = info;
        callback(null, {
          statusCode: '200',
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
          },
          body: main({
            title,
            thumbnail,
            url,
            links: formats.reduce((result, format) => {
              if (format.ext === 'mp4') {
                result += `
                  <a href="${format.url}"
                     download="${_filename}"
                     data-downloadurl="video/mp4:${_filename}:blob:${format.url}"
                     target="_blank">${format.format}</a><br />`;
              }
              return result;
            }, ''),
          }),
        });
      }
    });
  }
};
