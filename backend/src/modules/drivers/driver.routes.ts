import { Router } from 'express';
import { DriverController } from './driver.controller';
import { authenticate, authorize } from '../../middlewares/auth';
import { validate } from '../../middlewares/validate';
import { createDriverSchema, updateDriverSchema } from './driver.schema';
import { SystemRoles } from '../../constants/roles';
import { upload } from '../../middlewares/upload';

const router = Router();
const driverController = new DriverController();

router.use(authenticate);

/**
 * @swagger
 * /drivers:
 *   get:
 *     summary: Get all drivers
 *     tags: [Drivers]
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
 *         name: search
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
router.get('/', authorize(SystemRoles.ADMIN, SystemRoles.DRIVER_MANAGER, SystemRoles.READ_ONLY), driverController.getAllDrivers);

/**
 * @swagger
 * /drivers/{id}:
 *   get:
 *     summary: Get driver by ID
 *     tags: [Drivers]
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
router.get('/:id', authorize(SystemRoles.ADMIN, SystemRoles.DRIVER_MANAGER, SystemRoles.READ_ONLY), driverController.getDriverById);

/**
 * @swagger
 * /drivers:
 *   post:
 *     summary: Create new driver
 *     tags: [Drivers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               licenseNumber:
 *                 type: string
 *               licenseExpiry:
 *                 type: string
 *               licenseClass:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *               contactNumber:
 *                 type: string
 *               address:
 *                 type: string
 *               status:
 *                 type: string
 *               hireDate:
 *                 type: string
 *               bloodGroup:
 *                 type: string
 *               medicalClearanceExpiry:
 *                 type: string
 *               driverImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Created
 */
router.post(
  '/',
  authorize(SystemRoles.ADMIN, SystemRoles.DRIVER_MANAGER),
  upload.single('driverImage'),
  validate(createDriverSchema),
  driverController.createDriver
);

/**
 * @swagger
 * /drivers/{id}:
 *   put:
 *     summary: Update driver
 *     tags: [Drivers]
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
 *               driverImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Updated
 */
router.put(
  '/:id',
  authorize(SystemRoles.ADMIN, SystemRoles.DRIVER_MANAGER),
  upload.single('driverImage'),
  validate(updateDriverSchema),
  driverController.updateDriver
);

/**
 * @swagger
 * /drivers/{id}:
 *   delete:
 *     summary: Delete driver
 *     tags: [Drivers]
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
router.delete('/:id', authorize(SystemRoles.ADMIN), driverController.deleteDriver);

export default router;
