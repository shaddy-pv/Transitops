import { Vehicle } from '../../shared/models/Vehicle';
import { Driver } from '../../shared/models/Driver';
import { Trip } from '../../shared/models/Trip';
import { Expense } from '../../shared/models/Expense';
import { Maintenance } from '../../shared/models/Maintenance';
import { FuelLog } from '../../shared/models/FuelLog';

export class DashboardService {
  async getDashboardStats() {
    const totalVehicles = await Vehicle.countDocuments();
    const available = await Vehicle.countDocuments({ status: 'Available' });
    const inMaintenance = await Vehicle.countDocuments({ status: 'In Maintenance' });
    const onDuty = await Driver.countDocuments({ status: 'Active' });
    const activeTrips = await Trip.countDocuments({ status: 'In Progress' });
    const pendingTrips = await Trip.countDocuments({ status: 'Scheduled' });
    const utilization = totalVehicles > 0 ? Math.round((activeTrips / totalVehicles) * 100) : 0;

    return {
      totalVehicles,
      available,
      inMaintenance,
      onDuty,
      activeTrips,
      pendingTrips,
      utilization,
    };
  }

  async getRecentActivity() {
    // 1. Recent Trips
    const recentTripsRaw = await Trip.find().sort({ createdAt: -1 }).limit(5).populate('vehicle');
    const recentTrips = recentTripsRaw.map(t => ({
      id: t._id,
      code: t.tripId || `TRP-${t._id.toString().substring(0, 4).toUpperCase()}`,
      source: t.startLocation,
      destination: t.endLocation,
      vehicleId: (t.vehicle as any)?.registrationNumber || 'Unknown',
      status: t.status,
    }));

    // 2. Activities (Combining Trips and Maintenance)
    const tripsForActivity = await Trip.find().sort({ createdAt: -1 }).limit(5).populate('driver');
    const maintenanceForActivity = await Maintenance.find().sort({ createdAt: -1 }).limit(5).populate('vehicle');
    
    const activitiesRaw = [
      ...tripsForActivity.map(t => ({
        id: `t-${t._id}`,
        actor: (t.driver as any)?.firstName ? `${(t.driver as any).firstName} ${(t.driver as any).lastName}` : 'System',
        action: `started a trip to ${t.endLocation}`,
        time: t.createdAt,
      })),
      ...maintenanceForActivity.map(m => ({
        id: `m-${m._id}`,
        actor: 'Technician',
        action: `logged maintenance for ${(m.vehicle as any)?.registrationNumber || 'Vehicle'}`,
        time: m.createdAt,
      }))
    ];
    
    activitiesRaw.sort((a, b) => (b.time as any) - (a.time as any));
    const activities = activitiesRaw.slice(0, 10).map(a => ({
      id: a.id,
      actor: a.actor,
      action: a.action,
      time: new Date(a.time as any).toLocaleDateString(),
    }));

    // 3. License Soon
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setDate(nextMonth.getDate() + 30);
    
    const driversWithExpiringLicenses = await Driver.find({
      licenseExpiry: { $gte: today, $lte: nextMonth }
    }).limit(5);

    const licenseSoon = driversWithExpiringLicenses.map(d => ({
      id: d._id,
      name: `${d.firstName} ${d.lastName}`,
      licenseNumber: d.licenseNumber,
      licenseExpiry: new Date(d.licenseExpiry).toLocaleDateString(),
    }));

    // 4. Monthly Fuel (Mocking or aggregating if we have fuel logs)
    const monthlyFuel = [
      { month: "Jan", liters: 400, cost: 38000 },
      { month: "Feb", liters: 420, cost: 40000 },
      { month: "Mar", liters: 410, cost: 39500 },
      { month: "Apr", liters: 480, cost: 45000 },
      { month: "May", liters: 500, cost: 48000 },
      { month: "Jun", liters: 470, cost: 44500 },
    ];

    // 5. Maintenance Overview
    const maintenanceToday = await Maintenance.countDocuments({
      date: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
        $lt: new Date(new Date().setHours(23, 59, 59, 999))
      }
    });
    const maintenancePending = await Maintenance.countDocuments({ status: { $in: ['Scheduled', 'In Progress'] } });
    const maintenanceCompleted = await Maintenance.countDocuments({ status: 'Completed' });

    const maintenanceOverview = [
      { l: "Today", v: maintenanceToday, icon: "Clock", color: "text-sky-400" },
      { l: "Pending", v: maintenancePending, icon: "CircleAlert", color: "text-amber-400" },
      { l: "Completed", v: maintenanceCompleted, icon: "CircleCheck", color: "text-emerald-400" },
    ];

    return {
      recentTrips,
      activities,
      licenseSoon,
      monthlyFuel,
      maintenanceOverview,
    };
  }
}
