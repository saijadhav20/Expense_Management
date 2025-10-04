import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

import pool from '../config/db.js';

import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js';

import { createCompany } from './companyController.js';



// Register → first user is admin + company auto-creation

export const register = async (req, res) => {

    try {

        const { name, email, password, companyName } = req.body;



        const hashedPassword = await bcrypt.hash(password, 10);



        const userResult = await pool.query(

            'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *',

            [name, email, hashedPassword, 'Admin']

        );



        const newUser = userResult.rows[0];



        const newCompany = await createCompany(newUser.user_id, companyName, 'INR');



        res.status(201).json({

            message: 'Admin registered and company created',

            user: { id: newUser.user_id, email: newUser.email, role: newUser.role },

            company: { id: newCompany.company_id, name: newCompany.name }

        });



    } catch (err) {

        console.error(err);

        res.status(500).json({ error: err.message });

    }

};



// Login → returns JWT token

export const login = async (req, res) => {

    try {

        const { email, password } = req.body;



        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        const user = result.rows[0];



        if (!user) return res.status(404).json({ message: 'User not found' });



        const isMatch = await bcrypt.compare(password, user.password_hash);



        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });



        const token = jwt.sign(

            { id: user.user_id, email: user.email, role: user.role, companyId: user.company_id },

            JWT_SECRET,

            { expiresIn: JWT_EXPIRES_IN }

        );



        res.json({ message: 'Login successful', token });



    } catch (err) {

        console.error(err);

        res.status(500).json({ error: err.message });

    }

};