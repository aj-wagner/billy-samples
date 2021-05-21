import { getListOfCompanies, insertCompany } from '../../usecase/company';
import { InsertNewCompanyBody } from './types';
import jsonResponse from '../../helpers/response';
import HttpStatus from 'http-status-codes';
import { Context } from 'koa';

export const insertNewCompanyController = async (
  ctx: Context,
): Promise<void> => {
  const body: InsertNewCompanyBody = ctx.request.body;
  const result = await insertCompany(ctx, body.companyName);
  const { id } = result;

  return jsonResponse(ctx, { insertId: id }, HttpStatus.CREATED);
};

export const getAllCompanies = async (ctx: Context): Promise<void> => {
  const result = await getListOfCompanies();
  jsonResponse(ctx, {
    data: result,
  });
};
