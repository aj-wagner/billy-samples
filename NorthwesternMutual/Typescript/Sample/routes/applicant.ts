import Router from 'koa-joi-router';
import * as applicantCtrl from '../controllers/applicant';
import * as personCtrl from '../controllers/applicant/Person';
import { getAllKeysCtrl } from '../controllers/applicant/Key';
import { verifyToken } from '../middlewares/verifyToken';
const { Joi } = Router;

const router = Router();
const databaseRoute = '/database';
export const applicantRoute = '/applicant';
export const applicantAllRoute = '/applicants';

// Get list of applicants general info
router.get(
  applicantAllRoute,
  verifyToken,
  applicantCtrl.getAllApplicantGeneralInfo,
);

// Get applicant detail
router.get(`${applicantRoute}/:id`, verifyToken, personCtrl.getApplicant);

// Insert applicant person
router.route({
  method: 'post',
  path: applicantRoute,
  validate: {
    type: 'json',
    body: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required(),
    },
  },
  pre: verifyToken,
  handler: personCtrl.insert,
});

// Link person to specific database
router.route({
  method: 'post',
  path: `${applicantRoute}/link`,
  validate: {
    type: 'json',
    body: {
      databaseId: Joi.string().required(),
      candidateId: Joi.string().required(),
      values: Joi.object(),
    },
  },
  pre: verifyToken,
  handler: personCtrl.linkToDatabase,
});

// Insert applicant database
router.route({
  method: 'post',
  path: databaseRoute,
  validate: {
    type: 'json',
    body: {
      name: Joi.string().required(),
      fields: Joi.array().items(
        Joi.object({
          key: Joi.string().required(),
          label: Joi.string().required(),
        }),
      ),
    },
  },
  pre: verifyToken,
  handler: applicantCtrl.insertDatabaseCtrl,
});

// Get database applicant by ID
router.get(
  `${databaseRoute}/:id`,
  verifyToken,
  applicantCtrl.getByIdDatabaseCtrl,
);

// Get list of applicants
router.get(databaseRoute, verifyToken, applicantCtrl.getAllDatabaseCtrl);

// Delete applicant by id
router.delete(
  `${databaseRoute}/:id`,
  verifyToken,
  applicantCtrl.deleteByIdCtrl,
);

// Get all field keys
router.get(`${databaseRoute}/item/keys`, verifyToken, getAllKeysCtrl);

export default router.middleware();
