import Router from 'koa-joi-router';
import { authorizeCtrl } from '../controllers/authorize';
const { Joi } = Router;

const router = Router();

// Authorize
router.route({
  method: 'post',
  path: '/authorize',
  validate: {
    type: 'json',
    body: {
      username: Joi.string().email().required(),
      password: Joi.string().required(),
      rememberMe: Joi.string().optional(),
    },
  },
  handler: authorizeCtrl,
});

export default router.middleware();
