import { Request, Response, NextFunction } from 'express';
import { ExpenseService } from './expense.service';
import { AuthRequest } from '../../middlewares/auth';

export class ExpenseController {
  private expenseService: ExpenseService;

  constructor() {
    this.expenseService = new ExpenseService();
  }

  getAllExpenses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.expenseService.getAllExpenses(req.query);
      res.status(200).json({ success: true, message: 'Expenses retrieved', ...data });
    } catch (error) {
      next(error);
    }
  };

  getExpenseById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.expenseService.getExpenseById(req.params.id);
      res.status(200).json({ success: true, message: 'Expense retrieved', data });
    } catch (error) {
      next(error);
    }
  };

  createExpense = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      let data = { ...req.body };
      if (req.file) data.receiptImage = req.file.path;

      const expense = await this.expenseService.createExpense(data, req.user.id);
      res.status(201).json({ success: true, message: 'Expense created', data: expense });
    } catch (error) {
      next(error);
    }
  };

  updateExpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let data = { ...req.body };
      if (req.file) data.receiptImage = req.file.path;

      const expense = await this.expenseService.updateExpense(req.params.id, data);
      res.status(200).json({ success: true, message: 'Expense updated', data: expense });
    } catch (error) {
      next(error);
    }
  };

  deleteExpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.expenseService.deleteExpense(req.params.id);
      res.status(200).json({ success: true, message: 'Expense deleted' });
    } catch (error) {
      next(error);
    }
  };
}
