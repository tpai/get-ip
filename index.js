'use strict';

const youtubeDl = require("youtube-dl");

exports.handler = (event, context, callback) => {
    if (!event.queryStringParameters) {
        callback(null, {
            statusCode: '200',
            body: htmlTemplate({
                title: 'Video Player',
                head: `
                    <style>
                        html, body {
                            height: 100%;
                        }
                        body {
                            display: flex;
                            flex-wrap: nowrap;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                        }
                        .input {
                            width: 50%;
                            font-size: 2rem;
                            font-family: Noto Sans;
                            text-align: center;
                            border: none;
                            outline: none;
                            border-bottom: 1px solid #333;
                            background: transparent;
                            transition: all .5s;
                        }
                        .input:focus {
                            width: 60%;
                            border-bottom: 2px solid #2196F3;
                        }
                        .mask {
                            position: absolute;
                            left: 0;
                            right: 0;
                            top: 0;
                            bottom: 0;
                            background: #eee;

                            display: none;
                            flex-wrap: nowrap;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                        }
                    </style>
                `,
                body: `
                    <div id="mask" class="mask">
                        <img src="https://s3-ap-southeast-1.amazonaws.com/my-fucking-bucket/spin.gif" />
                    </div>
                    <input
                        type="text"
                        class="input"
                        placeholder="Youtube URL"
                        onkeyup="if(event.keyCode === 13) {
                            location.href='?url='+this.value;
                            this.disabled='true';
                            document.getElementById('mask').style='display: flex';
                        }"
                    />
                `
            }),
            headers: {
                'Content-Type': 'text/html; charset=utf-8'
            }
        });
    } else {
        const { api, url } = event.queryStringParameters;
        youtubeDl.getInfo(url, [], (err, info) => {
            if (err) {
                callback(null, {
                    statusCode: '400',
                    body: err
                });
            }

            if (typeof api !== 'undefined') {
                callback(null, {
                    statusCode: '200',
                    body: JSON.stringify(info),
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                const {
                    title,
                    thumbnail,
                    url,
                    formats,
                    _filename
                } = info;
                callback(null, {
                    statusCode: '200',
                    headers: {
                        'Content-Type': 'text/html; charset=utf-8'
                    },
                    body: htmlTemplate({
                        title: 'Video Player',
                        head: `
                            <style>
                                html, body {
                                    height: 100%;
                                }
                                body {
                                    display: flex;
                                    flex-wrap: nowrap;
                                    flex-direction: column;
                                    align-items: center;
                                    justify-content: center;
                                }
                                video {
                                    margin: 1rem;
                                }
                                .title {
                                    font-size: 2rem;
                                }
                            </style>
                        `,
                        body: `
                            <div class="title">${title}</div>
                            <video width="640" height="360" poster="${thumbnail}" controls preload>
                                <source src="${url}" type="video/mp4">
                            </video>
                            ${formats.reduce((result, format) => {
                                if (format.ext === 'mp4') {
                                    result += `<a href="blob:${format.url}" download="${_filename}" data-downloadurl="video/mp4:${_filename}:blob:${format.url}" target="_blank">${format.format}</a>\n`;
                                }
                                return result;
                            }, '')}
                        `
                    })
                });
            }
        });
    }
};

function htmlTemplate({ title, head, body }) {
    return `
        <!DOCTYPE html>
            <head>
                <meta charset="UTF-8">
                <meta content="width=device-width" name="viewport">
                <title>${title}</title>
                ${head}
            </head>
            <body>
                ${body}
            </body>
        </html>
    `
}
