/*
 * Database connection
 * 
 */

// Dependencies
import { Sequelize } from 'sequelize';

// Connect to Database
const sequelize = new Sequelize(process.env.DB_NAME || '', 'postgres', process.env.DB_PASSWORD, {
    host: process.env.HOST,
    dialect: 'postgres',
    logging: false
});

// Export cd the module
export default sequelize;