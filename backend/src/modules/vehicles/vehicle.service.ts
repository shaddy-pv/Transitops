import { Vehicle } from '../../shared/models/Vehicle';
import { AppError } from '../../middlewares/errorHandler';

export class VehicleService {
  async getAllVehicles(query: any) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (query.search) {
      filter.$or = [
        { registrationNumber: { $regex: query.search, $options: 'i' } },
        { vehicleName: { $regex: query.search, $options: 'i' } },
        { vin: { $regex: query.search, $options: 'i' } },
      ];
    }
    if (query.status) filter.status = query.status;

    const vehicles = await Vehicle.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });
    const total = await Vehicle.countDocuments(filter);

    return {
      vehicles,
      meta: { total, page, limit, pages: Math.ceil(total / limit) },
    };
  }

  async getVehicleById(id: string) {
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) throw new AppError('Vehicle not found', 404);
    return vehicle;
  }

  async createVehicle(data: any) {
    const existingVehicle = await Vehicle.findOne({
      $or: [{ registrationNumber: data.registrationNumber }, { vin: data.vin }],
    });
    if (existingVehicle) {
      throw new AppError('Vehicle with this registration number or VIN already exists', 400);
    }
    const vehicle = await Vehicle.create(data);
    return vehicle;
  }

  async updateVehicle(id: string, data: any) {
    const vehicle = await Vehicle.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!vehicle) throw new AppError('Vehicle not found', 404);
    return vehicle;
  }

  async deleteVehicle(id: string) {
    const vehicle = await Vehicle.findByIdAndDelete(id);
    if (!vehicle) throw new AppError('Vehicle not found', 404);
    return true;
  }
}
