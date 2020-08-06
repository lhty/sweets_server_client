import React, { ReactElement, ReactNode } from "react";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  concat,
  InMemoryCache,
} from "@apollo/client";
// import { persistCache } from "apollo-cache-persist";

const token = localStorage.getItem(process.env.LOCAL_STORAGE_USER || "");

const httpLink = new HttpLink({ uri: process.env.GRAPHQL });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return forward(operation);
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        Product(existingData, { args, toReference }) {
          console.log(existingData);
          return (
            existingData || toReference({ __typename: "Product", id: args.id })
          );
        },
      },
    },
  },
});

const client = new ApolloClient({
  cache,
  link: token ? concat(authMiddleware, httpLink) : httpLink,
});
export default function ({ children }: { children: ReactNode }): ReactElement {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
