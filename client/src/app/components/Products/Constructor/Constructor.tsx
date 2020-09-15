import React, { useState, ReactElement } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  changePage,
  pickBox,
  viewItemDetails,
  pageType,
  changeQuantity,
  addItemsToSet,
  RemoveItemFromSet,
} from "../../../redux/actions/constructor";
import { RootState } from "../../../redux/reducers";
import {
  Box,
  ComponentBundleItemInput,
  Item,
} from "../../../@types/queryTypes";

import { PlaySquareOutlined } from "@ant-design/icons";
import { Boxes } from "./Boxes";
import { Slots } from "./Slots";
import { Items } from "./Items";
import { Details } from "./Details";
import Nav from "./Nav";
import { Receipt } from "./Receipt";

export default ({
  onSubmit,
}: {
  onSubmit?: (arr: Array<ComponentBundleItemInput>) => void;
}): ReactElement => {
  const dispatch = useDispatch();
  const { box, set, page, details, quantity } = useSelector(
    (state: RootState) => state.bundle
  );

  const [selectedSlot, selectSlot] = useState(0);

  const handlers = {
    handleSelectPage(page: pageType) {
      dispatch(changePage(page));
    },
    handleSelectBox(box: Box) {
      dispatch(pickBox(box));
      handlers.handleSelectPage("slot");
    },
    handleViewItemDetails(input: Item | Box) {
      dispatch(viewItemDetails(input));
      handlers.handleSelectPage("details");
    },
    handlechangeQuantity(quantity: string) {
      dispatch(changeQuantity(quantity));
    },
    handleAddItemsToSet(input: Item, quantity: string) {
      dispatch(addItemsToSet(input, quantity, selectedSlot));
    },
    handleRemoveItemFromSet(id: number) {
      dispatch(RemoveItemFromSet(id));
    },
    handleSubmitSet(set: Array<Item>) {
      const data = set.map((item) => ({ item: item.id, letter: item.letter }));
      onSubmit(data);
    },
  };

  return (
    <>
      <Nav {...{ handlers, details, box, set, quantity, page }} />
      <Constructor {...{ handlers, box, set, page, selectSlot, details }} />
      <Receipt {...{ page, box, set }} />
    </>
  );
};

interface IConstructor {
  handlers: any;
  box: Box;
  set: Array<Item>;
  page: string;
  details: Box | Item;
  selectSlot: (n: number) => void;
}

const Constructor = ({
  handlers,
  box,
  set,
  page,
  details,
  selectSlot,
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
      return <Slots {...{ box, set, selectSlot, handlers }} />;
    case "items":
      return <Items select={handlers.handleViewItemDetails} />;
    case "details":
      return <Details {...{ input: details, set, handlers }} />;
    default:
      return (
        <PlaySquareOutlined
          onClick={() => handlers.handleSelectPage("box")}
          style={{ fontSize: "5rem", margin: "20px" }}
        />
      );
  }
};
