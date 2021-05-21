import { insert, getByUsername, getByUserId } from '../database/account';
import { AppError } from '../middlewares/error';
import User from '../models/account';

export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  companyId: string,
  password: string,
): Promise<User> => {
  const checkExisting = await getByUsername(email);

  if (checkExisting?.email) {
    throw new AppError('Email is already registered', 400);
  }

  return await insert(firstName, lastName, email, companyId, password);
};

export const getDetailByUserId = async (
  userId: string,
): Promise<User | null> => {
  return await getByUserId(userId);
};
