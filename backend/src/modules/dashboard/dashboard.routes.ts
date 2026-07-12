import { Router } from 'express';
import { DashboardController } from './dashboard.controller';
import { authenticate } from '../../middlewares/auth';

const router = Router();
const dashboardController = new DashboardController();

router.use(authenticate);

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Get dashboard statistics and recent activity
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', dashboardController.getDashboardStats);

export default router;
