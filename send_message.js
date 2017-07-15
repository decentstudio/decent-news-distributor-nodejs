const amqp = require('amqplib');

const ex = 'amq.topic';
const key = 'slack.event.message';
const messagesPerSecond = 60;

amqp.connect('amqp://localhost').then(conn => {
  return conn.createChannel();
}).then(channel => {
  let counter = 0;
  let msg = '';
  setInterval(() => {
    msg = JSON.stringify({
      type: 'message',
      content: `test message ${counter}`
    });
    channel.publish(ex, key, Buffer.from(msg));
    console.log(" [x] Sent %s: '%s'", key, msg);
    counter++;
  }, 1000 / messagesPerSecond);
});
