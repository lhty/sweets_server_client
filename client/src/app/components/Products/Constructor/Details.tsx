import React, { useState } from "react";

import * as styles from "./Details.css";
import Gallery from "../../Shared/Gallery";

import { useSpring, animated, config } from "react-spring";
import { useDrag } from "react-use-gesture";

import { Item, Box } from "../../../@types/queryTypes";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

interface IDetails {
  input: Item | Box;
  set?: Array<Item>;
  handlers: any;
}

export const Details = ({ input, set: bundleSet, handlers }: IDetails) => {
  const types = {
    isBox: input.__typename === "Box",
    isItem: input.__typename === "Item",
    isNamedItem: input.__typename === "Item" && input.is_editable,
  };
  const [quantity, setQuantity] = useState(types.isNamedItem ? 0 : 1);
  const [active, setActive] = useState(false);

  const freeSlots = bundleSet?.filter((item) => !item).length;

  const { morph } = useSpring({
    config: { duration: 250 },
    morph: active ? 1 : 0,
  });

  const [{ x, velocity }, set] = useSpring(() => ({
    x: quantity,
    velocity: 0,
  }));
  const bind = useDrag(
    ({ movement: [x], velocity, down, direction: [dx] }) => {
      if (down !== active) {
        setActive(down);
      }

      if (!down) {
        set({ x, velocity: 0 });
      } else {
        set({ x, velocity: velocity * dx });
      }
    },
    {
      initial: () => [x.get(), quantity],
      bounds: { left: 0, right: freeSlots, top: 0, bottom: 0 },
      rubberband: false,
    }
  );

  const handleIncrease = () => setQuantity(Math.min(quantity + 1, freeSlots));
  const handleDecrease = () => setQuantity(Math.max(quantity - 1, 0));

  return (
    <div className={styles.container}>
      <div className={styles.container_add}>
        {types.isItem && (
          <>
            <MinusOutlined onClick={handleDecrease} />
            <div className={styles.container_add_range}>
              <div className={styles.container_add_bar}></div>
              <animated.div
                {...bind()}
                // @ts-ignore
                style={{ x }}
                className={styles.container_add_handle}
                onContextMenu={(e) => e.preventDefault()}
              >
                <div className={styles.container_add_knob}></div>
                <animated.svg
                  viewBox="0 0 50 50"
                  height="50"
                  width="50"
                  style={{
                    transform: morph.to((n) => `translateY(${n * -36}px)`),
                  }}
                >
                  <animated.path
                    d={morph.to({
                      range: [0, 1],
                      output: [
                        "M 33,25.001 C 33,29.419278 29.418278,33 25,33 20.581722,33 17,29.419278 17,25.001 17,20.582722 20.581722,17 25,17 29.418278,17 33,20.582722 33,25.001 Z",
                        "M 45,20 C 45,31.045695 32.089401,45 25,45 17.910599,45 5,31.045695 5,20 5,8.954305 13.954305,5 25,5 36.045695,5 45,8.954305 45,20 Z",
                      ],
                    })}
                  />
                </animated.svg>
                <animated.div
                  style={{
                    transform: morph.to(
                      (n) => `translateY(${n * -39}px) scale(${n})`
                    ),
                  }}
                  className={styles.container_add_count}
                >
                  {x.to((x) => Math.round(freeSlots / x))}
                </animated.div>
              </animated.div>
            </div>
            <PlusOutlined onClick={handleIncrease} />
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
