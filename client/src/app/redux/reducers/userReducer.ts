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
    case actions.LOG_IN:
      return state;
    default:
      return state;
  }
}
