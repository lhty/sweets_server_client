import React from "react";

import * as styles from "./Nav.css";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { Box, Item } from "../../../@types/queryTypes";
import { constructorPage } from "../../../redux/actions/constructor";

interface Props {
  page: string;
  handlers?: any;
  box?: Box;
  set?: Item[];
}

export default ({ handlers, box, set, page }: Props) => {
  const handleChangePage = () => {
    const currentIndex = constructorPage[page as keyof typeof constructorPage];
    handlers.handleSelectPage(
      box || page === "box"
        ? constructorPage[Math.max(currentIndex - 1, 0)]
        : "box"
    );
  };
  return (
    <div className={styles.container}>
      {page !== "initial" && (
        <DoubleLeftOutlined
          onClick={handleChangePage}
          className={styles.container_controls}
        />
      )}
      <Nav {...{ page, box, set, handlers }} />
    </div>
  );
};

const Nav = ({ page, box, set, handlers }: Props) => {
  switch (page) {
    case "box":
      return (
        <>
          {box && (
            <DoubleRightOutlined
              onClick={() => handlers.handleSelectPage("slot")}
              className={styles.container_controls}
            />
          )}
        </>
      );
    case "slot":
      return (
        <>
          <p className={styles.container_info}>
            {box && set?.filter(Boolean).length + " / " + set?.length}
          </p>
          {set?.filter(Boolean).length >= box?.countmin && (
            <DoubleRightOutlined className={styles.container_controls} />
          )}
        </>
      );
    case "items":
      return <p>Sort tbd</p>;
    default:
      return <></>;
  }
};
