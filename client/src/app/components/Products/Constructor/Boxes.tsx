import React from "react";

import { useQuery } from "@apollo/client";
import { Box } from "../../../@types/queryTypes";
import getBoxes from "./getBoxes.graphql";

import * as styles from "./Items.css";

import Card from "../../Shared/Card";

interface IBoxes {
  select: (box: Box) => void;
}

export const Boxes = ({ select }: IBoxes) => {
  const { data, loading } = useQuery(getBoxes);
  const boxes: Box[] = data?.boxes;

  return (
    <div className={styles.grid}>
      {!loading &&
        data &&
        boxes.map((box) => <Card key={box.id} input={box} select={select} />)}
    </div>
  );
};
