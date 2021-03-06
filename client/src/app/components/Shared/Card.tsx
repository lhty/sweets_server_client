import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";

import * as styles from "./Card.css";

import { makeStrShorter } from "../lib";
import {
  Product,
  Box,
  ComponentInfoInfo,
  ComponentDimensionsDimensions,
} from "../../@types/queryTypes";
import Gallery from "./Gallery";
import { ItemMod } from "../../@types/utility";
import { CheckOutlined, PlusOutlined } from "@ant-design/icons";

type inputType = Product | ItemMod | Box;
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
  const cart = useSelector((state: RootState) => state.cart.list);
  const { box } = useSelector((state: RootState) => state.bundle);

  const typeOfInput = {
    isBundle: input.__typename === "Product",
    isBox: input.__typename === "Box",
    isItem: input.__typename === "Item",
  };

  const handleSelect = () =>
    typeOfInput.isBundle ? select(input.id, input.info.name) : select(input);
  const handleAdd = () => add(input);
  return (
    <div className={styles.wrapper}>
      <div className={styles.add}>
        {typeOfInput.isBundle &&
          (cart.find((prod) => prod.id === input.id) ? (
            <CheckOutlined style={{ cursor: "default" }} />
          ) : (
            <PlusOutlined onClick={handleAdd} />
          ))}
        {typeOfInput.isBox &&
          (box && box.id === input.id ? (
            <CheckOutlined style={{ cursor: "default" }} />
          ) : (
            <PlusOutlined onClick={handleAdd} />
          ))}
      </div>
      <div className={styles.select} onClick={handleSelect}>
        <Gallery images={input.info.image} card />
      </div>
      <div className={styles.content}>
        <Description {...{ type: input.__typename, ...input }} />
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
