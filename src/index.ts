import express from 'express';
import logger from './utilities/logger';
import { promises as fsPromises } from 'fs';
import csv from 'csvtojson';
import sharp from 'sharp';
import path from 'path'
import resize from './utilities/resize';

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

app.get('/images', logger, async (req, res) => {  
  try{
    // res.send(
    //   'filename: ' + req.query.filename + '\n' +
    //   'width: ' + req.query.width + '\n' +
    //   'height: ' + req.query.height + '\n'
    // );
    //res.sendFile(path.join(__dirname,'./../assets/full/' + req.query.filename + '.jpg'));
    res.sendFile(await resize.resize(req.query.filename as string, Number(req.query.width), Number(req.query.height)));
  }
  catch(e){
    console.log(e);
  }
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
