import React, { useEffect, ReactElement } from "react";

import { useSelector, useDispatch } from "react-redux";
import CartPage from "./CartPage";

import { ShoppingCartOutlined } from "@ant-design/icons";
import { RootState } from "../../../redux/reducers";
import { ToggleHeaderPopup } from "../../../redux/actions/view";

interface Props {
  Handler: () => void;
  isOpen: string;
}

export default function index({ Handler, isOpen }: Props): ReactElement {
  const cart = useSelector((state: RootState) => state.cart.list);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cart.length) dispatch(ToggleHeaderPopup(null));
  }, [cart.length]);

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
