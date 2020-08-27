import React, { ReactElement } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/reducers";

import { Boxes } from "./Boxes";
import { Slots } from "./Slots";
import { PlaySquareOutlined } from "@ant-design/icons";
import { changePage } from "../../../redux/actions/constructor";
import { Items } from "./Items";

export default function Constructor(): ReactElement {
  const dispatch = useDispatch();

  const { box, set, page } = useSelector((state: RootState) => state.bundle);

  const handlePickItem = () => {
    dispatch(changePage("items"));
  };

  switch (page) {
    case "start":
      return (
        <PlaySquareOutlined
          onClick={() => dispatch(changePage("box"))}
          style={{ fontSize: "5rem" }}
        />
      );
    case "box":
      return <Boxes />;
    case "slot":
      return <Slots {...{ box, set, handlePickItem }} />;
    case "items":
      return <Items />;
    default:
      return <></>;
  }
}
