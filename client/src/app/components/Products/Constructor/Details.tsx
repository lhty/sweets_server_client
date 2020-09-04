import React from "react";

import * as styles from "./Details.css";
import Gallery from "../../Shared/Gallery";

import { Item, Box } from "../../../@types/queryTypes";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";

interface IDetails {
  input: Item | Box;
  handlers: any;
}

export const Details = ({ input, handlers }: IDetails) => {
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
            <p>{}</p>
            <PlusCircleOutlined />
          </>
        )}
        {types.isBox && (
          <button
            style={{ margin: "0 auto" }}
            onClick={() => handlers.handleSelectBox(input)}
          >
            Добавить
          </button>
        )}
      </div>
      <div className={styles.container_images}>
        <Gallery images={input.info.image} bullets={styles.bullets} />
      </div>
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
