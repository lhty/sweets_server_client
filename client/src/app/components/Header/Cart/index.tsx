import React, { ReactElement } from "react";

import CartPage from "./CartPage";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Product } from "../../../@types/queryTypes";

interface Props {
  Handler: () => void;
  isOpen: string;
  cart: Product[];
}

export default function index({ Handler, isOpen, cart }: Props): ReactElement {
  return (
    <>
      <ShoppingCartOutlined
        style={{ filter: cart.length ? `none` : `grayscale(1)` }}
        onClick={cart.length ? Handler : null}
      />
      {isOpen === "cart" && <CartPage cart={cart} />}
    </>
  );
}
