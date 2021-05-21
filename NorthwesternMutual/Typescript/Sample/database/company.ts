import Company from '../models/company';
import { AppError, errorParser } from '../middlewares/error';
import { DOMAIN_DB, COMPANY_ERROR } from '../helpers/constants';
import { Context } from 'koa';

export const insert = async (companyName: string): Promise<Company> => {
  try {
    const res = await Company.create({
      companyName,
    });
    return res;
  } catch (e) {
    throw new AppError(
      errorParser(COMPANY_ERROR, 'insert', DOMAIN_DB, e.message),
    );
  }
};

export const getByName = async (
  ctx: Context,
  name: string,
): Promise<Company | null> => {
  try {
    const result = await Company.findOne({
      where: { companyName: name },
      attributes: { exclude: ['deletedAt'] },
    });
    return result;
  } catch (e) {
    throw new AppError(
      errorParser(COMPANY_ERROR, 'getById', DOMAIN_DB, e.message),
    );
  }
};

export const getAll = async (): Promise<Company[]> => {
  try {
    const res = await Company.findAll({
      attributes: {
        exclude: ['deletedAt'],
      },
    });
    return res;
  } catch (e) {
    throw new AppError(
      errorParser(COMPANY_ERROR, 'getAll', DOMAIN_DB, e.message),
    );
  }
};
