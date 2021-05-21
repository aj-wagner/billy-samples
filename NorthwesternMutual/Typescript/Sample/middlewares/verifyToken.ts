import { AppError } from './error';
import jwt from 'jsonwebtoken';
import { logger } from '../lib/logger';
import { Context, Next } from 'koa';

export const verifyToken = async (ctx: Context, next: Next): Promise<void> => {
  const token: string = ctx.cookies.get('Piper_UUID') || '';
  const secret = process.env.JWT_SECRET || '';

  if (!token) {
    throw new AppError('Unauthorized. Please login first', 401);
  }

  try {
    const decrypt: Token = jwt.verify(token, secret) as Token;
    ctx.state.user = decrypt;
    logger.info(`UserID: ${decrypt.userId} CompanyID: ${decrypt.companyId}`);
    return next();
  } catch (err) {
    throw new AppError('Token expired. Please login first', 401);
  }
};
