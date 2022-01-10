import express from 'express';
import logger from './utilities/logger';
import { promises as fsPromises } from 'fs';
import csv from 'csvtojson';

const app = express();
const port = 3000;

const inputFile = './users.csv';
const outputFile = 'users.json';

app.get('/convert', logger, (req, res) => {
  res.send('converting in progress!');
  csv()
    .fromFile(inputFile)
    .then((data: any) => {
      let newData = data.map(
        (item: { first_name: string; last_name: string; phone: string }) => {
          let first = item.first_name;
          let last = item.last_name;
          let phone = item.phone;
          if (item.phone === '') {
            phone = 'missing data';
          }
          return { first, last, phone };
        }
      );
      fsPromises.writeFile(outputFile, JSON.stringify(newData));
    });
});

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
