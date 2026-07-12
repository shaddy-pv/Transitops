import { Notification } from '../../shared/models/Notification';
import { getIO } from '../../config/socket';
import { AppError } from '../../middlewares/errorHandler';

export class NotificationService {
  async getUserNotifications(userId: string, role: string, query: any) {
    const filter: any = {
      $or: [
        { user: userId },
        { role: role },
      ],
    };
    if (query.isRead !== undefined) filter.isRead = query.isRead;

    const limit = parseInt(query.limit) || 20;
    
    return await Notification.find(filter).sort({ createdAt: -1 }).limit(limit);
  }

  async markAsRead(notificationId: string, userId: string) {
    const notification = await Notification.findById(notificationId);
    if (!notification) throw new AppError('Notification not found', 404);

    // If it's a specific user notification, verify ownership
    if (notification.user && notification.user.toString() !== userId) {
      throw new AppError('Unauthorized', 403);
    }

    notification.isRead = true;
    await notification.save();
    return notification;
  }

  // Internal method to be called by other modules or cron jobs
  async createNotification(data: { user?: string; role?: string; title: string; message: string; type: string; link?: string }) {
    const notification = await Notification.create(data);

    const io = getIO();
    if (data.user) {
      io.to(data.user).emit('newNotification', notification);
    } else if (data.role) {
      io.to(`role:${data.role}`).emit('newNotification', notification);
    } else {
      io.emit('newNotification', notification); // Broadcast to all
    }

    return notification;
  }
}
