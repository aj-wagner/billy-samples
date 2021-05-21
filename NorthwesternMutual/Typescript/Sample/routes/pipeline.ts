import Router from 'koa-joi-router';
import { verifyToken } from '../middlewares/verifyToken';
import {
  getPipelineByIdCtrl,
  getPipelinesCtrl,
  newPipelineCtrl,
  deletePipelineCtrl,
  updatePipelineCtrl,
} from '../controllers/pipeline';

const router = Router();

// Pipeline
const pipelinePath = '/pipeline';
router.get(pipelinePath, verifyToken, getPipelinesCtrl);
router.get(pipelinePath + '/:id', verifyToken, getPipelineByIdCtrl);
router.post(pipelinePath, verifyToken, newPipelineCtrl);
router.delete(pipelinePath + '/:id', verifyToken, deletePipelineCtrl);
router.patch(pipelinePath + '/:id', verifyToken, updatePipelineCtrl);

export default router.middleware();
