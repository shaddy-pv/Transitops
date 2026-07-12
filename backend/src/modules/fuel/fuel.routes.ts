import { Router } from 'express';
import { FuelController } from './fuel.controller';
import { authenticate, authorize } from '../../middlewares/auth';
import { validate } from '../../middlewares/validate';
import { createFuelSchema, updateFuelSchema } from './fuel.schema';
import { SystemRoles } from '../../constants/roles';
import { upload } from '../../middlewares/upload';

const router = Router();
const fuelController = new FuelController();

router.use(authenticate);

/**
 * @swagger
 * /fuel:
 *   get:
 *     summary: Get all fuel records
 *     tags: [Fuel]
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
 *         name: driver
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', authorize(SystemRoles.ADMIN, SystemRoles.FLEET_MANAGER, SystemRoles.READ_ONLY), fuelController.getAllFuelRecords);

/**
 * @swagger
 * /fuel/{id}:
 *   get:
 *     summary: Get fuel record by ID
 *     tags: [Fuel]
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
router.get('/:id', authorize(SystemRoles.ADMIN, SystemRoles.FLEET_MANAGER, SystemRoles.READ_ONLY), fuelController.getFuelRecordById);

/**
 * @swagger
 * /fuel:
 *   post:
 *     summary: Create new fuel record
 *     tags: [Fuel]
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
 *               driver:
 *                 type: string
 *               date:
 *                 type: string
 *               liters:
 *                 type: number
 *               cost:
 *                 type: number
 *               odometerReading:
 *                 type: number
 *               fuelStation:
 *                 type: string
 *               notes:
 *                 type: string
 *               invoiceUpload:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Created
 */
router.post(
  '/',
  authorize(SystemRoles.ADMIN, SystemRoles.FLEET_MANAGER, SystemRoles.DRIVER_MANAGER),
  upload.single('invoiceUpload'),
  validate(createFuelSchema),
  fuelController.createFuelRecord
);

/**
 * @swagger
 * /fuel/{id}:
 *   put:
 *     summary: Update fuel record
 *     tags: [Fuel]
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
  validate(updateFuelSchema),
  fuelController.updateFuelRecord
);

/**
 * @swagger
 * /fuel/{id}:
 *   delete:
 *     summary: Delete fuel record
 *     tags: [Fuel]
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
router.delete('/:id', authorize(SystemRoles.ADMIN, SystemRoles.FLEET_MANAGER), fuelController.deleteFuelRecord);

export default router;
