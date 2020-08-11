import React, { ReactElement } from "react";
import * as styles from "./index.css";

import { useQuery } from "@apollo/client";
import getBundles from "./getBundles.graphql";

import Featured from "./Feautured";
import Bundles from "./Bundles";
import Constructor from "./Constructor";

export default (): ReactElement => {
  const { data, loading } = useQuery(getBundles);

  const bundles = data?.products;

  return (
    <>
      <Featured />
      <main className={styles.main}>
        {!loading && data && (
          <>
            <Bundles {...{ bundles }} />
            <Constructor />
          </>
        )}
      </main>
    </>
  );
};
