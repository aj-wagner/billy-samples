import { Context } from 'koa';
import {
  insert,
  getById,
  getAll,
  updateById,
  getByName,
} from '../../database/form';
import { insert as insertItem } from '../../database/form/Item';
import Form from '../../models/form';
import { FormBody } from '../../@types/form';
import { AppError } from '../../middlewares/error';
import HttpStatus from 'http-status-codes';
import { db } from '../../lib/sequelize';

export const createForm = async (
  ctx: Context,
  data: FormBody,
): Promise<string> => {
  const { companyId, userId } = ctx.state.user;

  // Reject if form name exists
  const exists = await getByName(ctx, data.name, companyId);
  if (exists) {
    throw new AppError(
      'Form name exists. Please choose another name',
      HttpStatus.BAD_REQUEST,
    );
  }

  // Start DB transaction
  ctx.transaction = await db.transaction();

  // Insert form
  const result = await insert(ctx, data.name, data.formData, userId, companyId);

  // Commit then return form ID
  await ctx.transaction.commit();
  return result.id;
};

export const getFormById = async (
  id: string,
  token: Token,
): Promise<Form | null> => {
  return await getById(id, token.companyId);
};

export const getAllForms = async (token: Token): Promise<Form[]> => {
  return await getAll(token.companyId);
};

export const updateFormById = async (
  ctx: Context,
  id: string,
  data: FormBody,
): Promise<number> => {
  const { companyId, userId } = ctx.state.user;

  const result = await updateById(
    ctx,
    id,
    companyId,
    userId,
    data.name,
    data.formData,
  );

  // Return number of updated rows
  return result[0];
};
