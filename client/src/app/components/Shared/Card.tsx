import React, { useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";

import { useSpring, animated as a } from "react-spring";
import * as styles from "./Card.css";

import { ThumbnailUrl, makeStrShorter } from "../lib";
import { Product, Item, Box } from "../../@types/queryTypes";
import { ShoppingCartOutlined, CheckOutlined } from "@ant-design/icons";

type inputType = Product | Item | Box;
interface Props {
  input: inputType;
  showDescription?: boolean;
  select?: (id: string | inputType, name?: string) => void;
  add?: (input: inputType) => void;
}

export default function Card({
  input,
  showDescription = false,
  select,
  add,
}: Props): React.ReactElement {
  const [loading, setLoading] = useState(true);
  const cart = useSelector((state: RootState) => state.cart.list);

  const skeletonStyle = useSpring({
    opacity: loading ? 1 : 0,
  });

  const isBundle = input.__typename === "Product";
  const handleSelect = () =>
    isBundle ? select(input.id, input.info.name) : select(input);
  const handleAddToCart = () => add(input);

  return (
    <div className={styles.wrapper}>
      {/* react-spring issue#653
       // @ts-ignore */}
      <a.div style={skeletonStyle} className={styles.skeleton} />
      <img
        onClick={handleSelect}
        onDragStart={(e) => e.preventDefault()}
        src={ThumbnailUrl({ images: input.info.image })}
        onLoad={() => setLoading(false)}
        draggable="false"
        alt=""
      />
      {isBundle ? (
        <div className={styles.content}>
          <h2 className={styles.title}>{input.info.name}</h2>
          {showDescription && (
            <div className={styles.desc}>
              {input.info.description?.length > 100
                ? makeStrShorter(input.info.description, 100)
                : input.info.description}
            </div>
          )}
          {cart.find((prod) => prod.id === input.id) ? (
            <CheckOutlined
              style={{ cursor: "default", filter: "hue-rotate(100deg)" }}
            />
          ) : (
            <ShoppingCartOutlined onClick={handleAddToCart} />
          )}
          <div className={styles.price}>{input.price.overall}₽</div>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.price}>{input.price.overall}₽</div>
        </div>
      )}
    </div>
  );
}
