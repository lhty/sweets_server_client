import * as actions from "../constant/constructor";
import { Box } from "../../graphql/queryTypes";

export const createProduct = (box: Box) => ({
  type: actions.CREATE_PRODUCT,
  payload: box,
});
