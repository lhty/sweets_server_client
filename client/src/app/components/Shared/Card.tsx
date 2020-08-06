import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducers";
import { AddToCart } from "../../redux/actions/cart";

import { useSpring, animated as a } from "react-spring";
import * as styles from "./Card.css";

import { ThumbnailUrl, makeStrShorter } from "../lib";
import { Product } from "../../graphql/queryTypes";
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
  const constructorWindowState = useSelector<RootState, string>(
    (state) => state.view.consructorWindow
  );
  const cart: Array<Product> = useSelector(
    (state: RootState) => state.cart.cart
  );
  const dispatch = useDispatch();

  const skeletonStyle = useSpring({
    opacity: loading ? 1 : 0,
  });

  return (
    <div className={styles.wrapper}>
      {/* react-spring issue#653
  // @ts-ignore */}
      <a.div style={skeletonStyle} className={styles.skeleton} />
      <img
        onClick={() => select(bundle.id, bundle.info.name)}
        src={ThumbnailUrl(bundle.info.image)}
        onLoad={() => setLoading(false)}
        draggable="false"
        alt=""
      />
      <div className={styles.content}>
        <h2 className={styles.title}>{bundle.info.name}</h2>
        {!constructorWindowState && (
          <>
            {!cart.includes(bundle) && (
              <ShoppingCartOutlined
                onClick={() => dispatch(AddToCart(bundle))}
              />
            )}
            <div className={styles.desc}>
              {bundle.info.description?.length > 100
                ? makeStrShorter(bundle.info.description, 100)
                : bundle.info.description}
            </div>
          </>
        )}
        <div className={styles.price}>{bundle.price.overall}₽</div>
      </div>
      {/* <div className={styles.success}></div> */}
    </div>
  );
}
