import * as actions from "../constant/view";

interface ChangeConstructorWidthType {
  type: typeof actions.TOGGLE_CONSTRUCTOR;
  payload: number;
}

export const ChangeConstructorWidth = (size: number) => ({
  type: actions.TOGGLE_CONSTRUCTOR,
  payload: size,
});

interface ToggleHeaderPopupType {
  type: typeof actions.TOGGLE_POPUP;
  payload: "auth" | "cart" | null;
}

export const ToggleHeaderPopup = (popup: "auth" | "cart" | null) => ({
  type: actions.TOGGLE_POPUP,
  payload: popup,
});

export type ViewActionTypes =
  | ChangeConstructorWidthType
  | ToggleHeaderPopupType;
