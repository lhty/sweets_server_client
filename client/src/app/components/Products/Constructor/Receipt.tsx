import React from "react";

import * as styles from "./Receipt.css";
import { Box, Item } from "../../../@types/queryTypes";

interface Props {
  box: Box;
  set: Item[];
  page: string;
}

export const Receipt = ({ box, set, page }: Props) => {
  if (!box || page === "initial") return null;
  return (
    <div className={styles.price}>
      <h2>box : {box.price.overall}₽</h2>
      {set.some((entry) => entry) && (
        <h2>
          + Items :
          {set.reduce((total, { price }) => (total += price.overall), 0)}₽
        </h2>
      )}
    </div>
  );
};
