import React, { ReactElement, useEffect } from "react";

import { changeConstructorWidth } from "../../../redux/actions/view";
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

  return (
    <div className={styles.container}>
      <div style={{ padding: "0 10px" }}>1212</div>
    </div>
  );
}
