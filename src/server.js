const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('Hello World');
});

const server = app.listen(8081, function() {
  const port = server.address().port;
  console.log(`Server listening on port ${port}.`);
});