import { Box } from "../../@types/queryTypes";

export enum actions {
  PICK_BOX = "PICK_BOX",
}

interface pickBox {
  type: typeof actions.PICK_BOX;
  payload: Box;
}

export const pickBox = (box: Box): pickBox => ({
  type: actions.PICK_BOX,
  payload: box,
});

export type ConstructorActionTypes = pickBox;
