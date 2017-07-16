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

    let channel = null;

    amqplib.connect(getConnectionUrl(logConnectionAttempt(config)))
      .then(conn => {
        return conn.createChannel();
      }).then(ch => {
        channel = ch;
        return channel.assertQueue('', { exclusive: true});
      }).then(response => {
        const ex = 'amq.topic';
        // Bind to topics we are interested in here. Refactor topics into config file for easy addition/removal.
        channel.bindQueue(response.queue, ex, 'slack.event.message');

        resolve({ 
          consume: (callback, options) => {
            channel.consume(response.queue, callback, {noAck: true})
          }
        });
      });
  });
}

const broker = {
  connect: connect
};

export default broker;