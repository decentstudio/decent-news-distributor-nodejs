require('dotenv').config();

function get(varName) {
  return process.env[varName];
}

const config = {
  RABBITMQ_HOST: get('RABBITMQ_HOST'),
  RABBITMQ_PORT: get('RABBITMQ_PORT'),
  RABBITMQ_PASS: get('RABBITMQ_PASS'),
  RABBITMQ_VHOST: get('RABBITMQ_VHOST'),
  HTTP_PORT: get('HTTP_PORT')
};

export default config;