import React from "react";

import * as styles from "./Details.css";
import Gallery from "../../Shared/Gallery";

import { Item, Box } from "../../../@types/queryTypes";

interface IDetails {
  item: Item | Box;
}

export const Details = ({ item }: IDetails) => {
  return (
    <div className={styles.container}>
      <Gallery images={item.info.image} bullets={styles.bullets} />
    </div>
  );
};
