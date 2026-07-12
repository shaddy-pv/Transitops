import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import userRoutes from '../modules/users/user.routes';
import vehicleRoutes from '../modules/vehicles/vehicle.routes';
import driverRoutes from '../modules/drivers/driver.routes';
import tripRoutes from '../modules/trips/trip.routes';
import maintenanceRoutes from '../modules/maintenance/maintenance.routes';
import fuelRoutes from '../modules/fuel/fuel.routes';
import expenseRoutes from '../modules/expenses/expense.routes';
import dashboardRoutes from '../modules/dashboard/dashboard.routes';
import notificationRoutes from '../modules/notifications/notification.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/vehicles', vehicleRoutes);
router.use('/drivers', driverRoutes);
router.use('/trips', tripRoutes);
router.use('/maintenance', maintenanceRoutes);
router.use('/fuel', fuelRoutes);
router.use('/expenses', expenseRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/notifications', notificationRoutes);

export default router;
