import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { WebSocketLink } from "@apollo/client/link/ws";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  HttpLink,
} from "@apollo/client";
import {split} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { SubscriptionClient } from "subscriptions-transport-ws";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});
const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4000/graphql',
}));
// const wsLink = new WebSocketLink(
//   new SubscriptionClient("ws://localhost:4001/graphql", {
//     options: {
//       // connectionParams: {
//       //   authToken: user.authToken,
//       // },
//       reconnect:true  
//     },
//   }),
// );
const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

// const link = new WebSocketLink({
//   uri: `ws://localhost:4000/`,
//   options: {
//     reconnect: true,
//   },
// });

const client = new ApolloClient({
  link,
  // uri: "ws://localhost:4000/graphql",
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);

reportWebVitals();

