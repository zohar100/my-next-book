/*
 * User model configuration 
 * 
 */

// Dependencies
import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelize from '../config/database';

  
// Define the User interface
interface UserAttributes {
    id?: string;
    name: string;
    username: string;
    password: string;
}

// Define the User model
class User extends Model<UserAttributes> 
        implements UserAttributes {
            /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
             */
            id!: string;
            name!: string;
            username!: string;
            password!: string;
        };
        User.init({
            id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            },
            name: {
            type: DataTypes.STRING,
            allowNull: false
            },
            username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
            }, 
            password: {
            type: DataTypes.STRING,
            allowNull: false
            }
        }, {
            sequelize,
            modelName: 'User',
        });

// Export the module
export default User;