import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";

import { ReactComponent as TitleText } from "../../assets/title.svg";
import { ReactComponent as Logo } from "../../assets/heart.svg";
import * as styles from "./Header.css";

import { useSelector, useDispatch } from "react-redux";
import { ToggleHeaderPopup } from "../../redux/actions/view";
import { RootState } from "../../redux/reducers";

import Auth from "./Auth";
import AuthPage from "./Auth/AuthPage";
import Cart from "./Cart";
import CartPage from "./Cart/CartPage";

interface Props {}

export default function Header({}: Props): ReactElement {
  const isOpen = useSelector<RootState>((state) => state.view.headerPopup);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Auth
          Handler={() =>
            dispatch(ToggleHeaderPopup(isOpen === "auth" ? null : "auth"))
          }
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
        />
      </div>
      {isOpen === "auth" && <AuthPage />}
      {isOpen === "cart" && <CartPage />}
    </header>
  );
}

const Title = ({ Handler }: { Handler: () => void }) => (
  <div
    onClick={() => {
      Handler();
      window.pageYOffset === 0 ? null : window.scrollTo(0, 0);
    }}
  >
    <TitleText className={styles.header_title} />
    <Logo className={styles.header_logo} />
  </div>
);
