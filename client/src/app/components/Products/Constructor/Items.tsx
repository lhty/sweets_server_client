import React from "react";

import * as styles from "./Items.css";

import { useQuery } from "@apollo/client";
import getItems from "../../../graphql/queries/getItems.graphql";
import { ItemMod } from "../../../@types/utility";

import Card from "../../Shared/Card";

interface Props {
  select: (item: ItemMod) => void;
}

export const Items = ({ select }: Props) => {
  const { data, loading } = useQuery(getItems);
  const items: ItemMod[] = data?.items;

  return (
    <div className={styles.grid}>
      {!loading &&
        data &&
        items.map((item) => (
          <Card key={item.id} input={item} select={select} />
        ))}
    </div>
  );
};
