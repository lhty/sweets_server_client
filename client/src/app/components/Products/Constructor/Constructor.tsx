import React, { ReactElement, useEffect } from "react";
import { useSpring, animated as a } from "react-spring";
// import { useDrag } from "react-use-gesture";

import { ChangeConstructorWidth } from "../../../redux/actions/view";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/reducers";

import * as styles from "./Constructor.css";
import { DoubleLeftOutlined } from "@ant-design/icons";

interface Props {}

export default function Constructor({}: Props): ReactElement {
  const constructorWindowState = useSelector(
    (state: RootState) => state.view.consructorWindow
  );
  const dispatch = useDispatch();

  const [wrapperStyle, set] = useSpring(() => ({
    width: `${constructorWindowState}%`,
  }));

  useEffect(() => {
    set({ width: `${constructorWindowState}%` });

    return () => {
      set({ width: `0%` });
    };
  }, [constructorWindowState]);

  const handleToggleConstructor = () =>
    dispatch(ChangeConstructorWidth(+constructorWindowState === 100 ? 0 : 100));

  return (
    <a.div className={styles.container} style={wrapperStyle}>
      <div className={styles.toggler} onClick={handleToggleConstructor}>
        <DoubleLeftOutlined rotate={constructorWindowState ? 180 : 0} />
      </div>
      {constructorWindowState && <div style={{ padding: "0 10px" }}>1212</div>}
    </a.div>
  );
}
