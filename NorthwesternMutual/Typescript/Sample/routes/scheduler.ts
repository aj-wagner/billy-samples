import Router from 'koa-joi-router';

import { verifyToken } from '../middlewares/verifyToken';
import {
  getSchedulerIdCtrl,
  getSchedulersCtrl,
  newSchedulerCtrl,
} from '../controllers/scheduler';

const router = Router();

// Scheduler
const schedulerPath = '/scheduler';
router.get(schedulerPath, verifyToken, getSchedulersCtrl);
router.post(schedulerPath, verifyToken, newSchedulerCtrl);
router.get(schedulerPath + '/:id', verifyToken, getSchedulerIdCtrl);

export default router.middleware();
