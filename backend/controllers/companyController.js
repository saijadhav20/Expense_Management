import pool from '../config/db.js';
import bcrypt from 'bcrypt';

// Create company → called by authController during admin signup
export const createCompany = async (adminUserId, companyName, currency = 'INR') => {
    const companyResult = await pool.query(
        'INSERT INTO company (name, base_currency, created_by) VALUES ($1, $2, $3) RETURNING *',
        [companyName, currency, adminUserId]
    );
    const newCompany = companyResult.rows[0];

    // Link admin user to this company
    await pool.query(
        'UPDATE users SET company_id = $1 WHERE user_id = $2',
        [newCompany.company_id, adminUserId]
    );

    return newCompany;
};

// Admin adds employees/managers
export const addUserToCompany = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Use capitalized roles to match SQL CHECK constraint
        const validRoles = ['Employee', 'Manager'];
        const capitalizedRole = role.charAt(0).toUpperCase() + role.slice(1);
        
        if (!validRoles.includes(capitalizedRole)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const companyId = req.user.companyId;

        const userResult = await pool.query(
            'INSERT INTO users (name, email, password_hash, role, company_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, email, hashedPassword, capitalizedRole, companyId]
        );
        const newUser = userResult.rows[0];

        res.status(201).json({
            message: 'User added to company',
            user: { id: newUser.user_id, email: newUser.email, role: newUser.role }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};