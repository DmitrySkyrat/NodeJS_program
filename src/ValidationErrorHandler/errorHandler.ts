import { Request, Response, NextFunction } from "express";
import { ExpressJoiError } from "express-joi-validation";

const errorTypes = [
  'body',
  'headers',
  'query',
  'params',
  'fields'
]

export const validationErrorHandler = (
  error: any | ExpressJoiError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error && errorTypes.includes(error.type)) {
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
