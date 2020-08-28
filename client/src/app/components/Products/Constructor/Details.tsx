import React from "react";

import * as styles from "./Details.css";
import Gallery from "../../Shared/Gallery";

import { Item } from "../../../@types/queryTypes";

interface IDetails {
  item: Item;
}

export const Details = ({ item }: IDetails) => {
  return (
    <div className={styles.container}>
      <Gallery images={item.info.image} bullets={styles.bullets} />
    </div>
  );
};
