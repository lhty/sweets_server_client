import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducers";
import { AddToCart } from "../../redux/actions/cart";

import { useSpring, animated as a } from "react-spring";
import * as styles from "./Card.css";

import { ThumbnailUrl, makeStrShorter } from "../lib";
import { Product, Item, Box } from "../../@types/queryTypes";
import { ShoppingCartOutlined, CheckOutlined } from "@ant-design/icons";

interface Props {
  input: Product | Item | Box;
  showDescription?: boolean;
  select?: (...args: string[]) => void;
}

export default function Card({
  input,
  showDescription = false,
  select,
}: Props): React.ReactElement {
  const [loading, setLoading] = useState(true);
  const cart = useSelector((state: RootState) => state.cart.list);
  const dispatch = useDispatch();

  const skeletonStyle = useSpring({
    opacity: loading ? 1 : 0,
  });

  const isBundle = input.__typename === "Product";

  const handleSelect = () =>
    isBundle ? select(input.id, input.info.name) : select(input.id);

  const handleAddToCart = () =>
    isBundle ? dispatch(AddToCart(input as Product)) : () => {};

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
      <div className={styles.content}>
        <h2 className={styles.title}>{input.info.name}</h2>
        {showDescription && (
          <div className={styles.desc}>
            {input.info.description?.length > 100
              ? makeStrShorter(input.info.description, 100)
              : input.info.description}
          </div>
        )}
        {isBundle && cart.find((prod) => prod.id === input.id) ? (
          <CheckOutlined
            style={{ cursor: "default", filter: "hue-rotate(100deg)" }}
          />
        ) : (
          <ShoppingCartOutlined onClick={handleAddToCart} />
        )}
        <div className={styles.price}>{input.price.overall}₽</div>
      </div>
    </div>
  );
}
