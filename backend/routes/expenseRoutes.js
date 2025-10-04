import express from 'express';
import {
    submitExpense,
    getPendingExpenses,
    updateExpenseStatus,
    getMyExpenses
} from '../controllers/expenseController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Employee submits a new expense
router.post('/submit', protect, authorize(['employee', 'manager', 'admin']), submitExpense);

// Employee views their own expenses
router.get('/my-expenses', protect, authorize(['employee', 'manager', 'admin']), getMyExpenses);

// Manager/Admin views pending expenses
router.get('/pending', protect, authorize(['manager', 'admin']), getPendingExpenses);

// Manager/Admin updates expense status (approve/reject)
router.put('/update/:expenseId', protect, authorize(['manager', 'admin']), updateExpenseStatus);

export default router;