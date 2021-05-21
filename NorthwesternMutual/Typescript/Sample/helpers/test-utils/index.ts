import { createMockContext } from '@shopify/jest-koa-mocks';
import Koa, { Context, Middleware } from 'koa';
import * as middleware from '../../middlewares/verifyToken';
import request from 'supertest';

// Mock verify token
jest.mock('../../middlewares/verifyToken');

export const ctxFactory = (companyId = 'abcd', userId = 'efgh'): Context => {
  return createMockContext({
    state: {
      user: {
        companyId,
        userId,
      },
    },
  });
};

export const makeRouterApp = (
  router: Middleware,
): Koa<Koa.DefaultState, Koa.DefaultContext> => {
  const app = new Koa();
  app.use(router);
  return app;
};

export const serveTest = (app: Koa): request.SuperTest<request.Test> => {
  return request(app.callback());
};

export const mockVerifyToken = (): jest.SpyInstance => {
  return jest
    .spyOn(middleware, 'verifyToken')
    .mockImplementation(async (ctx, next) => {
      return next();
    });
};
