import React, { ReactElement } from "react";
import { DoubleLeftOutlined } from "@ant-design/icons";
import { useLocation, useHistory } from "react-router-dom";

import * as styles from "./Sort.css";

interface Props {}

export default ({}: Props): ReactElement => {
  const history = useHistory();
  const { pathname } = useLocation();

  return (
    <div className={styles.container}>
      {pathname !== "/" && (
        <DoubleLeftOutlined
          className={styles.back}
          onClick={() => history.push("/")}
        />
      )}
    </div>
  );
};
