'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.get('/', function (req, res) {
  res.send('Hello World');
});

var server = app.listen(8081, function () {
  var port = server.address().port;
  console.log('Server listening on port ' + port + '.');
});