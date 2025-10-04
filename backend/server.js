import express from 'express';
import authRoutes from './routes/authRoutes.js';
import { protect } from './middleware/authMiddleware.js';

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);

// Example of protected route
app.get('/api/profile', protect, (req, res) => {
    res.json({ message: 'Profile info', user: req.user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
