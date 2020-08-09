import * as actions from "../constant/user";

type loginDataType = {
  email: string;
  password: string;
};

interface logInType {
  type: typeof actions.LOG_IN;
  payload: loginDataType;
}

export const logIn = ({ email, password }: loginDataType) => ({
  type: actions.LOG_IN,
  payload: { email, password },
});

export type UserActionTypes = logInType;
