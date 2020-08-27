import { Box } from "../../@types/queryTypes";

export enum actions {
  CHANGE_PAGE = "CHANGE_PAGE",
  PICK_BOX = "PICK_BOX",
}

export type pageType = "start" | "box" | "slot" | "items" | "item";

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

export type ConstructorActionTypes = IchangePage | IpickBox;
