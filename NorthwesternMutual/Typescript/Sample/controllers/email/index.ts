import { Context } from 'koa';
import * as usecase from '../../usecase/email';
import { EmailTemplateBody } from './types';
import jsonResponse from '../../helpers/response';
import HttpStatus from 'http-status-codes';

export const createEmailTemplate = async (ctx: Context): Promise<void> => {
  const payload: EmailTemplateBody = ctx.request.body;

  const result = await usecase.createEmailTemplate(ctx, payload);

  return jsonResponse(
    ctx,
    {
      insertId: result,
    },
    HttpStatus.CREATED,
  );
};

export const getEmailTemplateId = async (ctx: Context): Promise<void> => {
  const id: string = ctx.params.id;
  const result = await usecase.getEmailTemplateById(ctx, id);

  return jsonResponse(ctx, {
    data: result,
  });
};

export const getEmailTemplates = async (ctx: Context): Promise<void> => {
  const result = await usecase.getEmailTemplates(ctx.state.user);

  return jsonResponse(ctx, {
    data: result,
  });
};

export const updateEmailTemplate = async (ctx: Context): Promise<void> => {
  const id = ctx.params.id;
  const payload: EmailTemplateBody = ctx.request.body;
  const result = await usecase.updateEmailTemplateById(ctx, id, payload);

  return jsonResponse(ctx, {
    updatedRows: result,
  });
};

export const deleteEmailTemplate = async (ctx: Context): Promise<void> => {
  const id = ctx.params.id;
  const result = await usecase.deleteEmailTemplate(ctx, id);

  return jsonResponse(ctx, {
    deletedRow: result,
  });
};
