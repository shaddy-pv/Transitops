import { Router } from 'express';
import { ExpenseController } from './expense.controller';
import { authenticate, authorize } from '../../middlewares/auth';
import { validate } from '../../middlewares/validate';
import { createExpenseSchema, updateExpenseSchema } from './expense.schema';
import { SystemRoles } from '../../constants/roles';
import { upload } from '../../middlewares/upload';

const router = Router();
const expenseController = new ExpenseController();

router.use(authenticate);

/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: Get all expenses
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: vehicle
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', authorize(SystemRoles.ADMIN, SystemRoles.FINANCIAL_ANALYST, SystemRoles.FLEET_MANAGER, SystemRoles.READ_ONLY), expenseController.getAllExpenses);

/**
 * @swagger
 * /expenses/{id}:
 *   get:
 *     summary: Get expense by ID
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/:id', authorize(SystemRoles.ADMIN, SystemRoles.FINANCIAL_ANALYST, SystemRoles.FLEET_MANAGER, SystemRoles.READ_ONLY), expenseController.getExpenseById);

/**
 * @swagger
 * /expenses:
 *   post:
 *     summary: Create new expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *               amount:
 *                 type: number
 *               date:
 *                 type: string
 *               referenceId:
 *                 type: string
 *               vehicle:
 *                 type: string
 *               description:
 *                 type: string
 *               invoiceUpload:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Created
 */
router.post(
  '/',
  authorize(SystemRoles.ADMIN, SystemRoles.FINANCIAL_ANALYST, SystemRoles.FLEET_MANAGER),
  upload.single('invoiceUpload'),
  validate(createExpenseSchema),
  expenseController.createExpense
);

/**
 * @swagger
 * /expenses/{id}:
 *   put:
 *     summary: Update expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               invoiceUpload:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Updated
 */
router.put(
  '/:id',
  authorize(SystemRoles.ADMIN, SystemRoles.FINANCIAL_ANALYST),
  upload.single('invoiceUpload'),
  validate(updateExpenseSchema),
  expenseController.updateExpense
);

/**
 * @swagger
 * /expenses/{id}:
 *   delete:
 *     summary: Delete expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 */
router.delete('/:id', authorize(SystemRoles.ADMIN), expenseController.deleteExpense);

export default router;
