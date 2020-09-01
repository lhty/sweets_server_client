import { Box, Item } from "../../@types/queryTypes";

export enum actions {
  CHANGE_PAGE = "CHANGE_PAGE",
  PICK_BOX = "PICK_BOX",
  VIEW_ITEM_DETAILS = "VIEW_ITEM_DETAILS",
  RESET = "RESET",
}

export enum constructorPage {
  "initial",
  "box",
  "slot",
  "items",
  "details",
}
export type pageType = keyof typeof constructorPage;

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
  payload: Item | Box;
}

export const viewItemDetails = (input: Item | Box): IviewItemDetails => ({
  type: actions.VIEW_ITEM_DETAILS,
  payload: input,
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
