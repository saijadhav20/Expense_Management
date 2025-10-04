import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import User from './User.js';
import Company from './Company.js';

const Expense = sequelize.define('Expense', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'INR'
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending' // pending, approved, rejected
    }
}, {
    tableName: 'expenses',
    timestamps: true
});

// Relations
Expense.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Expense.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });

export default Expense;
