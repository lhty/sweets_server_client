import React from "react";

import { useQuery } from "@apollo/client";
import { Box } from "../../../@types/queryTypes";
import getBoxes from "./getBoxes.graphql";

import * as styles from "./Items.css";

import { useDispatch } from "react-redux";
import { pickBox, changePage } from "../../../redux/actions/constructor";
import Card from "../../Shared/Card";

export const Boxes = () => {
  const { data, loading } = useQuery(getBoxes);
  const boxes: Box[] = data?.boxes;
  const dispatch = useDispatch();

  const handleSelect = (box: Box) => {
    dispatch(pickBox(box));
    dispatch(changePage("slot"));
  };

  return (
    <div className={styles.grid}>
      {!loading &&
        data &&
        boxes.map((box) => <Card key={box.id} input={box} />)}
    </div>
  );
};
