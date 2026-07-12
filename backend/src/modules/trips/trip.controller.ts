import { Request, Response, NextFunction } from 'express';
import { TripService } from './trip.service';

export class TripController {
  private tripService: TripService;

  constructor() {
    this.tripService = new TripService();
  }

  getAllTrips = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.tripService.getAllTrips(req.query);
      res.status(200).json({ success: true, message: 'Trips retrieved successfully', ...data });
    } catch (error) {
      next(error);
    }
  };

  getTripById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.tripService.getTripById(req.params.id);
      res.status(200).json({ success: true, message: 'Trip retrieved successfully', data });
    } catch (error) {
      next(error);
    }
  };

  createTrip = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trip = await this.tripService.createTrip(req.body);
      res.status(201).json({ success: true, message: 'Trip created successfully', data: trip });
    } catch (error) {
      next(error);
    }
  };

  updateTrip = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trip = await this.tripService.updateTrip(req.params.id, req.body);
      res.status(200).json({ success: true, message: 'Trip updated successfully', data: trip });
    } catch (error) {
      next(error);
    }
  };

  deleteTrip = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.tripService.deleteTrip(req.params.id);
      res.status(200).json({ success: true, message: 'Trip deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}
