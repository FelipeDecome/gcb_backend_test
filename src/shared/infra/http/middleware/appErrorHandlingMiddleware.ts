import { NextFunction, Request, Response } from 'express';

export const appErrorHandlingMiddleware = (
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response => {
  return response.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
};
