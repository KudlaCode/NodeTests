import express from 'express';
import logger from './utilities/logger';
import resize from './utilities/resize';

const app = express();
const port = 3000;

//example: http://localhost:3000/images?filename=fjord&width=300&height=350
app.get(
  '/images',
  logger,
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      //input checks
      if (!req.query) {
        res.send(
          'No parameters for the image resizing api were provided. Please provide a valid filename, width and height. Example: http://localhost:3000/images?filename=fjord&width=300&height=350'
        );
        return;
      }

      if (!req.query.filename || req.query.filename === '') {
        res.send('No parameter for filename was provided. ');
        return;
      }
      if (!req.query.width || req.query.width === '') {
        res.send('No parameter for width was provided.');
        return;
      }
      if (!req.query.height || req.query.height === '') {
        res.send('No parameter for height was provided.');
        return;
      }

      res.sendFile(
        await resize.resize(
          req.query.filename as string,
          Number(req.query.width),
          Number(req.query.height)
        )
      );
    } catch (e) {
      console.log(e);
      if (e instanceof Error) {
        res.send(e.message);
      }
    }
  }
);

// start the Express server
app.listen(port, (): void => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;
