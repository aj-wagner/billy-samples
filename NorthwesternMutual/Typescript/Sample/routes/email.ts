import Router from 'koa-joi-router';
import { verifyToken } from '../middlewares/verifyToken';
import * as ctrl from '../controllers/email';
const { Joi } = Router;

const router = Router();

// Email template
export const emailTemplatePath = '/email-template';

router.get(emailTemplatePath, verifyToken, ctrl.getEmailTemplates);
router.get(emailTemplatePath + '/:id', verifyToken, ctrl.getEmailTemplateId);
router.delete(
  `${emailTemplatePath}/:id`,
  verifyToken,
  ctrl.deleteEmailTemplate,
);

// Insert email template
router.route({
  method: 'post',
  path: emailTemplatePath,
  validate: {
    type: 'json',
    body: {
      emailName: Joi.string().required(),
      databaseRefId: Joi.string().required(),
      emailSubject: Joi.string().required(),
      emailContent: Joi.object().required(),
    },
  },
  pre: verifyToken,
  handler: ctrl.createEmailTemplate,
});

// Update email template
router.route({
  method: 'patch',
  path: `${emailTemplatePath}/:id`,
  validate: {
    type: 'json',
    body: {
      emailName: Joi.string().required(),
      databaseRefId: Joi.string().required(),
      emailSubject: Joi.string().required(),
      emailContent: Joi.object().required(),
    },
  },
  pre: verifyToken,
  handler: ctrl.updateEmailTemplate,
});

export default router.middleware();
