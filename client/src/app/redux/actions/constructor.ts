import { Box, Item } from "../../@types/queryTypes";

export enum actions {
  CHANGE_PAGE = "CHANGE_PAGE",
  PICK_BOX = "PICK_BOX",
  VIEW_ITEM_DETAILS = "VIEW_ITEM_DETAILS",
  RESET = "RESET",
}

export type pageType = "box" | "slot" | "items" | "details";

interface IchangePage {
  type: typeof actions.CHANGE_PAGE;
  payload: pageType;
}

export const changePage = (page: pageType): IchangePage => ({
  type: actions.CHANGE_PAGE,
  payload: page,
});

interface IpickBox {
  type: typeof actions.PICK_BOX;
  payload: Box;
}

export const pickBox = (box: Box): IpickBox => ({
  type: actions.PICK_BOX,
  payload: box,
});

interface IviewItemDetails {
  type: typeof actions.VIEW_ITEM_DETAILS;
  payload: Item;
}

export const viewItemDetails = (item: Item): IviewItemDetails => ({
  type: actions.VIEW_ITEM_DETAILS,
  payload: item,
});

interface IconstructorReset {
  type: typeof actions.RESET;
}

export const constructorReset = () => ({
  type: actions.RESET,
});

export type ConstructorActionTypes =
  | IchangePage
  | IpickBox
  | IviewItemDetails
  | IconstructorReset;
