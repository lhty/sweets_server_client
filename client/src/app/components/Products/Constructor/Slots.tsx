import React from "react";

import * as styles from "./Slots.css";
import { Box } from "../../../@types/queryTypes";
import { ItemMod } from "../../../@types/utility";
import { ThumbnailUrl } from "../../lib";

interface Props {
  box: Box;
  set: Array<ItemMod>;
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
            <span
              className={styles.slot_add}
              onClick={() => {
                selectSlot(index);
                handlers.handleSelectPage("items");
              }}
            >
              +
            </span>
          ) : (
            <>
              <span
                className={styles.filled_del}
                onClick={() => handlers.handleRemoveItemFromSet(index)}
              >
                +
              </span>
              <Slot item={slot} />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

const Slot = ({ item }: { item: ItemMod }) => {
  const {url} = ThumbnailUrl({
    source: item.info.image,
    screenWidth: "thumb",
  })
  return (
    <div
      className={styles.filled}
      style={{
        backgroundImage: item.flags.is_editable
          ? `linear-gradient(45deg, white, white)`
          : `url(${url})`,
        // backgroundImage: `url(${ThumbnailUrl({
        //   source: item.info.image,
        //   size: "thumb",
        // })})`,
      }}
    >
      {!!item.flags.is_editable  && (
        <h2 className={styles.filled_letter}>{item.letter}</h2>
      )}
      {!url &&  <h2 className={styles.filled_letter}>{item.info.name}</h2>}
    </div>
  );
};
