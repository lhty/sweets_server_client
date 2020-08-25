import React from "react";

import { useQuery } from "@apollo/client";
import { Box } from "../../../@types/queryTypes";
import getBoxes from "./getBoxes.graphql";

import { useDispatch } from "react-redux";
import { pickBox } from "../../../redux/actions/constructor";

export const Boxes = () => {
  const { data, loading } = useQuery(getBoxes);
  const boxes: Box[] = data?.boxes;
  const dispatch = useDispatch();

  const handleSelect = (box: Box) => dispatch(pickBox(box));

  return (
    <>
      {!loading &&
        data &&
        boxes.map((box) => <BoxCard key={box.id} {...{ box, handleSelect }} />)}
    </>
  );
};

const BoxCard = ({
  box,
  handleSelect,
}: {
  box: Box;
  handleSelect: (box: Box) => void;
}) => {
  return <div onClick={() => handleSelect(box)}>{box.info.name}</div>;
};
