import { Context } from 'koa';
import * as companyDB from '../database/company';
import Company from '../models/company';
import { AppError } from '../middlewares/error';
import HttpStatus from 'http-status-codes';

export const insertCompany = async (
  ctx: Context,
  companyName: string,
): Promise<Company> => {
  const exists = await companyDB.getByName(ctx, companyName);
  if (exists) {
    throw new AppError(
      'Company name already exists. Please try a new name.',
      HttpStatus.BAD_REQUEST,
    );
  }
  return await companyDB.insert(companyName);
};

export const getListOfCompanies = async (): Promise<Company[]> => {
  return await companyDB.getAll();
};
