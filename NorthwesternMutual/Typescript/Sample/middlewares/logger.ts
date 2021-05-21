import { Context } from 'koa';

export const requestLogger = (ctx: Context): object => {
  const logRequest = {
    path: ctx.request.originalUrl,
    method: ctx.request.method,
    headers: ctx.headers,
    body: ctx.request.body,
    host: ctx.request.hostname,
    ip: ctx.request.ip,
  };

  return logRequest;
};

export const responseLogger = (ctx: Context): object => {
  const logResponse = {
    'status-code': ctx.response.status,
    user: ctx.state.user,
    headers: ctx.response.headers,
    time: ctx.latency,
  };

  return logResponse;
};
