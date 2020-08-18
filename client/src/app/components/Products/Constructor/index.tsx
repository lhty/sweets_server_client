import React, { ReactElement } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";

import Constructor from "./Constructor";

interface Props {}

export default function index({}: Props): ReactElement {
  const constructorWindowState = useSelector(
    (state: RootState) => state.view.consructorWindow
  );

  return <Constructor windowWidth={constructorWindowState} />;
}
