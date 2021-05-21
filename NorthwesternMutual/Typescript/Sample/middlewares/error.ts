import { logger } from '../lib/logger';
import { Context } from 'koa';

export const handleError = (err: any, ctx: Context): void => {
  const statusCode: number = err?.statusCode || 500;
  let message: string = err?.message;
  if (statusCode >= 500) {
    message = 'Something went wrong. Please try again.';
  }

  // Log the error before returning response
  logger.error('App Error:', {
    statusCode,
    errMessage: err.message,
    errStack: err.stack,
  });

  ctx.status = statusCode;
  ctx.body = { status: 'error', message };
};

export class AppError extends Error {
  name: string;
  message: string;
  statusCode: number;

  constructor(
    message = 'Something went wrong. Please try again.',
    statusCode = 500,
  ) {
    super();

    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.statusCode = statusCode;
  }
}

export const errorParser = (
  errName: string,
  method: string,
  where: string,
  message: string,
): string => {
  return `[${errName}][${method}][${where}]: ${message}`;
};
