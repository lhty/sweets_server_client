import React, { ReactElement } from "react";

import * as styles from "./Featured.css";
import { Product } from "../../../@types/queryTypes";

interface Props {
  bundle: Product;
}

export default function Featured({ bundle }: Props): ReactElement {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <h2 style={{ textAlign: "center" }}>{bundle.info.name}</h2>
      </div>
    </section>
  );
}
