import { Context } from 'koa';
import FormItem from '../../models/formItem';
import { AppError, errorParser } from '../../middlewares/error';

const errName = 'FormItemError';
const errDomain = 'DB';

export const insert = async (
  ctx: Context,
  formId: string,
  data: object,
): Promise<FormItem> => {
  const result = await FormItem.create(
    {
      formId,
      data,
    },
    { transaction: ctx.transaction },
  ).catch(async (e: Error) => {
    await ctx.transaction.rollback();
    throw new AppError(errorParser(errName, 'insert', errDomain, e.message));
  });

  return result;
};
