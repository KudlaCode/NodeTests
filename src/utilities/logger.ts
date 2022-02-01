import express from 'express';
import { NextFunction } from 'express';

const logger = (
  req: express.Request,
  res: express.Response,
  next: NextFunction
): void => {
  const url = req.url;
  console.log(`${url} was visited`);
  console.log(typeof next);
  next();
};

export default logger;
