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
import getUser from "./me.graphql";

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
  const [tryLogin, { error, loading }] = useMutation(logInMutation);
  const trySignup = () => {};
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
    if (loading) dispatch(onLoading());
    if (error) dispatch(onError());
  }, [error, loading]);

  return (
    <>
      {loading ? (
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
              signupHandler: trySignup,
              isLoading: loading,
            }}
          />
        ))}
    </>
  );
}
