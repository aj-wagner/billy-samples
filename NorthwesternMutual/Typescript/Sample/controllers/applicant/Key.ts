import { Context } from 'koa';
import { getAllKeys } from '../../usecase/applicant/Key';
import jsonResponse from '../../helpers/response';

export const getAllKeysCtrl = async (ctx: Context): Promise<void> => {
  const result = await getAllKeys(ctx);

  return jsonResponse(ctx, { data: result });
};
