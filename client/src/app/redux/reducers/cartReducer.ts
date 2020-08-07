import { Product } from "../../@types/queryTypes";
import * as actions from "../constant/cart";

const initial: {
  list: Product[] | [];
} = {
  list: [],
};

type actionType = {
  type: string;
  payload: Product;
};

export default function cartReducer(state = initial, action: actionType) {
  switch (action.type) {
    case actions.ADD_TO_CART:
      return { ...state, list: [...state.list, action.payload] };

    default:
      return state;
  }
}
