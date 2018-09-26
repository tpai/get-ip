const express = require('express');
const app = express();
const ydl = require('./index');

app.get('/', (req, res) => {
  return ydl.handler(
    Object.assign({},
      Object.keys(req.query).length > 0 ? {
        queryStringParameters: { ...req.query },
      } : {}
    ),
    null,
    (err, response) => {
      res.send(response.body);
    },
  );
});

app.listen(3001, () => console.log('Server is now listening on port 3001...'));
