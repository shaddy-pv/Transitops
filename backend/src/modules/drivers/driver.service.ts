import { Driver } from '../../shared/models/Driver';
import { AppError } from '../../middlewares/errorHandler';

export class DriverService {
  async getAllDrivers(query: any) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (query.search) {
      filter.$or = [
        { firstName: { $regex: query.search, $options: 'i' } },
        { lastName: { $regex: query.search, $options: 'i' } },
        { licenseNumber: { $regex: query.search, $options: 'i' } },
      ];
    }
    if (query.status) filter.status = query.status;

    const drivers = await Driver.find(filter)
      .populate('assignedVehicle')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
      
    const total = await Driver.countDocuments(filter);

    return {
      drivers,
      meta: { total, page, limit, pages: Math.ceil(total / limit) },
    };
  }

  async getDriverById(id: string) {
    const driver = await Driver.findById(id).populate('assignedVehicle');
    if (!driver) throw new AppError('Driver not found', 404);
    return driver;
  }

  async createDriver(data: any) {
    const existingDriver = await Driver.findOne({ licenseNumber: data.licenseNumber });
    if (existingDriver) {
      throw new AppError('Driver with this license number already exists', 400);
    }
    const driver = await Driver.create(data);
    return driver;
  }

  async updateDriver(id: string, data: any) {
    const driver = await Driver.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate('assignedVehicle');
    if (!driver) throw new AppError('Driver not found', 404);
    return driver;
  }

  async deleteDriver(id: string) {
    const driver = await Driver.findByIdAndDelete(id);
    if (!driver) throw new AppError('Driver not found', 404);
    return true;
  }
}
