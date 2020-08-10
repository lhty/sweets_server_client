import * as actions from "../constant/user";

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

export type UserActionTypes = logInType | onLoadingType | onErrorType;
