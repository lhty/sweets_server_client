import { UsersPermissionsMe } from "../../@types/queryTypes";
import { actions, UserActionTypes } from "../actions/user";

type UserStateType = {
  loading: boolean;
  error: boolean;
  user: UsersPermissionsMe | boolean;
  token: string;
};

const initial = { user: false, loading: false, error: false, token: "" };

export default function viewReducer(
  state = initial,
  action: UserActionTypes
): UserStateType {
  switch (action.type) {
    case actions.USER_LOADING:
      return { ...state, loading: true };
    case actions.USER_ERROR:
      return { ...state, loading: false, error: true };
    case actions.USER_RESET:
      return { ...state, loading: false, error: false };
    case actions.USER_SET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: false,
      };
    case actions.USER_SET_TOKEN:
      const newToken = action.payload;
      let token = localStorage.getItem(
        process.env.LOCAL_STORAGE_TOKEN.toString()
      );
      if (!token || token !== newToken) {
        localStorage.setItem(
          process.env.LOCAL_STORAGE_TOKEN.toString(),
          newToken
        );
        token = newToken;
      }
      return {
        ...state,
        token,
      };
    case actions.USER_LOGOUT:
      localStorage.removeItem(process.env.LOCAL_STORAGE_TOKEN.toString());
      return { ...state, user: false, loading: false, error: false, token: "" };
    default:
      return state;
  }
}
