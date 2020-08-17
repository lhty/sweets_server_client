import React from "react";

import { useQuery } from "@apollo/client";
import { Item } from "../../../@types/queryTypes";
import getItems from "./getItems.graphql";

import Card from "../../Shared/Card";

export const Items = () => {
  const { data, loading } = useQuery(getItems);
  const items: Item[] = data?.items;
  return (
    <>
      {!loading &&
        data &&
        items.map((item) => <Card key={item.id} input={item} />)}
    </>
  );
};
