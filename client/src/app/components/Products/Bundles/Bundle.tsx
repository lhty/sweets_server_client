import React, { ReactElement } from "react";
import { useParams, useHistory } from "react-router-dom";

import { useQuery } from "@apollo/client";
import getBundle from "../getBundle.graphql";

import Gallery from "../../Shared/Gallery";

import * as styles from "./Bundle.css";
import { DoubleLeftOutlined } from "@ant-design/icons";
import { Item } from "../../../@types/queryTypes";

interface Props {}

export default function Bundle({}: Props): ReactElement {
  const history = useHistory();
  const { id } = useParams();
  const { data, loading } = useQuery(getBundle, { variables: { id } });

  if (loading) return <></>;

  return (
    <section className={styles.container}>
      <DoubleLeftOutlined onClick={() => history.push("/")} />
      <div className={styles.pictures}>
        <Gallery images={data.product.info.image} bullets={styles.bullets} />
      </div>
      <div className={styles.desc}>
        description :<h2>{data.product.info.name}</h2>
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
          <p key={i}>{item.info.name}</p>
        ))}
      </div>
      <div className={styles.price}>
        price :<p>{data.product.price.overall} ₽</p>
      </div>
    </section>
  );
}
