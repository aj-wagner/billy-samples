import { Context } from 'koa';
import ApplicantDatabaseItem from '../../models/applicantDatabaseItem';
import { AppError, errorParser } from '../../middlewares/error';
import { DOMAIN_DB } from '../../helpers/constants';

const errName = 'ApplicantDatabaseItemError';

export const insert = async (
  ctx: Context,
  databaseId: string,
  candidateId: string,
  companyId: string,
  userId: string,
): Promise<ApplicantDatabaseItem> => {
  const result = await ApplicantDatabaseItem.create(
    {
      databaseId,
      candidateId,
      userId,
      companyId,
    },
    { transaction: ctx.transaction },
  ).catch(async (e: Error) => {
    await ctx.transaction.rollback();
    throw new AppError(errorParser(errName, 'insert', DOMAIN_DB, e.message));
  });

  return result;
};
