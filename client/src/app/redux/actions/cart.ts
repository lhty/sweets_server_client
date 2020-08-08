import * as actions from "../constant/cart";
import { Product } from "../../@types/queryTypes";

interface AddToCart {
  type: typeof actions.ADD_TO_CART;
  payload: Product;
}

export const AddToCart = (product: Product): AddToCart => ({
  type: actions.ADD_TO_CART,
  payload: product,
});

interface RemoveFromCart {
  type: typeof actions.REMOVE_FROM_CART;
  payload: string;
}

export const RemoveFromCart = (id: string): RemoveFromCart => ({
  type: actions.REMOVE_FROM_CART,
  payload: id,
});

export type CartActionTypes = AddToCart | RemoveFromCart;
