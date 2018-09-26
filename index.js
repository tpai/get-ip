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
      if (err || typeof info === 'undefined') {
        callback(null, {
          statusCode: '200',
          body: '<div>This video could not decrypted by <strong>youtube-dl</strong>, try <a href="http://kej.tw/flvretriever">another tool</a>.</div>',
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
          },
        });
        return;
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
                     target="_blank"
                     class="item">${format.format}</a>`;
              }
              return result;
            }, ''),
          }),
        });
      }
    });
  }
};
