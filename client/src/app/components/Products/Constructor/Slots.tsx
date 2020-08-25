import React from "react";

import * as styles from "./Slots.css";
import { ComponentBundleBundle, Box } from "../../../@types/queryTypes";

interface Props {
  bundle: Array<ComponentBundleBundle> | boolean;
  box: Box | boolean;
}

export const Slots = ({ bundle, box }: Props) => {
  console.log(bundle);
  return <div className={styles.container}>1212</div>;
};
