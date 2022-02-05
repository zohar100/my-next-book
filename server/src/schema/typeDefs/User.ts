/*
 *  GraphQL schema for User 
 * 
 */

// Dependencies
import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';

// Define the user type
const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString }
    })
});

// Export the module
export { UserType };