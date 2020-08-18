import React, { ReactElement } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/reducers";
import { changeConstructorWidth } from "../../../redux/actions/view";

import Constructor from "./Constructor";

interface Props {}

export default function index({}: Props): ReactElement {
  const dispatch = useDispatch();
  const constructorWindowState = useSelector(
    (state: RootState) => state.view.consructorWindow
  );

  const handleChangeWidth = () =>
    dispatch(changeConstructorWidth(constructorWindowState > 0 ? 0 : 30));

  return (
    <>
      <button onClick={handleChangeWidth}>Toggle</button>
      <Constructor windowWidth={constructorWindowState} />
    </>
  );
}
