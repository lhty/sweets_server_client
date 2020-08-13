import React, { useEffect, ReactElement } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  onLoading,
  onError,
  onLogout,
  setUser,
} from "../../../redux/actions/user";
import { RootState } from "../../../redux/reducers";

import { useMutation, useLazyQuery } from "@apollo/client";
import logInMutation from "./logIn.graphql";
import signUpMutation from "./signUp.graphql";
import getUser from "./getUserInfo.graphql";

import AuthPage from "./AuthPage";
import ProfilePage from "./ProfilePage";

import { UserOutlined, LoadingOutlined } from "@ant-design/icons";

interface Props {
  Handler: () => void;
  isOpen: string;
}

export default function ({ Handler, isOpen }: Props): ReactElement {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.user);
  const [getUserData, UserData] = useLazyQuery(getUser);
  const [tryLogin, Login] = useMutation(logInMutation);
  const [trySignUp, Signup] = useMutation(signUpMutation);
  const handleLogout = () => dispatch(onLogout());

  useEffect(() => {
    if (token && UserData.data) {
      dispatch(setUser(UserData.data.me));
    }
    if (!user && token && !UserData.loading) {
      getUserData();
    }
  }, [token, UserData.loading]);

  useEffect(() => {
    if (Login.loading || Signup.loading) dispatch(onLoading());
    if (Login.error || Signup.error) dispatch(onError());
  }, [Login, Signup]);

  return (
    <>
      {Login.loading || Signup.loading ? (
        <LoadingOutlined />
      ) : (
        <UserOutlined
          style={{ opacity: user || isOpen === "auth" ? "1" : "0.5" }}
          onClick={Handler}
        />
      )}

      {isOpen === "auth" &&
        (user ? (
          <ProfilePage {...{ user, handleLogout }} />
        ) : (
          <AuthPage
            {...{
              loginHandler: tryLogin,
              signupHandler: trySignUp,
              isLoading: Login.loading || Signup.loading,
            }}
          />
        ))}
    </>
  );
}
