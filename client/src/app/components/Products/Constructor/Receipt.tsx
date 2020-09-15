import React from "react";

import * as styles from "./Receipt.css";
import { Box, Item } from "../../../@types/queryTypes";

interface Props {
  box: Box;
  set: Array<Item>;
  page: string;
}

export const Receipt = ({ box, set, page }: Props) => {
  if (!box || page === "initial") return null;
  const filteredSet = set.filter(Boolean);
  return (
    <div className={styles.price}>
      <h2>box : {box.price.overall}₽</h2>
      {set.some((entry) => entry) && (
        <h2>
          Items ({filteredSet.length} шт) :
          {filteredSet.reduce(
            (total, { price }) => (total += price ? price.overall : 0),
            0
          )}
          ₽
        </h2>
      )}
    </div>
  );
};
