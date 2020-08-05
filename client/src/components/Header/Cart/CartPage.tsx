import React, { ReactElement } from "react";
import * as styles from "./CartPage.css";

// import { useSelector, useDispatch } from "react-redux";
// import {} from "../../../redux/actions/cart";
// import { RootState } from "../../../redux/reducers";

interface Props {}

function CartPage({}: Props): ReactElement {
  // const cartState = useSelector<RootState>((state) => state.cart);
  // const dispatch = useDispatch();

  return <div className={styles.Cart}></div>;
}

export default CartPage;
