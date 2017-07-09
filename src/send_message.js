import amqp from 'amqplib';

amqp.connect().then(conn => {
  return conn.createChannel();
}).then(channel => {
  const ex = 'amq.topic';
  const key = 'slack.event.message';
  const msg = 'Hello world!';
});