import React, { useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";

import { useSpring, animated as a } from "react-spring";
import * as styles from "./Card.css";

import { ThumbnailUrl, makeStrShorter } from "../lib";
import {
  Product,
  Item,
  Box,
  ComponentInfoInfo,
  ComponentDimensionsDimensions,
} from "../../@types/queryTypes";
import { ShoppingCartOutlined, CheckOutlined } from "@ant-design/icons";

type inputType = Product | Item | Box;
interface Props {
  input: inputType;
  select?: (id: string | inputType, name?: string) => void;
  add?: (input: inputType) => void;
}

export default function Card({
  input,
  select,
  add,
}: Props): React.ReactElement {
  const [loading, setLoading] = useState(true);
  const cart = useSelector((state: RootState) => state.cart.list);

  const skeletonStyle = useSpring({
    opacity: loading ? 1 : 0,
  });

  const typeOfInput = {
    isBundle: input.__typename === "Product",
    isBox: input.__typename === "Box",
    isItem: input.__typename === "Item",
  };

  const handleSelect = () =>
    typeOfInput.isBundle ? select(input.id, input.info.name) : select(input);
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
      <div className={styles.content}>
        <Description {...{ type: input.__typename, ...input }} />
        {typeOfInput.isBundle &&
          (cart.find((prod) => prod.id === input.id) ? (
            <CheckOutlined
              style={{ cursor: "default", filter: "hue-rotate(100deg)" }}
            />
          ) : (
            <ShoppingCartOutlined onClick={handleAddToCart} />
          ))}
        <div className={styles.price}>{input.price.overall}₽</div>
      </div>
    </div>
  );
}

interface IDescription {
  type: string;
  info?: ComponentInfoInfo;
  dimensions?: ComponentDimensionsDimensions;
  countmin?: number;
  countmax?: number;
}

const Description = ({
  type,
  info,
  dimensions,
  countmin,
  countmax,
}: IDescription) => {
  switch (type) {
    case "Box":
      return (
        <div className={styles.desc}>
          {/* <p>ширина : {dimensions.width} мм</p>
          <p>длина : {dimensions.breadth} мм</p>
          <p>высота : {dimensions.height} мм</p>
          <p>вес : {dimensions.weight} г</p> */}
          <p>
            от {countmin} до {countmax} шт
          </p>
        </div>
      );
    case "Item":
      return <h2 className={styles.title}>{info.name}</h2>;
    default:
      return (
        <>
          <h2 className={styles.title}>{info.name}</h2>
          <div className={styles.desc}>
            <p>
              {info.description?.length > 100
                ? makeStrShorter(info.description, 100)
                : info.description}
            </p>
          </div>
        </>
      );
  }
};
