import React, { ReactElement, useState, useEffect } from "react";
import { useSpring, animated as a } from "react-spring";
// import { useDrag } from "react-use-gesture";

import * as styles from "./Constructor.css";
import { DoubleLeftOutlined } from "@ant-design/icons";

interface Props {}

export default function Constructor({}: Props): ReactElement {
  const [expanded, setExpanded] = useState(false);

  const [wrapperStyle, set] = useSpring(() => ({
    width: `0%`,
  }));

  useEffect(() => {
    if (expanded) set({ width: `100%` });

    return () => {
      set({ width: `0%` });
    };
  }, [expanded]);

  return (
    <a.div className={styles.container} style={wrapperStyle}>
      <div className={styles.toggler} onClick={() => setExpanded(!expanded)}>
        <DoubleLeftOutlined />
      </div>
      {expanded && <div style={{ padding: "0 10px" }}>1212</div>}
    </a.div>
  );
}
