import { Context } from 'koa';
import ApplicantDatabaseField from '../../models/applicantDatabaseField';
import { AppError, errorParser } from '../../middlewares/error';
import { DOMAIN_DB } from '../../helpers/constants';

const errName = 'ApplicantDatabaseFieldError';

export const insert = async (
  ctx: Context,
  databaseId: string,
  keyId: string,
): Promise<ApplicantDatabaseField> => {
  const { companyId, userId } = ctx.state.user;

  const result = await ApplicantDatabaseField.create(
    {
      databaseId,
      userId,
      companyId,
      keyId,
    },
    { transaction: ctx.transaction },
  ).catch(async (e: Error) => {
    await ctx.transaction.rollback();
    throw new AppError(errorParser(errName, 'insert', DOMAIN_DB, e.message));
  });

  return result;
};
