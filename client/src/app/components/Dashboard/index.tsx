import React, { useState } from "react";

import { useTransition, animated as a } from "react-spring";

import AddBundle from "./AddBundle";
import AddItem from "./AddItem";
import AddBox from "./AddBox";

import * as styles from "./Dashboard.css";

export default function () {
  const [Bundle, Item, Box] = [a(AddBundle), a(AddItem), a(AddBox)];
  const pages: any = {
    Bundle: <Bundle />,
    Item: <Item />,
    Box: <Box />,
    Banner: null,
    Orders: null,
    Customers: null,
  };
  const [currentTab, setTab] = useState(Object.keys(pages)[0]);

  return (
    <div className={styles.container}>
      <div className={styles.container_nav}>
        {Object.keys(pages).map((tab) => (
          <button
            className={currentTab === tab ? styles.active : ""}
            onClick={() => setTab(tab)}
            disabled={!pages[tab]}
            key={tab}
          >
            {tab}
          </button>
        ))}
      </div>
      {pages[currentTab]}
    </div>
  );
}
