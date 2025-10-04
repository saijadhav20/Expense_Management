import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import { protect } from './middleware/authMiddleware.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/expenses', expenseRoutes);

// Example of protected route
app.get('/api/profile', protect, (req, res) => {
    res.json({ message: 'Profile info', user: req.user });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port ${PORT}'));