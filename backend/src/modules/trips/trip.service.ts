import { Trip } from '../../shared/models/Trip';
import { AppError } from '../../middlewares/errorHandler';

export class TripService {
  async getAllTrips(query: any) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (query.search) {
      filter.$or = [
        { tripId: { $regex: query.search, $options: 'i' } },
        { startLocation: { $regex: query.search, $options: 'i' } },
        { endLocation: { $regex: query.search, $options: 'i' } },
      ];
    }
    if (query.status) filter.status = query.status;
    if (query.driver) filter.driver = query.driver;
    if (query.vehicle) filter.vehicle = query.vehicle;

    const trips = await Trip.find(filter)
      .populate('driver')
      .populate('vehicle')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
      
    const total = await Trip.countDocuments(filter);

    return {
      trips,
      meta: { total, page, limit, pages: Math.ceil(total / limit) },
    };
  }

  async getTripById(id: string) {
    const trip = await Trip.findById(id).populate('driver').populate('vehicle');
    if (!trip) throw new AppError('Trip not found', 404);
    return trip;
  }

  async createTrip(data: any) {
    const existingTrip = await Trip.findOne({ tripId: data.tripId });
    if (existingTrip) {
      throw new AppError('Trip with this ID already exists', 400);
    }
    const trip = await Trip.create(data);
    return trip;
  }

  async updateTrip(id: string, data: any) {
    const trip = await Trip.findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .populate('driver')
      .populate('vehicle');
    if (!trip) throw new AppError('Trip not found', 404);
    return trip;
  }

  async deleteTrip(id: string) {
    const trip = await Trip.findByIdAndDelete(id);
    if (!trip) throw new AppError('Trip not found', 404);
    return true;
  }
}
