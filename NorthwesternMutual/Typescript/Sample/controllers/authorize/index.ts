import { Context } from 'koa';
import { AuthorizeBody } from './types';
import { authorize } from '../../usecase/authorize';
import jsonResponse from '../../helpers/response';

export const authorizeCtrl = async (ctx: Context) => {
  const body: AuthorizeBody = ctx.request.body;
  const token = await authorize(body.username, body.password, true);

  // Set the cookie to browser
  ctx.cookies.set('Piper_UUID', token, {
    httpOnly: true,
    domain: 'hirewithpiper.com',
  });

  return jsonResponse(ctx, null);
};
