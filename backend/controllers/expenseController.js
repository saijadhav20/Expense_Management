import pool from '../config/db.js';



// Employee submits an expense

export const submitExpense = async (req, res) => {

    try {

        const { amount, currency, category, description, date } = req.body;



        const companyId = req.user.companyId;

        const userId = req.user.id;



        const result = await pool.query(

            `INSERT INTO expenses 

            (employee_id, company_id, amount_original, currency_original, amount_converted, 

             currency_converted, category, description, expense_date, status) 

            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,

            [userId, companyId, amount, currency, amount, currency, category, description, date, 'Pending']

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

            [companyId, 'Pending']

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

        const { status, comment } = req.body;



        const validStatuses = ['Approved', 'Rejected'];

        const capitalizedStatus = status.charAt(0).toUpperCase() + status.slice(1);



        if (!validStatuses.includes(capitalizedStatus)) {

            return res.status(400).json({ message: 'Invalid status' });

        }



        const result = await pool.query(

            'UPDATE expenses SET status = $1, manager_comment = $2 WHERE expense_id = $3 RETURNING *',

            [capitalizedStatus, comment, expenseId]

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

            'SELECT * FROM expenses WHERE employee_id = $1 ORDER BY expense_date DESC',

            [userId]

        );



        res.json({ expenses: result.rows });

    } catch (err) {

        console.error(err);

        res.status(500).json({ error: err.message });

    }

};