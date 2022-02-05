/*
 * User Mutations
 * 
 */

// Dependencies
import { GraphQLID, GraphQLString } from "graphql";
import { UserType } from "../typeDefs/User";
import { MessageType } from "../typeDefs/Message";
import User from './../../models/User.model';

interface IUser {
    id: string;
    name: string;
    username: string;
    password: string;
}

// Users - POST
// Required fields : name, username, password
// Optional fields : None
const CREATE_USER = {
    type: UserType,
    args: {
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(parent: any, args: IUser) : Promise<IUser> {
        // Get necessary information from args
        const { name, username, password } = args;

        // Insert user into the database
        const newUser = await User.create({name, username, password});

        // Send user to client
        return newUser;
    }
}

// Users - UPDATE
// Required fields : id, oldPassword - At least one optional field
// Optional fields : name, username, password
const UPDATE_USER = {
    type: MessageType,
    args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString, optional: true },
        username: { type: GraphQLString, optional: true },
        newPassword: { type: GraphQLString, optional: true },
        oldPassword: { type: GraphQLString, optional: true}
    },
    async resolve(parent: any, args: any){
        // Get necessary information from args
        const id = typeof(args.id) === 'string' && args.id.length > 0 ? args.id : false;
        const name = typeof(args.name) === 'string' && args.name.length > 0 ? args.name : false;
        const username = typeof(args.username) === 'string' && args.username.length > 0 ? args.username : false;
        const newPassword = typeof(args.newPassword) === 'string' && args.newPassword.length > 0 ? args.newPassword : false;
        const oldPassword = typeof(args.oldPassword) === 'string' && args.oldPassword.length > 0 ? args.oldPassword : false;

        // Check for id
        if(!id || !oldPassword){
            throw new Error("The id is not specified or not valid")
        }
        //Check for fiels to update
        if(!name && !username && !newPassword ) {
            throw new Error("Not specified fields to update")
        }

        // Find User
        const user : any = await User.findOne({
            where: {
                id : id
            }
        });
        
        // Store new fields
        const newUserData:any = {};       

        // Validate oldPassword with the user password
        if(oldPassword === user.password) {
            if(name) {
                newUserData.name = name;
            }
            if(username) {
                newUserData.username = username;
            }
            if(newPassword) {
                newUserData.password = newPassword;
            }
        } else {
            throw new Error("Passwords do not match")
        }

        // Update the user in database
        await User.update(newUserData, {
            where: {
              id: id
            }
        });
        
        return {
            successful: true,
            message: "User updated successfully"
        }
    }
}

// Users - DELETE
// Required fields : id
// Optional fields : None
const DELETE_USER = {
    type: MessageType,
    args: {
        id: { type: GraphQLID },
    },
    async resolve(parent: any, args: IUser){
        // Get necessary information from args
        const { id } = args;

        // Delete user from database
        const deletedUser = await User.destroy({
            where: {
              id: id
            }
          });

        // Send status to client
        return {
            successful: true,
            message: "User deleted successfully",
        };
    }
}


// Export the modules
export { CREATE_USER, DELETE_USER, UPDATE_USER };