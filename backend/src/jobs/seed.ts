import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Role } from '../shared/models/Role';
import { User } from '../shared/models/User';
import { SystemRoles } from '../constants/roles';
import { logger } from '../middlewares/logger';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/transitops');
    logger.info('Connected to DB for seeding...');

    // 1. Seed Roles
    const rolesToInsert = Object.values(SystemRoles).map(roleName => ({
      name: roleName,
      description: `${roleName} privileges`,
      permissions: ['read'] // Placeholder for granular permissions
    }));

    for (const roleData of rolesToInsert) {
      const existingRole = await Role.findOne({ name: roleData.name });
      if (!existingRole) {
        await Role.create(roleData);
      }
    }
    logger.info('Roles seeded successfully.');

    // 2. Seed Initial Admin User
    const adminRole = await Role.findOne({ name: SystemRoles.ADMIN });
    if (adminRole) {
      const existingAdmin = await User.findOne({ email: 'admin@transitops.com' });
      if (!existingAdmin) {
        await User.create({
          firstName: 'System',
          lastName: 'Administrator',
          email: 'admin@transitops.com',
          password: 'password123', // Hardcoded for initial seed, must be changed later
          role: adminRole._id,
          status: 'Active'
        });
        logger.info('Admin user seeded successfully. Login: admin@transitops.com / password123');
      } else {
        logger.info('Admin user already exists.');
      }
    }

    logger.info('Seeding complete!');
    process.exit(0);
  } catch (error) {
    logger.error('Error seeding data: ', error);
    process.exit(1);
  }
};

seedData();
