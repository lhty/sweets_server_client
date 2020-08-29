import React from "react";
import { pageType } from "../../../redux/actions/constructor";

import * as styles from "./Nav.css";

interface Props {
  page: pageType;
}

export default ({ page }: Props) => {
  return (
    <div className={styles.container}>
      <Nav {...{ page }} />
    </div>
  );
};

const Nav = ({ page }: { page: pageType }) => {
  switch (page) {
    case "box":
      return <p>box page</p>;
    case "slot":
      return <p>slots page</p>;
    case "items":
      return <p>items page</p>;
    case "details":
      return <p>details page</p>;
    default:
      return null;
  }
};
