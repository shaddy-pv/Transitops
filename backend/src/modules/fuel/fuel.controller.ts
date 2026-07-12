import { Request, Response, NextFunction } from 'express';
import { FuelService } from './fuel.service';

export class FuelController {
  private fuelService: FuelService;

  constructor() {
    this.fuelService = new FuelService();
  }

  getAllFuelRecords = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.fuelService.getAllFuelRecords(req.query);
      res.status(200).json({ success: true, message: 'Fuel records retrieved', ...data });
    } catch (error) {
      next(error);
    }
  };

  getFuelRecordById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.fuelService.getFuelRecordById(req.params.id);
      res.status(200).json({ success: true, message: 'Fuel record retrieved', data });
    } catch (error) {
      next(error);
    }
  };

  createFuelRecord = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let data = { ...req.body };
      if (req.file) data.receiptImage = req.file.path;

      const record = await this.fuelService.createFuelRecord(data);
      res.status(201).json({ success: true, message: 'Fuel record created', data: record });
    } catch (error) {
      next(error);
    }
  };

  updateFuelRecord = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let data = { ...req.body };
      if (req.file) data.receiptImage = req.file.path;

      const record = await this.fuelService.updateFuelRecord(req.params.id, data);
      res.status(200).json({ success: true, message: 'Fuel record updated', data: record });
    } catch (error) {
      next(error);
    }
  };

  deleteFuelRecord = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.fuelService.deleteFuelRecord(req.params.id);
      res.status(200).json({ success: true, message: 'Fuel record deleted' });
    } catch (error) {
      next(error);
    }
  };
}
