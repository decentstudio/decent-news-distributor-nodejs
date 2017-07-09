const amqp = require('amqplib');

amqp.connect('amqp://localhost').then(conn => {
  return conn.createChannel();
}).then(channel => {
  const ex = 'amq.topic';
  const key = 'slack.event.message';
  const msg = JSON.stringify({
    type: 'message',
    content: 'testing json 2'
  });

  channel.publish(ex, key, Buffer.from(msg));
  console.log(" [x] Sent %s: '%s'", key, msg);
});
