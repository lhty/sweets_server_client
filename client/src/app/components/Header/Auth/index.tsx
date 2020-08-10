import React, { ReactElement } from "react";

import { useSelector } from "react-redux";
import AuthPage from "./AuthPage";

import { UserOutlined, LoadingOutlined } from "@ant-design/icons";
import { RootState } from "../../../redux/reducers";

interface Props {
  Handler: () => void;
  isOpen: string;
}

export default function ({ Handler, isOpen }: Props): ReactElement {
  const { user, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  return (
    <>
      {loading ? (
        <LoadingOutlined />
      ) : (
        <UserOutlined
          style={{ filter: user ? `none` : `grayscale(1)` }}
          onClick={Handler}
        />
      )}

      {isOpen === "auth" && <AuthPage {...{ loading, error }} />}
    </>
  );
}
