const amqp = require('amqplib');

const ex = 'amq.topic';
const key = 'slack.event.message';
const messagesPerSecond = 10;

amqp.connect('amqp://localhost').then(conn => {
  return conn.createChannel();
}).then(channel => {
  let counter = 0;
  let msg = '';

  setInterval(() => {
    msg = JSON.stringify({
      type: 'message',
      channel: 'C5F6L31QF',
      user: 'U595Z8REK',
      text: `test message ${counter}`,
      ts: Date.now(),
      source_team: 'T57D8BH3R',
      team: 'T57D8BH3R'
    });
    channel.publish(ex, key, Buffer.from(msg));
    console.log(" [x] Sent %s: '%s'", key, msg);
    counter++;
  }, 1000 / messagesPerSecond);
});
