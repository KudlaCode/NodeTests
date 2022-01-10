import express from 'express';
import logger from './utilities/logger';

const app = express();
const port = 3000;

//routes
app.get('/continents', logger, (req, res) => {
  res.send('continents!');
});

app.get('/countries', logger, (req, res) => {
  res.send('countries!');
});

app.get('/oceans', (req, res) => {
  res.send('oceans!');
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});