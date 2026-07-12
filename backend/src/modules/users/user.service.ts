import { User } from '../../shared/models/User';
import { AppError } from '../../middlewares/errorHandler';
import { Role } from '../../shared/models/Role';
import { SystemRoles } from '../../constants/roles';

export class UserService {
  async getAllUsers(query: any) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (query.search) {
      filter.$or = [
        { firstName: { $regex: query.search, $options: 'i' } },
        { lastName: { $regex: query.search, $options: 'i' } },
        { email: { $regex: query.search, $options: 'i' } },
      ];
    }
    if (query.status) filter.status = query.status;

    const users = await User.find(filter)
      .populate('role')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(filter);

    return {
      users,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getUserById(id: string) {
    const user = await User.findById(id).populate('role');
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }

  async updateUser(id: string, data: any) {
    let updateData = { ...data };
    
    if (data.role) {
      const role = await Role.findOne({ name: data.role });
      if (!role) throw new AppError('Invalid role', 400);
      updateData.role = role._id;
    }

    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate('role');

    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }

  async deleteUser(id: string) {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return true;
  }
}
