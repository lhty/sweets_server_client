import { Box } from "../../@types/queryTypes";

export enum actions {
  PICK_PAGE = "PICK_PAGE",
  PICK_BOX = "PICK_BOX",
}

export type page = "start" | "box" | "slot" | "items" | "item";

interface pickPage {
  type: typeof actions.PICK_PAGE;
  payload: page;
}

export const pickPage = (page: page): pickPage => ({
  type: actions.PICK_PAGE,
  payload: page,
});

interface pickBox {
  type: typeof actions.PICK_BOX;
  payload: Box;
}

export const pickBox = (box: Box): pickBox => ({
  type: actions.PICK_BOX,
  payload: box,
});

export type ConstructorActionTypes = pickPage | pickBox;
