import { Context } from 'koa';
import { FormBody } from '../../@types/form';
import {
  createForm,
  getFormById,
  getAllForms,
  updateFormById,
} from '../../usecase/form';
import jsonResponse from '../../helpers/response';
import HttpStatus from 'http-status-codes';

export const newFormCtrl = async (ctx: Context): Promise<void> => {
  const payload: FormBody = ctx.request.body;
  const result: string = await createForm(ctx, payload);

  return jsonResponse(
    ctx,
    {
      insertId: result,
    },
    HttpStatus.CREATED,
  );
};

export const getFormIdCtrl = async (ctx: Context): Promise<void> => {
  const formId: string = ctx.params.id;
  const result = await getFormById(formId, ctx.state.user);

  return jsonResponse(ctx, {
    data: result,
  });
};

export const getFormsCtrl = async (ctx: Context): Promise<void> => {
  const result = await getAllForms(ctx.state.user);

  return jsonResponse(ctx, { data: result });
};

export const updateFormIdCtrl = async (ctx: Context): Promise<void> => {
  const formId: string = ctx.params.id;
  const payload: FormBody = ctx.request.body;

  const result = await updateFormById(ctx, formId, payload);

  return jsonResponse(ctx, { updatedRows: result });
};
