import { Context } from 'koa';
import Email from '../../models/email';
import { AppError, errorParser } from '../../middlewares/error';
import { EMAIL_ERROR, DOMAIN_DB } from '../../helpers/constants';
import ApplicantDatabase from '../../models/applicantDatabase';
import UserDatabase from '../../models/account';

export const insert = async (
  ctx: Context,
  name: string,
  databaseId: string,
  subject: string,
  content: object,
): Promise<Email> => {
  const { userId, companyId } = ctx.state.user;

  try {
    return await Email.create({
      name,
      subject,
      userId,
      companyId,
      databaseId,
      content,
    });
  } catch (e) {
    throw new AppError(
      errorParser(EMAIL_ERROR, 'insert', DOMAIN_DB, e.message),
    );
  }
};

export const getById = async (
  ctx: Context,
  id: string,
): Promise<Email | null> => {
  const { companyId } = ctx.state.user;

  return await Email.findOne({
    where: { id, companyId },
    attributes: {
      exclude: [
        'databaseId',
        'userId',
        'companyId',
        'createdAt',
        'updatedAt',
        'deletedAt',
      ],
    },
    include: [ApplicantDatabase, UserDatabase],
  }).catch((e: Error) => {
    throw new AppError(
      errorParser(EMAIL_ERROR, 'getById', DOMAIN_DB, e.message),
    );
  });
};

export const getByName = async (
  ctx: Context,
  name: string,
): Promise<Email | null> => {
  try {
    const { companyId } = ctx.state.user;

    return await Email.findOne({ where: { name, companyId } });
  } catch (e) {
    throw new AppError(
      errorParser(EMAIL_ERROR, 'getByName', DOMAIN_DB, e.message),
    );
  }
};

export const getAll = async (companyId: string): Promise<Email[]> => {
  return await Email.findAll({
    where: {
      companyId,
    },
    attributes: {
      exclude: [
        'databaseId',
        'userId',
        'companyId',
        'createdAt',
        'updatedAt',
        'deletedAt',
      ],
    },
    include: [ApplicantDatabase, UserDatabase],
  }).catch((e: Error) => {
    throw new AppError(
      errorParser(EMAIL_ERROR, 'getAll', DOMAIN_DB, e.message),
    );
  });
};

export const updateById = async (
  ctx: Context,
  emailTemplateId: string,
  name: string,
  databaseId: string,
  subject: string,
  content: object,
): Promise<[number, Email[]]> => {
  const { userId, companyId } = ctx.state.user;

  try {
    return await Email.update(
      {
        name,
        subject,
        userId,
        companyId,
        databaseId,
        content,
      },
      {
        where: { id: emailTemplateId, companyId },
      },
    );
  } catch (e) {
    throw new AppError(
      errorParser(EMAIL_ERROR, 'updateById', DOMAIN_DB, e.message),
    );
  }
};

export const deleteEmail = async (
  ctx: Context,
  email: Email,
): Promise<void> => {
  try {
    return await email.destroy();
  } catch (e) {
    throw new AppError(
      errorParser(EMAIL_ERROR, 'deleteEmail', DOMAIN_DB, e.message),
    );
  }
};
