import {
  createPipeline,
  getPipelineById,
  getAllPipelines,
  deletePipeline,
  updatePipeline,
} from '../../usecase/pipeline';
import jsonResponse from '../../helpers/response';
import HttpStatus from 'http-status-codes';
import { Context } from 'koa';

export const newPipelineCtrl = async (ctx: Context): Promise<void> => {
  const payload: PipelineBody = ctx.request.body;

  const resultId = await createPipeline(
    payload.name,
    payload.description,
    payload.isRunning,
    ctx.state.user,
    payload.data,
  );

  return jsonResponse(
    ctx,
    {
      insertId: resultId,
    },
    HttpStatus.CREATED,
  );
};

export const getPipelineByIdCtrl = async (ctx: Context): Promise<void> => {
  const id: string = ctx.params.id;
  const result = await getPipelineById(id, ctx.state.user);

  return jsonResponse(ctx, {
    data: result,
  });
};

export const getPipelinesCtrl = async (ctx: Context): Promise<void> => {
  const result = await getAllPipelines(ctx.state.user);
  return jsonResponse(ctx, {
    data: result,
  });
};

export const deletePipelineCtrl = async (ctx: Context): Promise<void> => {
  const id: string = ctx.params.id;
  await deletePipeline(id, ctx.state.user);
  return jsonResponse(ctx, null, HttpStatus.NO_CONTENT);
};

export const updatePipelineCtrl = async (ctx: Context): Promise<void> => {
  const id: string = ctx.params.id;
  const payload: PipelineBody = ctx.request.body;

  const resultId = await updatePipeline(
    id,
    payload.name,
    payload.description,
    payload.isRunning,
    ctx.state.user,
    payload.data,
  );

  return jsonResponse(
    ctx,
    {
      insertId: resultId,
    },
    HttpStatus.CREATED,
  );
};
