import React, { ReactElement } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/reducers";

import { Boxes } from "./Boxes";
import { Slots } from "./Slots";
import { PlaySquareOutlined } from "@ant-design/icons";
import { pickPage } from "../../../redux/actions/constructor";
// import { Items } from "./Items";

export default function Constructor(): ReactElement {
  const dispatch = useDispatch();
  const { box, bundle, page } = useSelector((state: RootState) => state.bundle);

  switch (page) {
    case "start":
      return (
        <PlaySquareOutlined
          onClick={() => dispatch(pickPage("box"))}
          style={{ fontSize: "5rem" }}
        />
      );
    case "box":
      return <Boxes />;
    case "slot":
      return <Slots bundle={bundle} box={box} />;
    default:
      return <></>;
  }
}
