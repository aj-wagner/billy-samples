import { Context } from 'koa';
import ApplicantPerson from '../../models/applicantPerson';
import { AppError, errorParser } from '../../middlewares/error';
import { APPLICANT_PERSON_ERROR, DOMAIN_DB } from '../../helpers/constants';
import ApplicantPersonMetadata from '../../models/applicantPersonMetadata';
import ApplicantPersonMetadataKey from '../../models/applicantPersonMetadataKey';

export const insert = async (
  ctx: Context,
  firstName: string,
  lastName: string,
  email: string,
): Promise<ApplicantPerson> => {
  const { companyId } = ctx.state.user;
  try {
    const result = await ApplicantPerson.create({
      firstName,
      lastName,
      email,
      companyId,
    });

    return result;
  } catch (e) {
    await ctx.transaction.rollback();
    throw new AppError(
      errorParser(APPLICANT_PERSON_ERROR, 'insert', DOMAIN_DB, e.message),
    );
  }
};

export const getById = async (
  ctx: Context,
  id: string,
  companyId: string,
): Promise<ApplicantPerson | null> => {
  try {
    const result = await ApplicantPerson.findOne({
      where: { companyId, id },
      attributes: { exclude: ['companyId', 'deletedAt'] },
      include: [
        {
          model: ApplicantPersonMetadata,
          attributes: ['value'],
          include: [
            {
              model: ApplicantPersonMetadataKey,
              attributes: ['key', 'label'],
            },
          ],
        },
      ],
    });

    return result;
  } catch (e) {
    throw new AppError(
      errorParser(APPLICANT_PERSON_ERROR, 'getById', DOMAIN_DB, e.message),
    );
  }
};

export const getAll = async (
  ctx: Context,
  companyId: string,
): Promise<ApplicantPerson[]> => {
  try {
    const result = await ApplicantPerson.findAll({
      where: { companyId },
      attributes: {
        exclude: ['companyId', 'createdAt', 'updatedAt', 'deletedAt'],
      },
    });

    return result;
  } catch (e) {
    throw new AppError(
      errorParser(APPLICANT_PERSON_ERROR, 'getAll', DOMAIN_DB, e.message),
    );
  }
};

export const getByEmail = async (
  ctx: Context,
  companyId: string,
  email: string,
): Promise<ApplicantPerson | null> => {
  try {
    const result = await ApplicantPerson.findOne({
      where: { companyId, email },
      attributes: {
        exclude: ['companyId', 'createdAt', 'updatedAt', 'deletedAt'],
      },
    });

    return result;
  } catch (e) {
    throw new AppError(
      errorParser(APPLICANT_PERSON_ERROR, 'getByEmail', DOMAIN_DB, e.message),
    );
  }
};
