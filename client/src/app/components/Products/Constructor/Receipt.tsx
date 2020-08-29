import React from "react";

import * as styles from "./Receipt.css";
import { Box, Item } from "../../../@types/queryTypes";

interface Props {
  box: Box;
  set: Item[];
}

export const Receipt = ({ box, set }: Props) => {
  if (!box) return null;
  return (
    <div className={styles.price}>
      <h2>{box.price.overall} руб</h2>
      {set.some((entry) => entry) && (
        <h2>
          +{set.reduce((total, { price }) => (total += price.overall), 0)}
          руб
        </h2>
      )}
    </div>
  );
};
