import {
  Tags,
  ComponentInfoInfo,
  ComponentPricePrice,
  ComponentBundleBundle,
  Box,
  AdminUser,
} from "../../@types/queryTypes";
import { actions, ConstructorActionTypes, page } from "../actions/constructor";

type ConstructorStateType = {
  info: ComponentInfoInfo;
  price: ComponentPricePrice;
  bundle: Array<ComponentBundleBundle> | boolean;
  box: Box | boolean;
  created_by: AdminUser;
  updated_by: AdminUser;
  tags: Array<Tags>;
  page: page;
};

const initial: ConstructorStateType = {
  info: null,
  price: null,
  bundle: null,
  box: null,
  created_by: null,
  updated_by: null,
  tags: null,
  page: "start",
};

export default function constructorReducer(
  state = initial,
  action: ConstructorActionTypes
): ConstructorStateType {
  switch (action.type) {
    case actions.PICK_BOX:
      return { ...state, box: action.payload };
    default:
      return state;
  }
}
