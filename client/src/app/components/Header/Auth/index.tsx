import React, { ReactElement } from "react";

import AuthPage from "./AuthPage";

import { UserOutlined } from "@ant-design/icons";
import { UsersPermissionsRole } from "../../../@types/queryTypes";

interface Props {
  Handler: () => void;
  isOpen: string;
  user: UsersPermissionsRole | boolean;
}

export default function ({ Handler, isOpen, user }: Props): ReactElement {
  return (
    <>
      <UserOutlined
        style={{ filter: user ? `none` : `grayscale(1)` }}
        onClick={Handler}
      />
      {isOpen === "auth" && <AuthPage />}
    </>
  );
}
