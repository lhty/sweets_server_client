import { Product } from "graphql/queryTypes";
import * as actions from "../constant/cart";

const initial: {
  cart: Product[] | [];
} = {
  cart: [],
};

type actionType = {
  type: string;
  payload: Product;
};

export default function cartReducer(state = initial, action: actionType) {
  switch (action.type) {
    case actions.ADD_TO_CART:
      return { ...state, cart: [...state.cart, action.payload] };

    default:
      return state;
  }
}
