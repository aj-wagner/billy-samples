import { Context } from 'koa';
import ApplicantPersonMetadata from '../../models/applicantPersonMetadata';
import { AppError, errorParser } from '../../middlewares/error';
import {
  APPLICANT_PERSON_METADATA_ERROR,
  DOMAIN_DB,
} from '../../helpers/constants';

export const insert = async (
  ctx: Context,
  candidateId: string,
  keyId: string,
  value: string,
  companyId: string,
  userId: string,
): Promise<ApplicantPersonMetadata> => {
  try {
    const result = await ApplicantPersonMetadata.create(
      {
        candidateId,
        keyId,
        value,
        companyId,
        userId,
      },
      { transaction: ctx.transaction },
    );

    return result;
  } catch (e) {
    await ctx.transaction.rollback();
    throw new AppError(
      errorParser(
        APPLICANT_PERSON_METADATA_ERROR,
        'insert',
        DOMAIN_DB,
        e.message,
      ),
    );
  }
};
