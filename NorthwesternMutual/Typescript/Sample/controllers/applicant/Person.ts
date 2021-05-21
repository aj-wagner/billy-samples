import { Context } from 'koa';
import * as usecase from '../../usecase/applicant/Person';
import jsonResponse from '../../helpers/response';
import HttpStatus from 'http-status-codes';
import {
  InsertPerson,
  LinkPersonToSpecificDatabase,
} from '../../@types/applicant';

export const insert = async (ctx: Context): Promise<void> => {
  const body: InsertPerson = ctx.request.body;
  const result = await usecase.insert(ctx, body);
  return jsonResponse(ctx, { insertId: result }, HttpStatus.CREATED);
};

export const linkToDatabase = async (ctx: Context): Promise<void> => {
  const body: LinkPersonToSpecificDatabase = ctx.request.body;
  const result = await usecase.linkToDatabase(ctx, body);

  return jsonResponse(ctx, { insertId: result });
};

export const getApplicant = async (ctx: Context): Promise<void> => {
  const id: string = ctx.params.id;
  const result = await usecase.getPerson(ctx, id);

  return jsonResponse(ctx, { data: result });
};
