import React, { ReactElement } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/reducers";
import { changeConstructorWidth } from "../../../redux/actions/view";

import * as styles from "./Sort.css";

interface Props {}

export default ({}: Props): ReactElement => {
  const constructorWindowState = useSelector(
    (state: RootState) => state.view.consructorWindow
  );
  const dispatch = useDispatch();

  const handleChangeWidth = () =>
    dispatch(changeConstructorWidth(constructorWindowState > 0 ? 0 : 30));

  return (
    <div className={styles.container}>
      <button onClick={handleChangeWidth}>Toggle</button>
    </div>
  );
};
