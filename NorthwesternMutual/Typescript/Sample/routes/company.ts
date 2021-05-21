import Router from 'koa-joi-router';
import {
  insertNewCompanyController,
  getAllCompanies,
} from '../controllers/company';
const { Joi } = Router;

const router = Router();

// Company
const companyPath = '/company';
router.route({
  method: 'post',
  path: companyPath,
  validate: {
    type: 'json',
    body: {
      companyName: Joi.string().required(),
    },
  },
  handler: insertNewCompanyController,
});
router.get(companyPath, getAllCompanies);

export default router.middleware();
