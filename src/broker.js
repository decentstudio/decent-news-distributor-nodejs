import amqplib from 'amqplib'
import log from 'npmlog'

function getConnectionUrl({ user, pass, host, port, vhost }) {
  return `amqp://${user}:${pass}@${host}:${port}${vhost}`;
};

function getLogUrl({ user, host, port, vhost }) {
  return `amqp://${user}:*****@${host}:${port}${vhost}`;
}

function logConnectionAttempt(config) {
  let logUrl = getLogUrl(config),
    template = `Connecting to the broker @ ${logUrl}`;
  log.info('broker', template);
  return config;
}

function connect() {
  return new Promise((resolve, reject) => {
    let config = {
      host: process.env.RABBITMQ_HOST,
      port: process.env.RABBITMQ_PORT,
      user: process.env.RABBITMQ_USER,
      pass: process.env.RABBITMQ_PASS,
      vhost: process.env.RABBITMQ_VHOST
    };

    let channel;

    amqplib.connect(getConnectionUrl(logConnectionAttempt(config)))
      .then(conn => {
        return conn.createChannel();
      }).then(ch => {
        channel = ch;
        return channel.assertQueue('', { exclusive: true });
      }).then(q => {
        const ex = 'amq.topic';
        // bind to topics we are interested in here
        channel.bindQueue(q.queue, ex, 'slack.event.message');
        resolve({ consume: channel.consume.bind(null, q.queue) });
      });
  });
}

const broker = {
  connect: connect
};

export default broker;