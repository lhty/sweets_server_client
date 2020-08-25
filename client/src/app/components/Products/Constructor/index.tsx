import React, { ReactElement } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/reducers";
import { changeConstructorWidth } from "../../../redux/actions/view";

import { useSpring, animated as a } from "react-spring";
import * as styles from "./Constructor.css";

import Constructor from "./Constructor";

interface Props {}

export default function index({}: Props): ReactElement {
  const dispatch = useDispatch();
  const constructorWindowState = useSelector(
    (state: RootState) => state.view.consructorWindow
  );

  const currentWidth = useSpring({
    width: `${constructorWindowState}%`,
  });

  const handleChangeWidth = () =>
    dispatch(changeConstructorWidth(constructorWindowState > 0 ? 0 : 30));

  return (
    <a.div style={currentWidth} className={styles.container}>
      <button onClick={handleChangeWidth}>Toggle</button>
      <Constructor />
    </a.div>
  );
}
