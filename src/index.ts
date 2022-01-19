import express from 'express';
import logger from './utilities/logger';
import { promises as fsPromises } from 'fs';
import csv from 'csvtojson';
import sharp from 'sharp';
import path from 'path';
import resize from './utilities/resize';

const app = express();
const port = 3000;

//example: http://localhost:3000/images?filename=fjord&width=300&height=350
app.get('/images', logger, async (req, res) => {
  try {
    res.sendFile(
      await resize.resize(
        req.query.filename as string,
        Number(req.query.width),
        Number(req.query.height)
      )
    );
  } catch (e) {
    console.log(e);
  }
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;
