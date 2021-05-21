import { Context } from 'koa';
import ApplicantPersonMetadataKey from '../../models/applicantPersonMetadataKey';
import { AppError, errorParser } from '../../middlewares/error';

const errName = 'ApplicantDatabaseKeyError';
const errDomain = 'DB';

export const insert = async (
  ctx: Context,
  key: string,
  label: string,
): Promise<ApplicantPersonMetadataKey> => {
  const { companyId, userId } = ctx.state.user;

  try {
    const result = await ApplicantPersonMetadataKey.create(
      {
        key,
        label,
        userId,
        companyId,
      },
      { transaction: ctx.transaction },
    );

    return result;
  } catch (e) {
    await ctx.transaction.rollback();
    throw new AppError(errorParser(errName, 'insert', errDomain, e.message));
  }
};

export const getByKey = async (
  ctx: Context,
  key: string,
): Promise<ApplicantPersonMetadataKey | null> => {
  const { companyId } = ctx.state.user;

  const result = await ApplicantPersonMetadataKey.findOne({
    where: { companyId, key },
  }).catch(async (e: Error) => {
    await ctx.transaction.rollback();
    throw new AppError(errorParser(errName, 'getByKey', errDomain, e.message));
  });

  return result;
};

export const getAll = async (
  ctx: Context,
): Promise<ApplicantPersonMetadataKey[]> => {
  const { companyId } = ctx.state.user;

  const result = await ApplicantPersonMetadataKey.findAll({
    where: { companyId },
    attributes: ['id', 'key', 'label'],
  }).catch(async (e: Error) => {
    await ctx.transaction.rollback();
    throw new AppError(errorParser(errName, 'getAll', errDomain, e.message));
  });

  return result;
};
