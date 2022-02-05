/*
 *  GraphQL schema for Message 
 * 
 */

// Dependencies
import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } from 'graphql';

// Define the message type
const MessageType = new GraphQLObjectType({
    name: "Message",
    fields: () => ({
        successful: { type:  GraphQLBoolean },
        message: { type: GraphQLString }
    })
});

// Export the module
export { MessageType };