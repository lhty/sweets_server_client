import React from "react";

import { useQuery } from "@apollo/client";
import { Box } from "../../../@types/queryTypes";
import getBoxes from "./getBoxes.graphql";

export const Boxes = () => {
  const { data, loading } = useQuery(getBoxes);
  const boxes: Box[] = data?.boxes;
  return (
    <>
      {!loading &&
        data &&
        boxes.map((box) => <div key={box.id}>{box.info.name}</div>)}
    </>
  );
};
