import pool from '../config/db.js';
import bcrypt from 'bcrypt';

// Create company → called by authController during admin signup
export const createCompany = async (adminUserId, companyName, currency = 'INR') => {
    const companyResult = await pool.query(
        'INSERT INTO companies (name, currency) VALUES ($1, $2) RETURNING *',
        [companyName, currency]
    );
    const newCompany = companyResult.rows[0];

    // Link admin user to this company
    await pool.query(
        'UPDATE users SET company_id = $1 WHERE id = $2',
        [newCompany.id, adminUserId]
    );

    return newCompany;
};

// Admin adds employees/managers
export const addUserToCompany = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!['employee', 'manager'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Admin's company
        const companyId = req.user.companyId;

        const userResult = await pool.query(
            'INSERT INTO users (name, email, password, role, company_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, email, hashedPassword, role, companyId]
        );
        const newUser = userResult.rows[0];

        res.status(201).json({
            message: 'User added to company',
            user: { id: newUser.id, email: newUser.email, role: newUser.role }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
