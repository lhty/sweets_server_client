import React from "react";
import { pageType } from "../../../redux/actions/constructor";

import * as styles from "./Nav.css";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { Box, Item } from "../../../@types/queryTypes";

interface Props {
  page: pageType;
  handlers?: any;
  box?: Box;
  set?: Item[];
}

export default ({ handlers, box, set, page }: Props) => {
  if (!page) return null;
  return (
    <div className={styles.container}>
      <DoubleLeftOutlined className={styles.container_controls} />
      <Nav {...{ page }} />
    </div>
  );
};

const Nav = ({ page, box, set }: Props) => {
  switch (page) {
    case "box":
      return (
        <>
          {box && <DoubleRightOutlined className={styles.container_controls} />}
        </>
      );
    case "slot":
      return (
        <>
          {set?.filter(Boolean).length >= box?.countmin && (
            <DoubleRightOutlined className={styles.container_controls} />
          )}
        </>
      );
    case "items":
      return <p>choose items & Sort tbd</p>;
    default:
      return (
        <p>
          {set?.filter(Boolean).length}/{box?.countmin}
        </p>
      );
  }
};
