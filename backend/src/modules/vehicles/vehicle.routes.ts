import { Router } from 'express';
import { VehicleController } from './vehicle.controller';
import { authenticate, authorize } from '../../middlewares/auth';
import { validate } from '../../middlewares/validate';
import { createVehicleSchema, updateVehicleSchema } from './vehicle.schema';
import { SystemRoles } from '../../constants/roles';
import { upload } from '../../middlewares/upload';

const router = Router();
const vehicleController = new VehicleController();

router.use(authenticate);

/**
 * @swagger
 * /vehicles:
 *   get:
 *     summary: Get all vehicles
 *     tags: [Vehicles]
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
router.get('/', authorize(SystemRoles.ADMIN, SystemRoles.FLEET_MANAGER, SystemRoles.READ_ONLY), vehicleController.getAllVehicles);

/**
 * @swagger
 * /vehicles/{id}:
 *   get:
 *     summary: Get vehicle by ID
 *     tags: [Vehicles]
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
router.get('/:id', authorize(SystemRoles.ADMIN, SystemRoles.FLEET_MANAGER, SystemRoles.READ_ONLY), vehicleController.getVehicleById);

/**
 * @swagger
 * /vehicles:
 *   post:
 *     summary: Create new vehicle
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               registrationNumber:
 *                 type: string
 *               vehicleName:
 *                 type: string
 *               vehicleType:
 *                 type: string
 *               vin:
 *                 type: string
 *               manufacturer:
 *                 type: string
 *               year:
 *                 type: number
 *               capacity:
 *                 type: number
 *               odometer:
 *                 type: number
 *               fuelType:
 *                 type: string
 *               insuranceExpiry:
 *                 type: string
 *               registrationExpiry:
 *                 type: string
 *               purchaseDate:
 *                 type: string
 *               purchaseCost:
 *                 type: number
 *               vehicleImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Created
 */
router.post(
  '/',
  authorize(SystemRoles.ADMIN, SystemRoles.FLEET_MANAGER),
  upload.single('vehicleImage'),
  validate(createVehicleSchema),
  vehicleController.createVehicle
);

/**
 * @swagger
 * /vehicles/{id}:
 *   put:
 *     summary: Update vehicle
 *     tags: [Vehicles]
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
 *               vehicleImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Updated
 */
router.put(
  '/:id',
  authorize(SystemRoles.ADMIN, SystemRoles.FLEET_MANAGER),
  upload.single('vehicleImage'),
  validate(updateVehicleSchema),
  vehicleController.updateVehicle
);

/**
 * @swagger
 * /vehicles/{id}:
 *   delete:
 *     summary: Delete vehicle
 *     tags: [Vehicles]
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
router.delete('/:id', authorize(SystemRoles.ADMIN), vehicleController.deleteVehicle);

export default router;
