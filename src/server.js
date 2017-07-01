import express from 'express';
import log from 'npmlog';
import config from './config';
import slackRouter from './slack-router';

const app = express();
const logPrefix = `server (${new Date()}): `;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/slack', slackRouter);

app.listen(config.HTTP_PORT, (app, err) => onStart(config.HTTP_PORT, app, err)); 

function onStart(port, app, err) {
  if (!err) {
    log.info(logPrefix, `Server listening on port ${port}.`);
  }
  else {
    log.error(logPrefix, err);
  }
}