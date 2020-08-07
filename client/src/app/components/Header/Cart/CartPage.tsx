import React, { ReactElement } from "react";
import * as styles from "./CartPage.css";

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import { Product } from "../../../@types/queryTypes";

interface Props {}

function CartPage({}: Props): ReactElement {
  const cart: Array<Product> = useSelector(
    (state: RootState) => state.cart.list
  );

  return (
    <div className={styles.Cart}>
      {JSON.stringify(
        cart.map((prod: Product) => prod.info.name + prod.id),
        null,
        2
      )}
    </div>
  );
}

export default CartPage;
