/*
 * User Queries
 * 
 */

// Dependencies
import { GraphQLList } from 'graphql';
import { UserType } from './../typeDefs/User';
import User from './../../models/User.model';

interface IUser {
    id: string;
    name: string;
    username: string;
    password: string;
}

// Users - GET
// Required fields : None
// Optional fields: name, username, id
const GET_ALL_USERS = {
    type: new GraphQLList(UserType),
    async resolve(): Promise<IUser[]> {
        // Get users from db
        const users = await User.findAll();

        // Return uesrs array to client
        return users;
    }
};


// Export the modules
export { GET_ALL_USERS };