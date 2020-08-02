import * as actions from "../constant/view";

export interface IviewState {
  consructorWindow: number;
  headerPopup: string | null;
}

const initial: IviewState = {
  consructorWindow: 0,
  headerPopup: null,
};

export default function viewReducer(state = initial, action: any) {
  switch (action.type) {
    case actions.TOGGLE_CONSTRUCTOR:
      return { ...state, consructorWindow: action.payload };
    case actions.TOGGLE_POPUP:
      return { ...state, headerPopup: action.payload };
    default:
      return state;
  }
}
