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
} from "@ant-design/icons";
import { Item } from "../../../@types/queryTypes";

interface Props {}

export default function Bundle({}: Props): ReactElement {
  const history = useHistory();
  const { id } = useParams();
  const { data, loading } = useQuery(getBundle, { variables: { id } });

  const cart = useSelector((state: RootState) => state.cart.list);
  const dispatch = useDispatch();
  const handleAddToCart = () => dispatch(AddToCart(data.product));

  if (loading) return <></>;
  return (
    <section className={styles.container}>
      <DoubleLeftOutlined onClick={() => history.push("/")} />
      <div className={styles.pictures}>
        <Gallery images={data.product.info.image} bullets={styles.bullets} />
      </div>
      <div className={styles.desc}>
        <h2>{data.product.info.name}</h2>
        <p>{data.product.info.description}</p>
      </div>
      <div className={styles.dimensions}>
        diemsions :<p>{data.product.dimensions.weight} г</p>
        <p>{data.product.dimensions.width} мм</p>
        <p>{data.product.dimensions.breadth} мм</p>
        <p>{data.product.dimensions.height} мм</p>
      </div>
      <div className={styles.inside}>
        recipe :
        {data.product.bundle.map(({ item }: { item: Item }, i: number) => (
          <p key={i}>{item?.info.name}</p>
        ))}
      </div>
      <div className={styles.price}>
        <p>{data.product.price.overall} ₽</p>
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
