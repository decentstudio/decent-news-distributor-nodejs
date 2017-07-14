import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('slack base route placeholder response');
  // TODO: This needs to be rewritten to use sockets for sending messages. Not sure how this works.
});

export default router;