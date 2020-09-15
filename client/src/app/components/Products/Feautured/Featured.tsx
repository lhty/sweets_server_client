import React, { ReactElement } from "react";

import * as styles from "./Featured.css";
import { Product } from "../../../@types/queryTypes";
import { ThumbnailUrl } from "../../lib";

interface Props {
  bundle: Product;
}

export default function Featured({ bundle }: Props): ReactElement {
  return (
    <section
      className={styles.container}
      style={{
        backgroundImage: `url(${ThumbnailUrl({
          source: bundle.info.image,
        })})`,
      }}
    >
      <div className={styles.wrapper}>
        <h2>{bundle.info.name}</h2>
        <h2>{bundle.price.overall}₽</h2>
      </div>
    </section>
  );
}
