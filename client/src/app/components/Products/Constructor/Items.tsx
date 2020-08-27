import React from "react";

import * as styles from "./Items.css";

import { useQuery } from "@apollo/client";
import { Item } from "../../../@types/queryTypes";
import getItems from "./getItems.graphql";

import Card from "../../Shared/Card";

export const Items = () => {
  const { data, loading } = useQuery(getItems);
  const items: Item[] = data?.items;
  return (
    <div className={styles.grid}>
      {!loading &&
        data &&
        items.map((item) => <Card key={item.id} input={item} />)}
    </div>
  );
};
