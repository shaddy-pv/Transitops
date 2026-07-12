import { User } from '../../shared/models/User';
import { Role } from '../../shared/models/Role';
import { RefreshToken } from '../../shared/models/RefreshToken';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../shared/utils/jwt';
import { AppError } from '../../middlewares/errorHandler';
import { SystemRoles } from '../../constants/roles';

export class AuthService {
  async register(data: any) {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new AppError('Email already in use', 400);
    }

    let role = await Role.findOne({ name: data.role || SystemRoles.READ_ONLY });
    if (!role) {
      role = await Role.findOne({ name: SystemRoles.READ_ONLY });
    }

    const user = await User.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      role: role?._id,
    });

    const accessToken = generateAccessToken(user.id, role?.name || SystemRoles.READ_ONLY);
    const refreshToken = generateRefreshToken(user.id);

    const tokenDoc = await RefreshToken.create({
      token: refreshToken,
      user: user.id,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: role?.name,
      },
      accessToken,
      refreshToken: tokenDoc.token,
    };
  }

  async login(data: any) {
    const user = await User.findOne({ email: data.email }).select('+password').populate('role');
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isMatch = await user.comparePassword(data.password);
    if (!isMatch) {
      throw new AppError('Invalid credentials', 401);
    }

    if (user.status !== 'Active') {
      throw new AppError('Account is not active', 403);
    }

    user.lastLogin = new Date();
    await user.save();

    const roleName = (user.role as any).name;
    const accessToken = generateAccessToken(user.id, roleName);
    const refreshToken = generateRefreshToken(user.id);

    await RefreshToken.create({
      token: refreshToken,
      user: user.id,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: roleName,
      },
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(token: string) {
    const existingToken = await RefreshToken.findOne({ token }).populate('user');
    
    if (!existingToken || !existingToken.isActive) {
      throw new AppError('Invalid refresh token', 401);
    }

    try {
      const decoded = verifyRefreshToken(token) as any;
      const user = await User.findById(decoded.id).populate('role');
      
      if (!user || user.status !== 'Active') {
        throw new AppError('User not found or inactive', 401);
      }

      existingToken.revoked = new Date();
      await existingToken.save();

      const newAccessToken = generateAccessToken(user.id, (user.role as any).name);
      const newRefreshTokenStr = generateRefreshToken(user.id);

      await RefreshToken.create({
        token: newRefreshTokenStr,
        user: user.id,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshTokenStr,
      };
    } catch (error) {
      throw new AppError('Invalid refresh token', 401);
    }
  }

  async logout(token: string) {
    const existingToken = await RefreshToken.findOne({ token });
    if (existingToken) {
      existingToken.revoked = new Date();
      await existingToken.save();
    }
    return true;
  }
}
