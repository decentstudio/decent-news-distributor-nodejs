import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

const server = app.listen(8081, () => {
  const port = server.address().port;
  console.log(`Server listening on port ${port}.`);
});