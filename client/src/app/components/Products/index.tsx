import React, { ReactElement, useMemo } from "react";
import * as styles from "./index.css";

import { useQuery } from "@apollo/client";
import getBundles from "./getBundles.graphql";

import Featured from "./Feautured";
import Sort from "./Sort";
import Bundles from "./Bundles";
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
      <main className={styles.main}>
        <Sort />
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
