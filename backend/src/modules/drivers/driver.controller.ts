import { Request, Response, NextFunction } from 'express';
import { DriverService } from './driver.service';

export class DriverController {
  private driverService: DriverService;

  constructor() {
    this.driverService = new DriverService();
  }

  getAllDrivers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.driverService.getAllDrivers(req.query);
      res.status(200).json({ success: true, message: 'Drivers retrieved successfully', ...data });
    } catch (error) {
      next(error);
    }
  };

  getDriverById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.driverService.getDriverById(req.params.id);
      res.status(200).json({ success: true, message: 'Driver retrieved successfully', data });
    } catch (error) {
      next(error);
    }
  };

  createDriver = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let data = { ...req.body };
      if (req.file) data.image = req.file.path;
      
      const driver = await this.driverService.createDriver(data);
      res.status(201).json({ success: true, message: 'Driver created successfully', data: driver });
    } catch (error) {
      next(error);
    }
  };

  updateDriver = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let data = { ...req.body };
      if (req.file) data.image = req.file.path;

      const driver = await this.driverService.updateDriver(req.params.id, data);
      res.status(200).json({ success: true, message: 'Driver updated successfully', data: driver });
    } catch (error) {
      next(error);
    }
  };

  deleteDriver = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.driverService.deleteDriver(req.params.id);
      res.status(200).json({ success: true, message: 'Driver deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}
