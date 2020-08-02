import * as actions from "../constant/view";

export const ChangeConstructorWidth = (size: number) => ({
  type: actions.TOGGLE_CONSTRUCTOR,
  payload: size,
});

export const ToggleHeaderPopup = (popup: "auth" | "cart" | null) => ({
  type: actions.TOGGLE_POPUP,
  payload: popup,
});
