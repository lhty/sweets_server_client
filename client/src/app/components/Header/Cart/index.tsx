import React, { ReactElement } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";

import { ShoppingCartOutlined } from "@ant-design/icons";

interface Props {
  Handler: () => void;
}

export default function index({ Handler }: Props): ReactElement {
  const cart = useSelector((state: RootState) => state.cart.list);

  return (
    <div
      style={{ filter: cart.length ? `none` : `grayscale(1)` }}
      onClick={cart.length ? Handler : null}
    >
      <ShoppingCartOutlined />
    </div>
  );
}
