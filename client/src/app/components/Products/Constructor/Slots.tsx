import React from "react";

import * as styles from "./Slots.css";
import { Box, Item } from "../../../@types/queryTypes";
import { PlusSquareOutlined, CloseOutlined } from "@ant-design/icons";
import { ThumbnailUrl } from "../../lib";

interface Props {
  box: Box;
  set: Array<Item>;
  handlers: any;
  selectSlot: (n: number) => void;
}

export const Slots = ({ box, set, handlers, selectSlot }: Props) => {
  const columns = Math.floor(box.dimensions.width / 20);
  return (
    <div
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      className={styles.container}
    >
      {set.map((slot, index) => (
        <div className={styles.slot} key={index}>
          {!slot ? (
            <PlusSquareOutlined
              style={{ fontSize: "5rem" }}
              onClick={() => {
                selectSlot(index);
                handlers.handleSelectPage("items");
              }}
            />
          ) : (
            <>
              <CloseOutlined
                className={styles.filled_del}
                style={{ color: "red" }}
                onClick={() => handlers.handleRemoveItemFromSet(index)}
              />
              <Slot item={slot} />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

const Slot = ({ item }: { item: Item }) => {
  return (
    <div
      className={styles.filled}
      style={{
        backgroundImage: item.letter
          ? `linear-gradient(45deg, white, white)`
          : `url(${ThumbnailUrl({
              source: item.info.image,
              size: "thumb",
            })})`,
        // backgroundImage: `url(${ThumbnailUrl({
        //   source: item.info.image,
        //   size: "thumb",
        // })})`,
      }}
    >
      {!!item.letter && <h2 className={styles.filled_letter}>{item.letter}</h2>}
    </div>
  );
};
