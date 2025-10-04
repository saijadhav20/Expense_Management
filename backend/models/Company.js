import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import User from './User.js';

const Company = sequelize.define('Company', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'INR'
    }
}, {
    tableName: 'companies',
    timestamps: true
});

// Relation: Company has many Users
Company.hasMany(User, { foreignKey: 'companyId', as: 'users' });

export default Company;
