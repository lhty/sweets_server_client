import React, { useState } from "react";

import { useSpring, animated as a } from "react-spring";
import * as styles from "./Card.css";

import { ThumbnailUrl, makeStrShorter } from "../lib";
import { Product } from "graphql/queryTypes";
import { ShoppingCartOutlined } from "@ant-design/icons";

interface Props {
  bundle: Product;
  select?: (id: string, title: string) => void;
}

export default function Card({
  bundle,
  select = () => {},
}: Props): React.ReactElement {
  const [loading, setLoading] = useState(true);

  const skeletonStyle = useSpring({
    opacity: loading ? 1 : 0,
  });

  return (
    <div className={styles.wrapper}>
      <a.div style={skeletonStyle} className={styles.skeleton} />
      <img
        onClick={() => select(bundle.id, bundle.info.name)}
        src={ThumbnailUrl(bundle.info.image)}
        onLoad={() => setLoading(false)}
        draggable="false"
        alt=""
      />
      <div className={styles.content}>
        <ShoppingCartOutlined />
        <h2 className={styles.title}>{bundle.info.name}</h2>
        <div className={styles.desc}>
          {bundle.info.description?.length > 100
            ? makeStrShorter(bundle.info.description, 100)
            : bundle.info.description}
        </div>
        <span className={styles.price}>{bundle.price.overall}₽</span>
      </div>
      {/* <div className={styles.success}></div> */}
    </div>
  );
}
