import { Request, Response, NextFunction } from 'express';
import { MaintenanceService } from './maintenance.service';

export class MaintenanceController {
  private maintenanceService: MaintenanceService;

  constructor() {
    this.maintenanceService = new MaintenanceService();
  }

  getAllMaintenanceRecords = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.maintenanceService.getAllMaintenanceRecords(req.query);
      res.status(200).json({ success: true, message: 'Maintenance records retrieved', ...data });
    } catch (error) {
      next(error);
    }
  };

  getMaintenanceById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.maintenanceService.getMaintenanceById(req.params.id);
      res.status(200).json({ success: true, message: 'Maintenance record retrieved', data });
    } catch (error) {
      next(error);
    }
  };

  createMaintenance = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let data = { ...req.body };
      if (req.file) data.invoiceImage = req.file.path;

      const record = await this.maintenanceService.createMaintenance(data);
      res.status(201).json({ success: true, message: 'Maintenance record created', data: record });
    } catch (error) {
      next(error);
    }
  };

  updateMaintenance = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let data = { ...req.body };
      if (req.file) data.invoiceImage = req.file.path;

      const record = await this.maintenanceService.updateMaintenance(req.params.id, data);
      res.status(200).json({ success: true, message: 'Maintenance record updated', data: record });
    } catch (error) {
      next(error);
    }
  };

  deleteMaintenance = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.maintenanceService.deleteMaintenance(req.params.id);
      res.status(200).json({ success: true, message: 'Maintenance record deleted' });
    } catch (error) {
      next(error);
    }
  };
}
