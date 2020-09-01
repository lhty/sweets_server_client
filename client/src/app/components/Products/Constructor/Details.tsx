import React from "react";

import * as styles from "./Details.css";
import Gallery from "../../Shared/Gallery";

import { Item, Box } from "../../../@types/queryTypes";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";

interface IDetails {
  input: Item | Box;
}

export const Details = ({ input }: IDetails) => {
  const types = {
    isBox: input.__typename === "Box",
    isItem: input.__typename === "Item",
    isNamedItem: input.__typename === "Item" && input.is_editable,
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_add}>
        {types.isItem && (
          <>
            <MinusCircleOutlined />
            <PlusCircleOutlined />
          </>
        )}
        {types.isBox && <button>Добавить</button>}
      </div>
      <Gallery images={input.info.image} bullets={styles.bullets} />
      <div className={styles.container_info}>
        <h2>{input.info.name}</h2>
        <p>{input.info.description}</p>
      </div>
      <div className={styles.container_price}>
        <h3>{input.price.overall}₽</h3>
      </div>
    </div>
  );
};
