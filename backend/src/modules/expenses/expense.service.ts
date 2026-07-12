import { Expense } from '../../shared/models/Expense';
import { AppError } from '../../middlewares/errorHandler';

export class ExpenseService {
  async getAllExpenses(query: any) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (query.category) filter.category = query.category;
    if (query.vehicle) filter.vehicle = query.vehicle;
    if (query.loggedBy) filter.loggedBy = query.loggedBy;
    if (query.referenceId) filter.referenceId = query.referenceId;

    const expenses = await Expense.find(filter)
      .populate('vehicle')
      .populate('loggedBy', 'firstName lastName email')
      .skip(skip)
      .limit(limit)
      .sort({ date: -1 });

    const total = await Expense.countDocuments(filter);

    return {
      expenses,
      meta: { total, page, limit, pages: Math.ceil(total / limit) },
    };
  }

  async getExpenseById(id: string) {
    const expense = await Expense.findById(id).populate('vehicle').populate('loggedBy');
    if (!expense) throw new AppError('Expense not found', 404);
    return expense;
  }

  async createExpense(data: any, userId: string) {
    const expense = await Expense.create({
      ...data,
      loggedBy: userId,
    });
    return expense;
  }

  async updateExpense(id: string, data: any) {
    const expense = await Expense.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate('vehicle').populate('loggedBy');

    if (!expense) throw new AppError('Expense not found', 404);
    return expense;
  }

  async deleteExpense(id: string) {
    const expense = await Expense.findByIdAndDelete(id);
    if (!expense) throw new AppError('Expense not found', 404);
    return true;
  }
}
