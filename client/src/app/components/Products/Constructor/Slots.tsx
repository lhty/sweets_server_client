import React from "react";

import * as styles from "./Slots.css";
import { Box, Item } from "../../../@types/queryTypes";
import { PlusSquareOutlined } from "@ant-design/icons";

interface Props {
  box: Box;
  set: Array<Item>;
  select: (page: string) => void;
}

export const Slots = ({ box, set, select }: Props) => {
  const columns = Math.floor(box.dimensions.width / 20);

  return (
    <div
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      className={styles.container}
    >
      {set.map((slot, index) => (
        <div className={styles.slot} key={slot.toString() + index}>
          {!slot && (
            <PlusSquareOutlined
              style={{ fontSize: "5rem" }}
              onClick={() => select("items")}
            />
          )}
        </div>
      ))}
    </div>
  );
};
