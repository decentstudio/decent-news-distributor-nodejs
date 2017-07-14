import express from 'express';
import log from 'npmlog';
import slackRouter from './slack-router';
import broker from './broker';
require('dotenv').config();

const app = express();
const logPrefix = `server (${new Date()}): `;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/slack', slackRouter);

broker.connect().then(broker => {
  // TODO: start consuming here and print to test

  app.listen(
    process.env.HTTP_PORT,
    (app, err) => onStart(process.env.HTTP_PORT, app, err));
});

function onStart(port, app, err) {
  if (!err) {
    log.info(logPrefix, `Server listening on port ${port}.`);
  }
  else {
    log.error(logPrefix, err);
  }
}


