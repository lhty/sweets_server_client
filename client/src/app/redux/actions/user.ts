import * as actions from "../constant/user";
import { UsersPermissionsRole } from "../../@types/queryTypes";

type loginDataType = {
  email: string;
  password: string;
};

interface logInType {
  type: typeof actions.USER_LOGIN;
  payload: loginDataType;
}

export const logIn = ({ email, password }: loginDataType) => ({
  type: actions.USER_LOGIN,
  payload: { email, password },
});

interface IsetUser {
  type: typeof actions.SET_USER;
  payload: UsersPermissionsRole;
}

export const setUser = (user: IsetUser) => ({
  type: actions.SET_USER,
  payload: user,
});

interface onLoadingType {
  type: typeof actions.USER_LOADING;
}

export const onLoading = (): onLoadingType => ({
  type: actions.USER_LOADING,
});

interface onErrorType {
  type: typeof actions.USER_ERROR;
}

export const onError = (): onErrorType => ({
  type: actions.USER_ERROR,
});

export type UserActionTypes =
  | logInType
  | onLoadingType
  | onErrorType
  | IsetUser;
