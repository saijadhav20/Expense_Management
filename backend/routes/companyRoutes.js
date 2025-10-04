import express from 'express';
import { addUserToCompany } from '../controllers/companyController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Only admin can add users - middleware will handle case-insensitive comparison
router.post('/add-user', protect, authorize(['admin']), addUserToCompany);

export default router;