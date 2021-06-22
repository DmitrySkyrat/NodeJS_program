import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

export const getRequestMessage = (req: Request): string => {
  const info = {
      query: req.query,
      body: req.body
  };

  return `${req.method} ${req.originalUrl} ${JSON.stringify(info)}`;
};

export const errorMessage = (err: Error, req: Request): string => {
  return `${JSON.stringify(err)}`;
};

const requestData = (req: Request, res: Response, next: NextFunction): void => {
  logger.info(`RESPONSE STARTED ${getRequestMessage(req)}`);
  
  res.on('finish', () => {
    logger.info(`RESPONSE IS FINISHED ${getRequestMessage(req)}`);
  });

  res.on('close', () => {
      logger.info(`RESPONSE IS CLOSED ${getRequestMessage(req)}`);
  });

  next();
};

export default requestData;
