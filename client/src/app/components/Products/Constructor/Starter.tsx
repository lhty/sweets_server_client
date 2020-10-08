import React, { ReactElement } from "react";
import { GiftOutlined } from "@ant-design/icons";

import * as styles from "./Constructor.css";

interface Props {
  start: (page: string) => void;
}

export const Starter = ({ start }: Props): ReactElement => {
  return <GiftOutlined onClick={() => start("box")} className={styles.start} />;
};
