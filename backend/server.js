import express from 'express';
import authRoutes from './routes/authRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import { protect } from './middleware/authMiddleware.js';

const app = express();

app.use(express.json());

// Auth routes
app.use('/api/auth', authRoutes);

// Company routes (admin only for adding users)
app.use('/api/company', companyRoutes);

// Expense routes
app.use('/api/expenses', expenseRoutes);

// Example of protected route
app.get('/api/profile', protect, (req, res) => {
    res.json({ message: 'Profile info', user: req.user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
