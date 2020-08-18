import React, { ReactElement } from "react";

import { useDispatch } from "react-redux";
import { changeConstructorWidth } from "../../../redux/actions/view";

import { useSpring, animated as a } from "react-spring";

import * as styles from "./Constructor.css";

import { Boxes } from "./Boxes";
import { Items } from "./Items";

interface Props {
  windowWidth: number;
}

export default function Constructor({ windowWidth }: Props): ReactElement {
  const dispatch = useDispatch();
  const currentWidth = useSpring({
    width: `${windowWidth}%`,
  });

  const handleChangeWidth = () =>
    dispatch(changeConstructorWidth(windowWidth > 0 ? 0 : 30));

  return (
    <a.div style={currentWidth} className={styles.container}>
      <button onClick={handleChangeWidth}>Toggle</button>
      {/* <Items /> */}
      <Boxes />
    </a.div>
  );
}
