import React from "react";

import { useQuery } from "@apollo/client";
import { Box } from "../../../@types/queryTypes";
import getBoxes from "./getBoxes.graphql";

import Card from "../../Shared/Card";
import Slider from "../../Shared/Slider";

export const Boxes = () => {
  const { data, loading } = useQuery(getBoxes);
  const boxes: Box[] = data?.boxes;
  return (
    <>
      <Slider itemsPerPage={5}>
        {!loading &&
          data &&
          boxes.map((box) => <Card key={box.id} input={box} />)}
      </Slider>
    </>
  );
};

const BoxCard = () => {
  return <div></div>;
};
