import * as actions from "../constant/cart";
import { Product } from "graphql/queryTypes";

export const AddToCart = (product: Product) => ({
  type: actions.ADD_TO_CART,
  payload: product,
});
