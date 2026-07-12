import { Maintenance } from '../../shared/models/Maintenance';
import { AppError } from '../../middlewares/errorHandler';
import { Vehicle } from '../../shared/models/Vehicle';

export class MaintenanceService {
  async getAllMaintenanceRecords(query: any) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (query.status) filter.status = query.status;
    if (query.vehicle) filter.vehicle = query.vehicle;
    if (query.provider) {
      filter.provider = { $regex: query.provider, $options: 'i' };
    }

    const records = await Maintenance.find(filter)
      .populate('vehicle')
      .skip(skip)
      .limit(limit)
      .sort({ date: -1 });

    const total = await Maintenance.countDocuments(filter);

    return {
      records,
      meta: { total, page, limit, pages: Math.ceil(total / limit) },
    };
  }

  async getMaintenanceById(id: string) {
    const record = await Maintenance.findById(id).populate('vehicle');
    if (!record) throw new AppError('Maintenance record not found', 404);
    return record;
  }

  async createMaintenance(data: any) {
    const vehicle = await Vehicle.findById(data.vehicle);
    if (!vehicle) throw new AppError('Vehicle not found', 404);

    const record = await Maintenance.create(data);
    
    // Auto update vehicle status if maintenance is in progress
    if (data.status === 'In Progress') {
      vehicle.status = 'In Maintenance';
      await vehicle.save();
    }

    return record;
  }

  async updateMaintenance(id: string, data: any) {
    const record = await Maintenance.findById(id);
    if (!record) throw new AppError('Maintenance record not found', 404);

    const updatedRecord = await Maintenance.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate('vehicle');

    // Restore vehicle status if completed
    if (record.status !== 'Completed' && data.status === 'Completed') {
      await Vehicle.findByIdAndUpdate(record.vehicle, { status: 'Available' });
    }

    return updatedRecord;
  }

  async deleteMaintenance(id: string) {
    const record = await Maintenance.findByIdAndDelete(id);
    if (!record) throw new AppError('Maintenance record not found', 404);
    return true;
  }
}
