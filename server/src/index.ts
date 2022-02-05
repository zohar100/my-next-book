/*
 * Initial file to our server 
 * 
 */

// Dependencies
import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import  { schema } from './schema/index';
import db from './config/database';
import dotenv from 'dotenv';

const main = async () => {

    dotenv.config();

    // Test database connection
    db.authenticate()
        .then(() => console.log("Database connected seccessfully..."))
        .catch(err => console.log('Error: ', err));


    const app = express();
    
    // Config usefull tools for our server
    app.use(cors());
    app.use(express.json());
    
    // Define an endpoint
    app.use("/graphql", graphqlHTTP({
        schema,
        graphiql: true
    }));

    // Initial sever
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT : ${PORT}`));
};

main().catch(err => console.log(err));