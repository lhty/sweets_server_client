import React, { ReactElement } from "react";
import { useParams, useHistory } from "react-router-dom";

import { useQuery } from "@apollo/client";
import getBundle from "../../../graphql/queries/getBundle.graphql";

import { useSelector, useDispatch } from "react-redux";
import { AddToCart } from "../../../redux/actions/cart";
import { RootState } from "../../../redux/reducers";

import Gallery from "../../Shared/Gallery";

import * as styles from "./Bundle.css";
import {
  DoubleLeftOutlined,
  CheckOutlined,
  ShoppingCartOutlined,
  ColumnWidthOutlined,, ColumnHeightOutlined, VerticalAlignTopOutlined, DownloadOutlined
} from "@ant-design/icons";
import { Item } from "../../../@types/queryTypes";
import Loader from "../../Shared/Loader";

interface Props {}

export default function Bundle({}: Props): ReactElement {
  const history = useHistory();
  const {
    id,
  }: {
    id: string;
  } = useParams();
  const { data, loading } = useQuery(getBundle, { variables: { id } });

  const cart = useSelector((state: RootState) => state.cart.list);
  const dispatch = useDispatch();
  const handleAddToCart = () => dispatch(AddToCart(data.product));

  if (loading)
    return (
      <section className={styles.container}>
        <Loader />
      </section>
    );
  return (
    <section className={styles.container}>
      <DoubleLeftOutlined
        className={styles.back}
        onClick={() => history.push("/")}
      />
      <div className={styles.pictures}>
        <Gallery images={data.product.info.image} bullets={styles.bullets} />
      </div>
      <div className={styles.desc}>
        <h2>{data.product.info.name}</h2>
        <p>{data.product.info.description}</p>
      </div>
      <div className={styles.info}>
        <div className={styles.info_inside}>
          внутри :
          {data.product.bundle.map(({ item }: { item: Item }, i: number) => (
            <p key={i}>{item?.info.name}</p>
          ))}
        </div>
        <div className={styles.info_dimensions}>
          <ColumnWidthOutlined />
          <p>ширина : {data.product.dimensions.width} мм</p>
          <ColumnHeightOutlined />
          <p>длина : {data.product.dimensions.breadth} мм</p>
          <VerticalAlignTopOutlined /><p>высота : {data.product.dimensions.height} мм</p>
          <DownloadOutlined /><p>вес : {data.product.dimensions.weight} г</p>
        </div>
      </div>
      <div className={styles.price}>
        <h2>{data.product.price.overall}<span>₽</span></h2>
        {cart.find((prod) => prod.id === data.product.id) ? (
          <CheckOutlined
            style={{ cursor: "default", filter: "hue-rotate(100deg)" }}
          />
        ) : (
          <ShoppingCartOutlined onClick={handleAddToCart} />
        )}
      </div>
    </section>
  );
}
