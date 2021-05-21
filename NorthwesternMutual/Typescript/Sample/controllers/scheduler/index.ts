import { Context } from 'koa';
import {
  createScheduler,
  getSchedulerById,
  getAllSchedulers,
} from '../../usecase/scheduler';
import { SchedulerBody } from './types';
import { AppError } from '../../middlewares/error';
import jsonResponse from '../../helpers/response';
import HttpStatus from 'http-status-codes';

export const newSchedulerCtrl = async (ctx: Context): Promise<void> => {
  const payload: SchedulerBody = ctx.request.body;
  if (!payload.name) {
    throw new AppError('Bad request', 400);
  }

  const result = await createScheduler(payload.name, ctx.state.user);

  return jsonResponse(
    ctx,
    {
      insertId: result.id,
    },
    HttpStatus.CREATED,
  );
};

export const getSchedulerIdCtrl = async (ctx: Context): Promise<void> => {
  const id: string = ctx.params.id;
  const result = await getSchedulerById(id, ctx.state.user);

  return jsonResponse(ctx, {
    data: result,
  });
};

export const getSchedulersCtrl = async (ctx: Context): Promise<void> => {
  const result = await getAllSchedulers(ctx.state.user);

  return jsonResponse(ctx, {
    data: result,
  });
};
