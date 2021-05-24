import { AppError } from '@shared/Errors/AppError';
import { NextFunction, Request, Response } from 'express';

export const appErrorHandlingMiddleware = (
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response => {
  if (err instanceof AppError)
    return response.status(err.statusCode).json({
      error: 'Application Error',
      message: err.message,
    });

  return response.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
};
