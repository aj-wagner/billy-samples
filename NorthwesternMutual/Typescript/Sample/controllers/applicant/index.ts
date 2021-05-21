import { Context } from 'koa';
import * as applicantUsecase from '../../usecase/applicant';
import jsonResponse from '../../helpers/response';
import HttpStatus from 'http-status-codes';
import { InsertDatabase } from '../../@types/applicant';

export const insertDatabaseCtrl = async (ctx: Context): Promise<void> => {
  const body: InsertDatabase = ctx.request.body;
  const result = await applicantUsecase.addApplicantDatabase(ctx, body);

  return jsonResponse(ctx, { insertId: result }, HttpStatus.CREATED);
};

export const getByIdDatabaseCtrl = async (ctx: Context): Promise<void> => {
  const id: string = ctx.params.id;
  const result = await applicantUsecase.getDatabaseApplicantById(ctx, id);

  return jsonResponse(ctx, { data: result });
};

export const getAllDatabaseCtrl = async (ctx: Context): Promise<void> => {
  const result = await applicantUsecase.getAllDatabaseApplicant(ctx);

  return jsonResponse(ctx, { data: result });
};

export const deleteByIdCtrl = async (ctx: Context): Promise<void> => {
  const id: string = ctx.params.id;
  const result = await applicantUsecase.deleteDatabaseApplicantById(ctx, id);

  return jsonResponse(ctx, { deletedId: result });
};

export const getAllApplicantGeneralInfo = async (
  ctx: Context,
): Promise<void> => {
  const result = await applicantUsecase.getAllApplicantGeneralInfo(ctx);

  return jsonResponse(ctx, { data: result });
};
