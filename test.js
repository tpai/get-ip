const express = require('express');
const app = express();
const ydl = require('./index');

app.get('/', (req, res) =>
  ydl.handler(
    {
      queryStringParameters: {
        url: 'https://www.youtube.com/watch?v=ehubCWoMUKo',
      },
    },
    null,
    (err, response) => {
      res.send(response.body);
    },
  ),
);

app.listen(3001, () => console.log('Listening on port 3001!'));
