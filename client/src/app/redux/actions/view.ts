import * as actions from "../constant/view";

interface ChangeConstructorWidth {
  type: typeof actions.TOGGLE_CONSTRUCTOR;
  payload: number;
}

export const ChangeConstructorWidth = (size: number) => ({
  type: actions.TOGGLE_CONSTRUCTOR,
  payload: size,
});

interface ToggleHeaderPopup {
  type: typeof actions.TOGGLE_POPUP;
  payload: "auth" | "cart" | null;
}

export const ToggleHeaderPopup = (popup: "auth" | "cart" | null) => ({
  type: actions.TOGGLE_POPUP,
  payload: popup,
});

export type ViewActionTypes = ChangeConstructorWidth | ToggleHeaderPopup;
