import React, { ReactElement } from "react";

import { UserOutlined } from "@ant-design/icons";

export default function ({ Handler }: { Handler: () => void }): ReactElement {
  return (
    <>
      <UserOutlined onClick={Handler} />
    </>
  );
}
