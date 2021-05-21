import { Context } from 'koa';
import { AppError, errorParser } from '../../middlewares/error';
import ApplicantDatabase from '../../models/applicantDatabase';
import ApplicantDatabaseItem from '../../models/applicantDatabaseItem';
import ApplicantPersonMetadataKey from '../../models/applicantPersonMetadataKey';
import ApplicantDatabaseField from '../../models/applicantDatabaseField';
import ApplicantPerson from '../../models/applicantPerson';
import ApplicantPersonMetadata from '../../models/applicantPersonMetadata';

const errName = 'ApplicantDatabaseError';
const errDomain = 'DB';

const includeDetailsOption = [
  {
    model: ApplicantDatabaseField,
    attributes: ['id'],
    include: [
      {
        model: ApplicantPersonMetadataKey,
        attributes: ['key', 'label'],
      },
    ],
  },
  {
    model: ApplicantDatabaseItem,
    attributes: ['id'],
    include: [
      {
        model: ApplicantPerson,
        attributes: {
          exclude: ['companyId', 'createdAt', 'updatedAt', 'deletedAt'],
        },
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
      },
    ],
  },
];

export const insert = async (
  ctx: Context,
  name: string,
  userId: string,
  companyId: string,
): Promise<ApplicantDatabase> => {
  const result: ApplicantDatabase = await ApplicantDatabase.create(
    {
      name,
      userId,
      companyId,
    },
    { transaction: ctx.transaction },
  ).catch(async (e: Error) => {
    await ctx.transaction.rollback();
    throw new AppError(errorParser(errName, 'insert', errDomain, e.message));
  });

  return result;
};

export const getById = async (
  ctx: Context,
  id: string,
): Promise<ApplicantDatabase | null> => {
  const { companyId } = ctx.state.user;

  return await ApplicantDatabase.findOne({
    where: { id, companyId },
    attributes: ['id', 'name'],
    include: includeDetailsOption,
  }).catch((e: Error) => {
    throw new AppError(errorParser(errName, 'getById', errDomain, e.message));
  });
};

export const getByName = async (
  ctx: Context,
  name: string,
  companyId: string,
): Promise<ApplicantDatabase | null> => {
  return await ApplicantDatabase.findOne({
    where: { name, companyId },
    attributes: { exclude: ['companyId', 'userId', 'deletedAt'] },
  }).catch((e: Error) => {
    throw new AppError(errorParser(errName, 'getByName', errDomain, e.message));
  });
};

export const getAll = async (
  ctx: Context,
  companyId: string,
): Promise<ApplicantDatabase[]> => {
  try {
    return await ApplicantDatabase.findAll({
      where: { companyId },
      attributes: ['id', 'name'],
      include: includeDetailsOption,
    });
  } catch (e) {
    throw new AppError(errorParser(errName, 'getAll', errDomain, e.message));
  }
};

export const deleteById = async (
  ctx: Context,
  id: string,
  companyId: string,
): Promise<string> => {
  // Get existing data
  const applicant = await ApplicantDatabase.findOne({
    where: { id, companyId },
  });

  // Delete the data, if exists
  if (applicant) {
    // Return which ID is deleted
    await applicant?.destroy();
    return id;
  }

  // Return 0 affected rows
  return '0';
};
