import { Box } from "../../@types/queryTypes";

export enum actions {
  CREATE_PRODUCT = "CREATE_PRODUCT",
}

interface createProduct {
  type: typeof actions.CREATE_PRODUCT;
  payload: Box;
}

export const createProduct = (box: Box) => ({
  type: actions.CREATE_PRODUCT,
  payload: box,
});

export type ConstructorActionTypes = createProduct;
