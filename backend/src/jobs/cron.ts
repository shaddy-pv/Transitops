import cron from 'node-cron';
import { Vehicle } from '../shared/models/Vehicle';
import { Driver } from '../shared/models/Driver';
import { RefreshToken } from '../shared/models/RefreshToken';
import { NotificationService } from '../modules/notifications/notification.service';
import { SystemRoles } from '../constants/roles';
import { logger } from '../middlewares/logger';

const notificationService = new NotificationService();

export const initCronJobs = () => {
  // Run daily at midnight to check for expiring insurances and registrations
  cron.schedule('0 0 * * *', async () => {
    logger.info('Running daily maintenance cron job...');
    const today = new Date();
    const thirtyDaysFromNow = new Date(today);
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    try {
      // Check vehicles expiring within 30 days
      const vehicles = await Vehicle.find({
        $or: [
          { insuranceExpiry: { $lte: thirtyDaysFromNow, $gt: today } },
          { registrationExpiry: { $lte: thirtyDaysFromNow, $gt: today } },
        ],
      });

      for (const vehicle of vehicles) {
        await notificationService.createNotification({
          role: SystemRoles.FLEET_MANAGER,
          title: 'Document Expiry Warning',
          message: `Vehicle ${vehicle.registrationNumber} has documents expiring soon.`,
          type: 'Warning',
          link: `/vehicles/${vehicle._id}`,
        });
      }

      // Check drivers with expiring licenses
      const drivers = await Driver.find({
        licenseExpiry: { $lte: thirtyDaysFromNow, $gt: today },
      });

      for (const driver of drivers) {
        await notificationService.createNotification({
          role: SystemRoles.DRIVER_MANAGER,
          title: 'License Expiry Warning',
          message: `Driver ${driver.firstName} ${driver.lastName}'s license is expiring soon.`,
          type: 'Warning',
          link: `/drivers/${driver._id}`,
        });
      }

      // Cleanup expired refresh tokens
      await RefreshToken.deleteMany({
        expires: { $lt: today },
      });
      logger.info('Cleaned up expired refresh tokens.');

    } catch (error) {
      logger.error('Error running daily cron job: ' + error);
    }
  });

  logger.info('Cron jobs initialized');
};
