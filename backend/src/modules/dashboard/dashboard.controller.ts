import { Request, Response, NextFunction } from 'express';
import { DashboardService } from './dashboard.service';

export class DashboardController {
  private dashboardService: DashboardService;

  constructor() {
    this.dashboardService = new DashboardService();
  }

  getDashboardStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stats = await this.dashboardService.getDashboardStats();
      const activity = await this.dashboardService.getRecentActivity();
      
      res.status(200).json({
        success: true,
        message: 'Dashboard data retrieved successfully',
        data: {
          stats,
          ...activity,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}
