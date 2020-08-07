import * as actions from "../constant/user";
import { UsersPermissionsRole } from "../../@types/queryTypes";

export const logIn = (user: UsersPermissionsRole) => ({
  type: actions.LOG_IN,
  payload: user,
});
