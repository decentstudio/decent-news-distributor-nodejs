import express from 'express';
import log from 'npmlog';
import slackRouter from './slack-router';
import broker from './broker';
import flow from 'lodash/fp/flow';
require('dotenv').config();

const logPrefix = `Server: `;

broker.connect().then(() =>
  flow([
    createServer,
    configureServer,
    startServer
  ])()
);

function createServer() {
  return express();
}

function configureServer(app) {
  app.get('/', (req, res) => {
    res.send('Hello World');
  });

  app.use('/slack', slackRouter);

  return app;
}

function startServer(app) {
  return app.listen(
    process.env.HTTP_PORT,
    (app, err) => onServerStart(process.env.HTTP_PORT, app, err));
}

function onServerStart(port, app, err) {
  if (!err) {
    log.info(logPrefix, `Listening on port ${port}.`);
  }
  else {
    log.error(logPrefix, err);
  }
}


