import React from "react";

import { useQuery } from "@apollo/client";
import { Item } from "../../../@types/queryTypes";
import getItems from "./getItems.graphql";

export const Items = () => {
  const { data, loading } = useQuery(getItems);
  const items: Item[] = data?.items;
  return (
    <>
      {!loading &&
        data &&
        items.map((item) => <div key={item.id}>{item.info.name}</div>)}
    </>
  );
};
