import React, { ReactElement } from "react";

import * as styles from "./Featured.css";
import { ThumbnailUrl } from "../../lib";
import { Product } from "../../../@types/queryTypes";

interface Props {
  featured: Product;
}

const Featured = ({ featured }: Props): ReactElement => {
  const {url} = ThumbnailUrl({
    source: featured.info.image,
  })
  return (
    <section
      className={styles.container}
      style={{
        backgroundImage: `url(${url})`,
      }}
    >
      <div className={styles.wrapper}>
        <h2>{featured.info.name}</h2>
        <h2>{featured.price.overall}₽</h2>
      </div>
    </section>
  );
};
export default Featured;
