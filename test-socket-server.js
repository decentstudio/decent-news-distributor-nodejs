// Simulates the UI receiving messages from disitributor
const io = require('socket.io-client');

const socket = io('http://localhost:8081');

socket.on('message', function(data) {
  console.log(data);
});