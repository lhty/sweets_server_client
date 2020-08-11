import React, { useEffect, ReactElement, ReactNode } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/actions/user";

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  concat,
  InMemoryCache,
} from "@apollo/client";

export default function ({ children }: { children: ReactNode }): ReactElement {
  const token = localStorage.getItem(
    process.env.LOCAL_STORAGE_TOKEN.toString()
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) dispatch(setToken(token));
  }, []);

  const httpLink = new HttpLink({ uri: process.env.GRAPHQL });
  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(
      token
        ? {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        : {}
    );
    return forward(operation);
  });

  const cache = new InMemoryCache({});
  const client = new ApolloClient({
    cache,
    link: concat(authMiddleware, httpLink),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
