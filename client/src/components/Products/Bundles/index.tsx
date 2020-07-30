import React, { ReactElement } from "react";

import { Route, Switch } from "react-router-dom";

import Bundles from "./Bundles";
import Bundle from "./Bundle";
import { Product } from "graphql/queryTypes";

interface Props {
  bundles: Product[];
}

export default function index({ bundles }: Props): ReactElement {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Bundles {...{ bundles }} />
        </Route>
        <Route exact path="/:id/:title">
          <Bundle />
        </Route>
      </Switch>
    </>
  );
}
