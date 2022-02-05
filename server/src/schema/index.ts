/*
 *  GraphQL Initialize
 * 
 */

// Dependencies
import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { GET_ALL_USERS } from './queries/User';
import { CREATE_USER, DELETE_USER, UPDATE_USER } from './mutations/User';

// Define a Query
const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        getAllUsers: GET_ALL_USERS
    }
});

// Define a Mutation
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: CREATE_USER,
        deleteUser: DELETE_USER,
        updateUser: UPDATE_USER
    }
});

// Combine query and mutation into a schema
const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

// Export the module
export { schema };