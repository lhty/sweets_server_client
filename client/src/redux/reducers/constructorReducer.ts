import { Product } from "graphql/queryTypes";

const initial: Product | {} = {};

export default function constructorReducer(state = initial, action: any) {
  switch (action.type) {
    case false:
      return state;

    default:
      return state;
  }
}
