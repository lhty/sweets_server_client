import React, { ReactElement } from "react";
import * as styles from "./CartPage.css";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/reducers";
import { RemoveFromCart } from "../../../redux/actions/cart";

interface Props {}

function CartPage({}: Props): ReactElement {
  const cart = useSelector((state: RootState) => state.cart.list);
  const dispatch = useDispatch();
  console.log(cart);
  return (
    <div className={styles.Cart}>
      {cart.map((prod) => (
        <div key={prod.id} onClick={() => dispatch(RemoveFromCart(prod.id))}>
          {prod.info.name}
        </div>
      ))}
    </div>
  );
}

export default CartPage;
