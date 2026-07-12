import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.userService.getAllUsers(req.query);
      res.status(200).json({
        success: true,
        message: 'Users retrieved successfully',
        ...data,
      });
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.userService.getUserById(req.params.id);
      res.status(200).json({
        success: true,
        message: 'User retrieved successfully',
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.userService.updateUser(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.userService.deleteUser(req.params.id);
      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}
