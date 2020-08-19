import React, { lazy, ReactElement, useMemo } from "react";
import * as styles from "./index.css";

import { useQuery } from "@apollo/client";
import getBundles from "./getBundles.graphql";

import { Route, Switch, Redirect } from "react-router-dom";

import useGetRole from "../hooks/useGetRole";
import Featured from "./Feautured";
import Sort from "./Sort";
import Bundles from "./Bundles/Bundles";
import Bundle from "./Bundles/Bundle";
const Editor = lazy(() => import("../Editor"));
import Constructor from "./Constructor";

export default (): ReactElement => {
  const { data, loading } = useQuery(getBundles);

  const bundles = data?.products;
  const featured = useMemo(
    () => data?.products[Math.floor(Math.random() * data.products.length)],
    [data]
  );

  return (
    <>
      <Featured bundle={featured} />
      {!loading && data && (
        <main className={styles.main}>
          <Sort />
          <Switch>
            <Route exact path="/">
              <Bundles {...{ bundles }} />
            </Route>
            <Route exact path="/:id/:title">
              <Bundle />
            </Route>
            <AuthRoute path="/dashboard">
              <Editor />
            </AuthRoute>
          </Switch>
          <Constructor />
        </main>
      )}
    </>
  );
};

const AuthRoute = ({
  children,
  path,
}: {
  children: React.ReactElement;
  path: string;
}) => {
  const isAdmin = useGetRole();

  return (
    <Route
      {...path}
      render={({ location }) =>
        isAdmin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
