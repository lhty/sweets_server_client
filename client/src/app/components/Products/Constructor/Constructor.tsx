import React, { ReactElement } from "react";

import { useSpring, animated as a } from "react-spring";

import * as styles from "./Constructor.css";

import { Boxes } from "./Boxes";
import { Items } from "./Items";

interface Props {
  windowWidth: number;
}

export default function Constructor({ windowWidth }: Props): ReactElement {
  const currentWidth = useSpring({
    width: `${windowWidth}%`,
  });

  return (
    <a.div style={currentWidth} className={styles.container}>
      {/* <Items /> */}
      <Boxes />
    </a.div>
  );
}
