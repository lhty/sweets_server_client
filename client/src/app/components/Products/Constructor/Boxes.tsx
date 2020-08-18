import React from "react";

import { useQuery } from "@apollo/client";
import { Box } from "../../../@types/queryTypes";
import getBoxes from "./getBoxes.graphql";

import Card from "../../Shared/Card";

export const Boxes = () => {
  const { data, loading } = useQuery(getBoxes);
  const boxes: Box[] = data?.boxes;
  return (
    <>
      {!loading &&
        data &&
        boxes.map((box) => <Card key={box.id} input={box} />)}
    </>
  );
};

const BoxCard = () => {
  return <div></div>;
};
