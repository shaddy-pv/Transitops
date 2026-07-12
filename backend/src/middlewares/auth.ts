import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../shared/utils/jwt';
import { AppError } from './errorHandler';
import { User } from '../shared/models/User';
import { Role } from '../shared/models/Role';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('Not authorized to access this route', 401));
    }

    const decoded = verifyAccessToken(token) as any;
    
    const user = await User.findById(decoded.id).populate('role');
    if (!user) {
      return next(new AppError('The user belonging to this token no longer exists', 401));
    }
    
    if (user.status !== 'Active') {
      return next(new AppError('User account is inactive or suspended', 403));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new AppError('Not authorized, token failed', 401));
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.role) {
      return next(new AppError('Role missing', 403));
    }
    const userRole = (req.user.role as any).name;
    if (!roles.includes(userRole)) {
      return next(new AppError('User role is not authorized to access this route', 403));
    }
    next();
  };
};
