import { Request, Response, NextFunction } from 'express';
import { NotificationService } from './notification.service';
import { AuthRequest } from '../../middlewares/auth';

export class NotificationController {
  private notificationService: NotificationService;

  constructor() {
    this.notificationService = new NotificationService();
  }

  getNotifications = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const roleName = (req.user.role as any).name;
      const data = await this.notificationService.getUserNotifications(req.user.id, roleName, req.query);
      res.status(200).json({ success: true, message: 'Notifications retrieved', data });
    } catch (error) {
      next(error);
    }
  };

  markAsRead = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const data = await this.notificationService.markAsRead(req.params.id, req.user.id);
      res.status(200).json({ success: true, message: 'Notification marked as read', data });
    } catch (error) {
      next(error);
    }
  };
}
