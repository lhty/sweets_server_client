import React, { ReactElement } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";

import { Boxes } from "./Boxes";
import { Slots } from "./Slots";
// import { Items } from "./Items";

export default function Constructor(): ReactElement {
  const { box, bundle } = useSelector((state: RootState) => state.bundle);

  switch (true) {
    case !box:
      return <Boxes />;
    case box:
      return <Slots bundle={bundle} box={box} />;
    default:
      return <></>;
  }
}
