import React, { ReactElement } from "react";
import { useParams, useHistory } from "react-router-dom";

import { useQuery } from "@apollo/client";
import * as getBundle from "../getBundle.graphql";

import * as styles from "./Bundle.css";

interface Props {}

export default function Bundle({}: Props): ReactElement {
  const history = useHistory();
  const { id } = useParams();
  const { data, loading } = useQuery(getBundle, { variables: { id } });

  return (
    <section className={styles.container}>
      <button onClick={() => history.push("/")}>back</button>
      {!loading && data.product.id}
    </section>
  );
}
