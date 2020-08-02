import { Product } from "graphql/queryTypes";
import * as actions from "../constant/cart";

const initial: {
  cart: Product[];
} = {
  cart: [],
};

export default function cartReducer(state = initial, action: any) {
  switch (action.type) {
    case actions.ADD_TO_CART:
      return { ...state, cart: [...state.cart, action.payload] };

    default:
      return state;
  }
}
