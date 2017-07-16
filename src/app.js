require('dotenv').config();
import express from 'express';
import log from 'npmlog';
import slackRouter from './slack-router';
import broker from './broker';
import flow from 'lodash/fp/flow';
import Server from 'socket.io';
import { List } from 'immutable';

const logPrefix = `Server: `;
let sockets = List();

broker.connect().then((broker) => {
  broker.consume(processQueueMessage);

  flow([
    createHttpServer,
    configureHttpServer,
    startHttpServer,
    createSocketServer,
    configureSocketServer
  ])()
});

function createHttpServer() {
  return express();
}

function configureHttpServer(app) {
  app.get('/', (req, res) => {
    res.send('Hello World');
  });

  app.use('/slack', slackRouter);

  return app;
}

function startHttpServer(app) {
  return app.listen(
    process.env.HTTP_PORT,
    (app, err) => onHttpServerStart(process.env.HTTP_PORT, app, err));
}

function onHttpServerStart(port, app, err) {
  if (!err) {
    log.info(logPrefix, `Listening on port ${port}.`);
  }
  else {
    log.error(logPrefix, err);
  }
}

function createSocketServer(httpServer) {
  return new Server(httpServer);
}

function configureSocketServer(socketServer) {
  socketServer.on('connection', (socket) => {
    socket.emit('message', { hello: 'world' });
    sockets = sockets.push(socket);
  });
  return socketServer;
}

function processQueueMessage(msg) {
  log.info(null, `Message from ${msg.fields.routingKey}: ${msg.content.toString()}`);

  sockets.forEach((socket) => {
    socket.emit('message', msg.content.toString());
  });
}



