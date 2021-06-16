import { Request, Response, NextFunction } from 'express';
import { ExpressJoiError } from 'express-joi-validation';
import { errorMessage } from './requestData';
import logger from '../utils/logger';

const errorTypes = [
  'body',
  'headers',
  'query',
  'params',
  'fields'
];

export const validationErrorHandler = (
  error: any | ExpressJoiError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error && errorTypes.includes(error.type)) {
    logger.error(errorMessage(error, request));

    const { type } = error;
    const { message } = error.error;
    
    response.status(400).json({
      type: type,
      message: message
    });
  } else {
    next(error);
  }
};
