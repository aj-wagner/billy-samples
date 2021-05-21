import Router from 'koa-joi-router';
import {
  getFormsCtrl,
  newFormCtrl,
  getFormIdCtrl,
  updateFormIdCtrl,
} from '../controllers/form';
import { verifyToken } from '../middlewares/verifyToken';
const { Joi } = Router;

const router = Router();
export const formPath = '/form';

// Body Form
const BodyForm = {
  name: Joi.string().required(),
  formData: Joi.array().items(Joi.object()),
};

// Get all forms
router.get(formPath, verifyToken, getFormsCtrl);

// Insert form
router.route({
  method: 'post',
  path: formPath,
  validate: {
    type: 'json',
    body: BodyForm,
  },
  pre: verifyToken,
  handler: newFormCtrl,
});

// Get form by ID
router.get(formPath + '/:id', verifyToken, getFormIdCtrl);

// Update form
router.route({
  method: 'patch',
  path: formPath + '/:id',
  validate: {
    type: 'json',
    body: BodyForm,
  },
  pre: verifyToken,
  handler: updateFormIdCtrl,
});

export default router.middleware();
