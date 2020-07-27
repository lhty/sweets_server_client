import React, { ReactElement } from "react";

import * as styles from "./Featured.css";

interface Props {}

export default function Featured({}: Props): ReactElement {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <h2 style={{ textAlign: "center" }}>Featured</h2>
      </div>
    </section>
  );
}
