import Form from '../../models/form';
import { Context } from 'koa';
import { AppError, errorParser } from '../../middlewares/error';

const errName = 'FormError';
const errDomain = 'DB';

export const insert = async (
  ctx: Context,
  name: string,
  data: object,
  userId: string,
  companyId: string,
): Promise<Form> => {
  try {
    return await Form.create(
      {
        name,
        formData: data,
        userId,
        companyId,
      },
      { transaction: ctx.transaction },
    );
  } catch (e) {
    await ctx.transaction.rollback();
    throw new AppError(errorParser(errName, 'insert', errDomain, e.message));
  }
};

export const getById = async (
  id: string,
  companyId: string,
): Promise<Form | null> => {
  try {
    return await Form.findOne({
      where: { id, companyId },
      attributes: { exclude: ['deletedAt'] },
    });
  } catch (e) {
    throw new AppError(errorParser(errName, 'getById', errDomain, e.message));
  }
};

export const getAll = async (companyId: string): Promise<Form[]> => {
  return await Form.findAll({
    where: {
      companyId,
    },
    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
  }).catch((e: Error) => {
    throw new AppError(errorParser(errName, 'getAll', errDomain, e.message));
  });
};

export const updateById = async (
  ctx: Context,
  id: string,
  companyId: string,
  userId: string,
  name: string,
  formPayload: object,
): Promise<[number, Form[]]> => {
  const result = await Form.update(
    {
      userId,
      name,
      formData: formPayload,
    },
    {
      where: {
        id,
        companyId,
      },
      transaction: ctx.transaction,
    },
  ).catch(async (e: Error) => {
    await ctx.transaction.rollback();
    throw new AppError(
      errorParser(errName, 'updateById', errDomain, e.message),
    );
  });

  return result;
};

export const getByName = async (
  ctx: Context,
  name: string,
  companyId: string,
): Promise<Form | null> => {
  return await Form.findOne({
    where: { name, companyId },
    attributes: { exclude: ['companyId', 'userId', 'deletedAt'] },
  }).catch((e: Error) => {
    throw new AppError(errorParser(errName, 'getByName', errDomain, e.message));
  });
};
