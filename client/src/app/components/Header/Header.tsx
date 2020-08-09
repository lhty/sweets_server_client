import React, { useRef, ReactElement } from "react";
import { useHistory } from "react-router-dom";

import { ReactComponent as TitleText } from "../../../assets/title.svg";
import { ReactComponent as Logo } from "../../../assets/heart.svg";
import * as styles from "./Header.css";

import { useSelector, useDispatch } from "react-redux";
import { ToggleHeaderPopup } from "../../redux/actions/view";
import { RootState } from "../../redux/reducers";

import Auth from "./Auth";
import Cart from "./Cart";

import useClickOutside from "../hooks/useClickOutside";

interface Props {}

export default function Header({}: Props): ReactElement {
  const isOpen = useSelector((state: RootState) => state.view.headerPopup);
  const cart = useSelector((state: RootState) => state.cart.list);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const headerRef = useRef();

  useClickOutside(headerRef, () => dispatch(ToggleHeaderPopup(null)));

  return (
    <header ref={headerRef} className={styles.header}>
      <Auth
        Handler={() =>
          dispatch(ToggleHeaderPopup(isOpen === "auth" ? null : "auth"))
        }
        isOpen={isOpen}
        user={user}
      />
      <Title
        Handler={() => {
          dispatch(ToggleHeaderPopup(null));
          history.replace("/");
        }}
      />
      <Cart
        Handler={() =>
          dispatch(ToggleHeaderPopup(isOpen === "cart" ? null : "cart"))
        }
        isOpen={isOpen}
        cart={cart}
      />
    </header>
  );
}

const Title = ({ Handler }: { Handler: () => void }) => {
  return (
    <div
      onClick={() => {
        Handler();
        window.pageYOffset === 0 ? null : window.scrollTo(0, 0);
      }}
    >
      <Logo className={styles.header_logo} />
      <TitleText className={styles.header_title} />
    </div>
  );
};