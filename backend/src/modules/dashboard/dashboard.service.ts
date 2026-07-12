import { Vehicle } from '../../shared/models/Vehicle';
import { Driver } from '../../shared/models/Driver';
import { Trip } from '../../shared/models/Trip';
import { Expense } from '../../shared/models/Expense';
import { Maintenance } from '../../shared/models/Maintenance';

export class DashboardService {
  async getDashboardStats() {
    const totalVehicles = await Vehicle.countDocuments();
    const activeVehicles = await Vehicle.countDocuments({ status: { $in: ['Available', 'On Trip'] } });
    const vehiclesInMaintenance = await Vehicle.countDocuments({ status: 'In Maintenance' });

    const totalDrivers = await Driver.countDocuments();
    const activeDrivers = await Driver.countDocuments({ status: 'Active' });

    const activeTrips = await Trip.countDocuments({ status: 'In Progress' });
    const scheduledTrips = await Trip.countDocuments({ status: 'Scheduled' });

    // Aggregate expenses for the current month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const expenseAggregation = await Expense.aggregate([
      {
        $match: {
          date: { $gte: startOfMonth },
        },
      },
      {
        $group: {
          _id: null,
          totalExpenses: { $sum: '$amount' },
        },
      },
    ]);

    const totalMonthlyExpenses = expenseAggregation.length > 0 ? expenseAggregation[0].totalExpenses : 0;

    return {
      vehicles: {
        total: totalVehicles,
        active: activeVehicles,
        inMaintenance: vehiclesInMaintenance,
      },
      drivers: {
        total: totalDrivers,
        active: activeDrivers,
      },
      trips: {
        active: activeTrips,
        scheduled: scheduledTrips,
      },
      finances: {
        totalMonthlyExpenses,
      },
    };
  }

  async getRecentActivity() {
    const recentTrips = await Trip.find().sort({ createdAt: -1 }).limit(5).populate('driver').populate('vehicle');
    const recentMaintenance = await Maintenance.find().sort({ createdAt: -1 }).limit(5).populate('vehicle');
    
    return {
      recentTrips,
      recentMaintenance,
    };
  }
}
