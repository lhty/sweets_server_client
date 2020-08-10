import * as actions from "../constant/user";
import { UsersPermissionsRole } from "../../@types/queryTypes";
import { UserActionTypes } from "../actions/user";

type UserStateType = {
  loading: boolean;
  error: boolean;
  user: UsersPermissionsRole | boolean;
};

const initial = { user: false, loading: false, error: false };

export default function viewReducer(
  state = initial,
  action: UserActionTypes
): UserStateType {
  switch (action.type) {
    case actions.USER_LOGIN:
      return state;
    case actions.USER_LOADING:
      return { ...state, loading: true };
    case actions.USER_ERROR:
      return { ...state, error: true };
    case actions.SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
