import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import pool from '../config/db.js';

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) return res.status(401).json({ message: 'Not authorized, token missing' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Query user from database using raw SQL with correct column name
        const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [decoded.id]);
        
        if (!result.rows[0]) {
            return res.status(401).json({ message: 'User not found' });
        }
        
        req.user = {
            id: result.rows[0].user_id,
            email: result.rows[0].email,
            role: result.rows[0].role,
            companyId: result.rows[0].company_id
        };
        
        next();
    } catch (err) {
        console.error('Auth error:', err);
        return res.status(401).json({ message: 'Not authorized, token invalid' });
    }
};

export const authorize = (roles = []) => {
    return (req, res, next) => {
        // Case-insensitive role comparison
        const userRoleLower = req.user.role.toLowerCase();
        const allowedRoles = roles.map(r => r.toLowerCase());
        
        if (!allowedRoles.includes(userRoleLower)) {
            return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
        }
        next();
    };
};