import { Request, Response, NextFunction } from 'express';
import { VehicleService } from './vehicle.service';

export class VehicleController {
  private vehicleService: VehicleService;

  constructor() {
    this.vehicleService = new VehicleService();
  }

  getAllVehicles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.vehicleService.getAllVehicles(req.query);
      res.status(200).json({ success: true, message: 'Vehicles retrieved successfully', ...data });
    } catch (error) {
      next(error);
    }
  };

  getVehicleById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.vehicleService.getVehicleById(req.params.id);
      res.status(200).json({ success: true, message: 'Vehicle retrieved successfully', data });
    } catch (error) {
      next(error);
    }
  };

  createVehicle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let data = { ...req.body };
      if (req.file) data.image = req.file.path;
      
      const vehicle = await this.vehicleService.createVehicle(data);
      res.status(201).json({ success: true, message: 'Vehicle created successfully', data: vehicle });
    } catch (error) {
      next(error);
    }
  };

  updateVehicle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let data = { ...req.body };
      if (req.file) data.image = req.file.path;

      const vehicle = await this.vehicleService.updateVehicle(req.params.id, data);
      res.status(200).json({ success: true, message: 'Vehicle updated successfully', data: vehicle });
    } catch (error) {
      next(error);
    }
  };

  deleteVehicle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.vehicleService.deleteVehicle(req.params.id);
      res.status(200).json({ success: true, message: 'Vehicle deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}
