import React, { ReactElement } from "react";

import { ShoppingCartOutlined } from "@ant-design/icons";

interface Props {
  Handler: () => void;
}

export default function index({ Handler }: Props): ReactElement {
  return (
    <>
      <ShoppingCartOutlined onClick={Handler} />
    </>
  );
}
