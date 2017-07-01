import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('slack base route placeholder response');
});

export default router;