import Router from 'koa-joi-router';
import { registerController, getDetailCtrl } from '../controllers/accounts';
import { verifyToken } from '../middlewares/verifyToken';

const router = Router();

// Accounts
router.post('/register', registerController);
router.get('/account/detail', verifyToken, getDetailCtrl);

export default router.middleware();
