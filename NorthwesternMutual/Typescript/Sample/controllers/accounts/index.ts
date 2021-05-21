import { AppError } from '../../middlewares/error';
import { register, getDetailByUserId } from '../../usecase/account';
import { RegisterBody } from './types';
import jsonResponse from '../../helpers/response';
import HttpStatus from 'http-status-codes';
import { Context } from 'koa';

export const registerController = async (ctx: Context): Promise<void> => {
  const body: RegisterBody = ctx.request.body;
  if (
    !body.firstName ||
    !body.lastName ||
    !body.email ||
    !body.companyId ||
    !body.password
  ) {
    throw new AppError('Bad request', 400);
  }

  const result = await register(
    body.firstName,
    body.lastName,
    body.email,
    body.companyId,
    body.password,
  );
  const { id } = result;
  return jsonResponse(ctx, { insertId: id }, HttpStatus.CREATED);
};

export const getDetailCtrl = async (ctx: Context): Promise<void> => {
  const userId = ctx.state.user?.userId;
  const result = await getDetailByUserId(userId);

  return jsonResponse(ctx, { user: result });
};
