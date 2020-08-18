import React, { ReactElement } from "react";

import { Banner } from "../../@types/queryTypes";
import { makeStrShorter } from "../lib";

import * as styles from "./Banner.css";

interface Props {
  banner?: Banner;
}

export default function Banner({ banner }: Props): ReactElement {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h2>{banner?.info?.name}</h2>
        <p>
          {banner.info.description.length > 600
            ? makeStrShorter(banner.info.description, 600)
            : banner.info.description}
        </p>
      </div>
    </div>
  );
}
