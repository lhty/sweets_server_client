import {
  Product,
  Tags,
  ComponentInfoInfo,
  ComponentDimensionsDimensions,
  ComponentPricePrice,
  ComponentBundleBundle,
  Box,
  AdminUser,
} from "../../@types/queryTypes";
import { ConstructorActionTypes } from "../actions/constructor";
import * as actions from "../constant/constructor";

type ConstructorStateType = {
  info?: ComponentInfoInfo;
  dimensions?: ComponentDimensionsDimensions;
  price?: ComponentPricePrice;
  bundle?: ComponentBundleBundle;
  box?: Box;
  created_by?: AdminUser;
  updated_by?: AdminUser;
  tags?: Array<Tags>;
};

const initial: ConstructorStateType = {};

export default function constructorReducer(
  state = initial,
  action: ConstructorActionTypes
): ConstructorStateType {
  switch (action.type) {
    case actions.CREATE_PRODUCT:
      return state;
    default:
      return state;
  }
}
