import * as actions from "../constant/view";

export const ChangeConstructorWidth = (size: "half" | "full" | "closed") => ({
  type: actions.CONSTRUCTOR_WIDTH,
  payload: size,
});
