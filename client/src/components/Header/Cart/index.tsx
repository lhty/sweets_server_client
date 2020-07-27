import React, { ReactElement } from "react";

import { ShoppingCartOutlined } from "@ant-design/icons";

interface Props {}

export default function index({}: Props): ReactElement {
  return (
    <>
      <ShoppingCartOutlined />
    </>
  );
}
