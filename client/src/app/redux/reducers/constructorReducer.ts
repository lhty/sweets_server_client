import {
  Tags,
  ComponentInfoInfo,
  ComponentPricePrice,
  Box,
  AdminUser,
  Item,
} from "../../@types/queryTypes";
import {
  actions,
  ConstructorActionTypes,
  pageType,
} from "../actions/constructor";

type ConstructorStateType = {
  info: ComponentInfoInfo;
  price: ComponentPricePrice;
  set: Array<Item>;
  box: Box;
  created_by: AdminUser;
  updated_by: AdminUser;
  tags: Array<Tags>;
  page: pageType;
  details: Item;
};

const initial: ConstructorStateType = {
  info: null,
  price: null,
  set: null,
  box: null,
  created_by: null,
  updated_by: null,
  tags: null,
  page: null,
  details: null,
};

export default function constructorReducer(
  state = initial,
  action: ConstructorActionTypes
): ConstructorStateType {
  switch (action.type) {
    case actions.PICK_BOX:
      return {
        ...state,
        box: action.payload,
        set: new Array(action.payload.countmin).fill(false),
      };
    case actions.CHANGE_PAGE:
      return { ...state, page: action.payload };
    case actions.VIEW_ITEM_DETAILS:
      return { ...state, details: action.payload };
    case actions.RESET:
      return initial;
    default:
      return state;
  }
}
