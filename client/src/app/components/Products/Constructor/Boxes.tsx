import React from "react";

import { useQuery } from "@apollo/client";
import { Box } from "../../../@types/queryTypes";
import getBoxes from "../../../graphql/queries/getBoxes.graphql";

import * as styles from "./Items.css";

import Card from "../../Shared/Card";

interface IBoxes {
  add?: (box: Box) => void;
  select?: (box: Box) => void;
}

export const Boxes = ({ add, select }: IBoxes) => {
  const { data, loading } = useQuery(getBoxes);
  const boxes: Box[] = data?.boxes;

  return (
    <div className={styles.grid}>
      {!loading &&
        data &&
        boxes.map((box) => (
          <Card key={box.id} input={box} {...{ add, select }} />
        ))}
    </div>
  );
};
