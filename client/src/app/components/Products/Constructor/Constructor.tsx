import React, { ReactElement } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  changePage,
  pageType,
  pickBox,
  viewItemDetails,
} from "../../../redux/actions/constructor";
import { RootState } from "../../../redux/reducers";
import { Box, Item } from "../../../@types/queryTypes";

import { PlaySquareOutlined } from "@ant-design/icons";
import { Boxes } from "./Boxes";
import { Slots } from "./Slots";
import { Items } from "./Items";
import { Details } from "./Details";

export default function Constructor(): ReactElement {
  const dispatch = useDispatch();

  const { box, set, page, details } = useSelector(
    (state: RootState) => state.bundle
  );

  const handleSelectPage = (page: pageType) => {
    dispatch(changePage(page));
  };

  const handleSelectBox = (box: Box) => {
    dispatch(pickBox(box));
    handleSelectPage("slot");
  };

  const handleViewItemDetails = (item: Item) => {
    dispatch(viewItemDetails(item));
    handleSelectPage("details");
  };

  switch (page) {
    case "start":
      return (
        <PlaySquareOutlined
          onClick={() => dispatch(changePage("box"))}
          style={{ fontSize: "5rem" }}
        />
      );
    case "box":
      return <Boxes select={handleSelectBox} />;
    case "slot":
      return <Slots {...{ box, set, select: handleSelectPage }} />;
    case "items":
      return <Items select={handleViewItemDetails} />;
    case "details":
      return <Details {...{ item: details }} />;
    default:
      return <></>;
  }
}
