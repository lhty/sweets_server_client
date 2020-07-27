import React, { ReactElement } from "react";

import { Banner } from "graphql/queryTypes";
import { makeStrShorter } from "../lib";

import * as styles from "./Banner.css";

interface Props {
  banner: Banner;
}

export default function Banner({ banner }: Props): ReactElement {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h2>{banner.info.name}</h2>
        <p>
          {banner.info.description?.length > 200
            ? makeStrShorter(banner.info.description, 200)
            : banner.info.description}
        </p>
      </div>
    </div>
  );
}
