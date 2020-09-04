import React, { ReactElement } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  changePage,
  pickBox,
  viewItemDetails,
  pageType,
} from "../../../redux/actions/constructor";
import { RootState } from "../../../redux/reducers";
import { Box, Item } from "../../../@types/queryTypes";

import { PlaySquareOutlined } from "@ant-design/icons";
import { Boxes } from "./Boxes";
import { Slots } from "./Slots";
import { Items } from "./Items";
import { Details } from "./Details";
import Nav from "./Nav";
import { Receipt } from "./Receipt";

export default (): ReactElement => {
  const dispatch = useDispatch();
  const { box, set, page, details } = useSelector(
    (state: RootState) => state.bundle
  );

  const handlers = {
    handleSelectPage: (page: pageType) => {
      dispatch(changePage(page));
    },
    handleSelectBox: (box: Box) => {
      dispatch(pickBox(box));
      handlers.handleSelectPage("slot");
    },
    handleViewItemDetails: (input: Item | Box) => {
      dispatch(viewItemDetails(input));
      handlers.handleSelectPage("details");
    },
  };

  return (
    <>
      <Nav {...{ handlers, box, set, page }} />
      <Constructor {...{ handlers, box, set, page, details }} />
      <Receipt {...{ page, box, set }} />
    </>
  );
};

interface IConstructor {
  handlers: any;
  box: Box;
  set: Item[];
  page: string;
  details: Box | Item;
}

const Constructor = ({
  handlers,
  box,
  set,
  page,
  details,
}: IConstructor): ReactElement => {
  switch (page) {
    case "box":
      return (
        <Boxes
          {...{
            select: handlers.handleViewItemDetails,
            add: handlers.handleSelectBox,
          }}
        />
      );
    case "slot":
      return <Slots {...{ box, set, select: handlers.handleSelectPage }} />;
    case "items":
      return <Items select={handlers.handleViewItemDetails} />;
    case "details":
      return <Details {...{ input: details, handlers }} />;
    default:
      return (
        <PlaySquareOutlined
          onClick={() => handlers.handleSelectPage("box")}
          style={{ fontSize: "5rem", margin: "20px" }}
        />
      );
  }
};
