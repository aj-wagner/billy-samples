import { Context } from 'koa';
import HttpStatus from 'http-status-codes';

const jsonResponse = (
  ctx: Context,
  data: unknown,
  code: number = HttpStatus.OK,
): void => {
  ctx.status = code;
  ctx.body = data;
};

export default jsonResponse;
