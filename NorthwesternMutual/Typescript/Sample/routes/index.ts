import Router from 'koa-joi-router';

// JSON response parser
import jsonResponse from '../helpers/response';
import { Context } from 'koa';

const router = Router();

// Healthcheck
router.get('/', (ctx: Context) => {
  jsonResponse(ctx, 'OK');
});

export default router.middleware();
