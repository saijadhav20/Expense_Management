import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Company from './Company.js';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'employee' // default role
    }
}, {
    tableName: 'users',
    timestamps: true
});

// Relation: User belongs to Company
User.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });

export default User;
