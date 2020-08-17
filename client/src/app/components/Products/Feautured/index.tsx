import React, { ReactElement } from "react";

import Featured from "./Featured";

import { Product } from "../../../@types/queryTypes";

interface Props {
  bundle: Product;
}

export default function index({ bundle }: Props): ReactElement {
  if (!bundle) return <></>;

  return <Featured bundle={bundle} />;
}
