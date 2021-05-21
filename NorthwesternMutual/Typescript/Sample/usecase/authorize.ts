import jwt from 'jsonwebtoken';
import { getByUsername } from '../database/account';
import { AppError } from '../middlewares/error';
import HttpStatus from 'http-status-codes';

export const authorize = async (
  username: string,
  password: string,
  rememberMe = false,
): Promise<string> => {
  const jwtSecret = process.env.JWT_SECRET || '';
  const jwtExpiry = process.env.JWT_EXPIRY || '24h';

  if (!jwtSecret) {
    throw new AppError('Authentication setting error');
  }

  const res = await getByUsername(username);

  if (!res?.email) {
    throw new AppError('Email not found', HttpStatus.BAD_REQUEST);
  }
  if (res?.password !== password) {
    throw new AppError('Incorrect credentials', HttpStatus.UNAUTHORIZED);
  }

  const token = jwt.sign(
    {
      userId: res?.id,
      companyId: res?.companyId,
    },
    jwtSecret,
    { expiresIn: jwtExpiry },
  );

  return token;
};
