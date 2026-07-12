import { Fuel } from '../../shared/models/Fuel';
import { AppError } from '../../middlewares/errorHandler';
import { Vehicle } from '../../shared/models/Vehicle';

export class FuelService {
  async getAllFuelRecords(query: any) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (query.vehicle) filter.vehicle = query.vehicle;
    if (query.driver) filter.driver = query.driver;

    const records = await Fuel.find(filter)
      .populate('vehicle')
      .populate('driver')
      .skip(skip)
      .limit(limit)
      .sort({ date: -1 });

    const total = await Fuel.countDocuments(filter);

    return {
      records,
      meta: { total, page, limit, pages: Math.ceil(total / limit) },
    };
  }

  async getFuelRecordById(id: string) {
    const record = await Fuel.findById(id).populate('vehicle').populate('driver');
    if (!record) throw new AppError('Fuel record not found', 404);
    return record;
  }

  async createFuelRecord(data: any) {
    const vehicle = await Vehicle.findById(data.vehicle);
    if (!vehicle) throw new AppError('Vehicle not found', 404);

    const record = await Fuel.create(data);
    
    // Optionally update vehicle odometer if the fuel reading is higher
    if (data.odometerReading > vehicle.odometer) {
      vehicle.odometer = data.odometerReading;
      await vehicle.save();
    }

    return record;
  }

  async updateFuelRecord(id: string, data: any) {
    const record = await Fuel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate('vehicle');

    if (!record) throw new AppError('Fuel record not found', 404);
    return record;
  }

  async deleteFuelRecord(id: string) {
    const record = await Fuel.findByIdAndDelete(id);
    if (!record) throw new AppError('Fuel record not found', 404);
    return true;
  }
}
