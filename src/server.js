import express from 'express';
import log from 'npmlog';
import config from './config';

const app = express();
const logPrefix = 'server';

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(config.HTTP_PORT, (app, err) => onStart(config.HTTP_PORT, app, err)); 

function onStart(port, app, err) {
  if (!err) {
    log.info(logPrefix, `Server listening on port ${port}.`);
  }
  else {
    log.error(logPrefix, err);
  }
}