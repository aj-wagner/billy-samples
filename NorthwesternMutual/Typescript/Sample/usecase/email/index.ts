import { Context } from 'koa';
import * as dbEmail from '../../database/email';
import * as dbApplicant from '../../database/applicantDatabase';
import Email from '../../models/email';
import { AppError } from '../../middlewares/error';
import HttpStatus from 'http-status-codes';

export const createEmailTemplate = async (
  ctx: Context,
  data: EmailTemplateBody,
): Promise<string> => {
  // Return error if template name has been used before
  const usedName = await dbEmail.getByName(ctx, data.emailName);
  if (usedName) {
    throw new AppError(
      'Name has been used. Please change name',
      HttpStatus.BAD_REQUEST,
    );
  }

  // Return error if DB ID does not exists
  const exists = await dbApplicant.getById(ctx, data.databaseRefId);
  if (!exists) {
    throw new AppError('Referred database not found', HttpStatus.BAD_REQUEST);
  }

  const result = await dbEmail.insert(
    ctx,
    data.emailName,
    data.databaseRefId,
    data.emailSubject,
    data.emailContent,
  );

  return result.id;
};

export const getEmailTemplateById = async (
  ctx: Context,
  id: string,
): Promise<Email | null> => {
  return await dbEmail.getById(ctx, id);
};

export const getEmailTemplates = async (token: Token): Promise<Email[]> => {
  return await dbEmail.getAll(token.companyId);
};

export const updateEmailTemplateById = async (
  ctx: Context,
  id: string,
  data: EmailTemplateBody,
): Promise<number> => {
  // Return error if DB ID does not exists
  const exists = await dbApplicant.getById(ctx, data.databaseRefId);
  if (!exists) {
    throw new AppError('Referred database not found', HttpStatus.BAD_REQUEST);
  }

  const result = await dbEmail.updateById(
    ctx,
    id,
    data.emailName,
    data.databaseRefId,
    data.emailSubject,
    data.emailContent,
  );

  return result[0];
};

export const deleteEmailTemplate = async (
  ctx: Context,
  id: string,
): Promise<string> => {
  const email = await dbEmail.getById(ctx, id);

  if (!email) {
    return '0';
  }

  // Delete and return deleted ID
  await dbEmail.deleteEmail(ctx, email);
  return email.id;
};
