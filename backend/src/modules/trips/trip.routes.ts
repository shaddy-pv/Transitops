import { Router } from 'express';
import { TripController } from './trip.controller';
import { authenticate, authorize } from '../../middlewares/auth';
import { validate } from '../../middlewares/validate';
import { createTripSchema, updateTripSchema } from './trip.schema';
import { SystemRoles } from '../../constants/roles';

const router = Router();
const tripController = new TripController();

router.use(authenticate);

/**
 * @swagger
 * /trips:
 *   get:
 *     summary: Get all trips
 *     tags: [Trips]
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
 *       - in: query
 *         name: driver
 *         schema:
 *           type: string
 *       - in: query
 *         name: vehicle
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', tripController.getAllTrips);

/**
 * @swagger
 * /trips/{id}:
 *   get:
 *     summary: Get trip by ID
 *     tags: [Trips]
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
router.get('/:id', tripController.getTripById);

/**
 * @swagger
 * /trips:
 *   post:
 *     summary: Create new trip
 *     tags: [Trips]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tripId:
 *                 type: string
 *               vehicle:
 *                 type: string
 *               driver:
 *                 type: string
 *               startLocation:
 *                 type: string
 *               endLocation:
 *                 type: string
 *               distance:
 *                 type: number
 *               status:
 *                 type: string
 *               scheduledDeparture:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post(
  '/',
  authorize(SystemRoles.ADMIN, SystemRoles.FLEET_MANAGER, SystemRoles.DRIVER_MANAGER),
  validate(createTripSchema),
  tripController.createTrip
);

/**
 * @swagger
 * /trips/{id}:
 *   put:
 *     summary: Update trip
 *     tags: [Trips]
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               actualDeparture:
 *                 type: string
 *               actualArrival:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated
 */
router.put(
  '/:id',
  authorize(SystemRoles.ADMIN, SystemRoles.FLEET_MANAGER, SystemRoles.DRIVER_MANAGER),
  validate(updateTripSchema),
  tripController.updateTrip
);

/**
 * @swagger
 * /trips/{id}:
 *   delete:
 *     summary: Delete trip
 *     tags: [Trips]
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
router.delete('/:id', authorize(SystemRoles.ADMIN), tripController.deleteTrip);

export default router;
