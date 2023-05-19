const { makeExecutableSchema } = require("@graphql-tools/schema");
const { ApolloServer } = require("apollo-server-express");
const { createServer } = require("http");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const schemas = require("./schemas");
const resolvers = require("./resolvers");
const models = require("./models");

require("dotenv").config();

const startApolloServer = async () => {
    const schema = makeExecutableSchema({ typeDefs: schemas, resolvers });

    //connect mongodb
    mongoose.connect(process.env.MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then(() => {
        console.log('connected to Mongoose');
    }).catch((err) => {
        console.log(err);
    })

    //connect with apolloserver
    const server = new ApolloServer({
        schema,
        context: async ({ req }) => {
            return {
                req,
                models,
            };
        },
    });

    await server.start();
    const app = express();
    app.use(cors());

    const httpServer = createServer(app);

    server.applyMiddleware({ app, path: "/" });

    await new Promise((resolve) =>
        httpServer.listen({ port: process.env.PORT }, resolve)
    );

    console.log(
        `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
    );

    return { server, app };
};

startApolloServer();
