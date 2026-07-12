import { Router } from 'express';
import { MaintenanceController } from './maintenance.controller';
import { authenticate, authorize } from '../../middlewares/auth';
import { validate } from '../../middlewares/validate';
import { createMaintenanceSchema, updateMaintenanceSchema } from './maintenance.schema';
import { SystemRoles } from '../../constants/roles';
import { upload } from '../../middlewares/upload';

const router = Router();
const maintenanceController = new MaintenanceController();

router.use(authenticate);

/**
 * @swagger
 * /maintenance:
 *   get:
 *     summary: Get all maintenance records
 *     tags: [Maintenance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: vehicle
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', authorize(SystemRoles.ADMIN, SystemRoles.FLEET_MANAGER, SystemRoles.READ_ONLY), maintenanceController.getAllMaintenanceRecords);

/**
 * @swagger
 * /maintenance/{id}:
 *   get:
 *     summary: Get maintenance record by ID
 *     tags: [Maintenance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/:id', authorize(SystemRoles.ADMIN, SystemRoles.FLEET_MANAGER, SystemRoles.READ_ONLY), maintenanceController.getMaintenanceById);

/**
 * @swagger
 * /maintenance:
 *   post:
 *     summary: Create new maintenance record
 *     tags: [Maintenance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               vehicle:
 *                 type: string
 *               serviceType:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *               cost:
 *                 type: number
 *               provider:
 *                 type: string
 *               status:
 *                 type: string
 *               odometerReading:
 *                 type: number
 *               invoiceUpload:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Created
 */
router.post(
  '/',
  authorize(SystemRoles.ADMIN, SystemRoles.FLEET_MANAGER),
  upload.single('invoiceUpload'),
  validate(createMaintenanceSchema),
  maintenanceController.createMaintenance
);

/**
 * @swagger
 * /maintenance/{id}:
 *   put:
 *     summary: Update maintenance record
 *     tags: [Maintenance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               invoiceUpload:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Updated
 */
router.put(
  '/:id',
  authorize(SystemRoles.ADMIN, SystemRoles.FLEET_MANAGER),
  upload.single('invoiceUpload'),
  validate(updateMaintenanceSchema),
  maintenanceController.updateMaintenance
);

/**
 * @swagger
 * /maintenance/{id}:
 *   delete:
 *     summary: Delete maintenance record
 *     tags: [Maintenance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 */
router.delete('/:id', authorize(SystemRoles.ADMIN, SystemRoles.FLEET_MANAGER), maintenanceController.deleteMaintenance);

export default router;
