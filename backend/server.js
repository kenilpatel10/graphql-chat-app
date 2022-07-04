import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import express from 'express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import {SubscriptionServer } from 'subscriptions-transport-ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import typeDefs from './typeDefs.js'
import {execute , subscribe} from 'graphql'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'


import {ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginDrainHttpServer,

} from "apollo-server-core";
import cors from 'cors'

 mongoose.connect("mongodb+srv://kenil10:kenil10@cluster0.z94zm.mongodb.net/?retryWrites=true&w=majority",{
     useNewUrlParser:true,
     useUnifiedTopology: true
 })
 
 
dotenv.config({path:'./config.env'})
 mongoose.connection.on("connected",()=>{
     console.log('connecting to mongodb')
 })
 mongoose.connection.on("error",(err)=>{
    console.log('error connecting to ',err)
})
 

import './models/Mesaage.js'
import './models/User.js'

import resolvers from './resolvers.js'
import { fromGraphQLError } from 'apollo-server-errors';
const context = ({req})=>{
    const {authorization} = req.headers;
    
    if(authorization){
        const {userId} = jwt.verify(authorization,process.env.JWT_SECRET)  
        return {userId}
    }
}

//     const server = new ApolloServer({
//     typeDefs ,
//     resolvers,
//     context
// })
//   server.listen().then(({ url }) => {
//     console.log(`🚀  Server ready at ${url}`);
//   });

  const schema = makeExecutableSchema({ typeDefs, resolvers});

  const app = express();
  app.use(cors());
  const httpServer = createServer(app);
  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: "/graphql",
    },
  );
      

  // Set up ApolloServer.
  const server = new ApolloServer({
    schema,
    context,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground(),
      {
        async serverWillStart() {
          return {  
            async drainServer() {
             subscriptionServer.close();
            },
          };
        },
      },
    ],
  });


  await server.start();
  server.applyMiddleware({ app });
  const PORT = 4000;
  // server.installSubscriptionHandlers(httpServer)
  httpServer.listen(PORT, () => {
    console.log(
      `Server is now running on http://localhost:${PORT}${server.graphqlPath}`,
    );
  });








