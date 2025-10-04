import pool from '../config/db.js';

// Employee submits an expense
export const submitExpense = async (req, res) => {
    try {
        const { amount, currency, category, description, date } = req.body;

        // Employee's company
        const companyId = req.user.companyId;
        const userId = req.user.id;

        const result = await pool.query(
            `INSERT INTO expenses 
            (user_id, company_id, amount, currency, category, description, date, status) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [userId, companyId, amount, currency, category, description, date, 'pending']
        );

        res.status(201).json({ message: 'Expense submitted', expense: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Manager/Admin views pending expenses in their company
export const getPendingExpenses = async (req, res) => {
    try {
        const companyId = req.user.companyId;

        const result = await pool.query(
            'SELECT * FROM expenses WHERE company_id = $1 AND status = $2',
            [companyId, 'pending']
        );

        res.json({ pendingExpenses: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Manager/Admin approves/rejects an expense
export const updateExpenseStatus = async (req, res) => {
    try {
        const { expenseId } = req.params;
        const { status, comment } = req.body; // status = 'approved' or 'rejected'

        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const result = await pool.query(
            'UPDATE expenses SET status = $1, manager_comment = $2 WHERE id = $3 RETURNING *',
            [status, comment, expenseId]
        );

        res.json({ message: 'Expense status updated', expense: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Employee views their own expenses
export const getMyExpenses = async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await pool.query(
            'SELECT * FROM expenses WHERE user_id = $1 ORDER BY date DESC',
            [userId]
        );

        res.json({ expenses: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
