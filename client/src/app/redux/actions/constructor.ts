import * as actions from "../constant/constructor";
import { Box } from "../../@types/queryTypes";

interface createProduct {
  type: typeof actions.CREATE_PRODUCT;
  payload: Box;
}

export const createProduct = (box: Box) => ({
  type: actions.CREATE_PRODUCT,
  payload: box,
});

export type ConstructorActionTypes = createProduct;
