import React, { ReactElement } from "react";

import { ReactComponent as TitleText } from "../../assets/title.svg";
import { ReactComponent as Logo } from "../../assets/heart.svg";
import * as styles from "./Header.css";

import Auth from "./Auth";
import Cart from "./Cart";

interface Props {}

export default function Header({}: Props): ReactElement {
  return (
    <header
      onClick={() => {
        window.pageYOffset === 0 ? null : window.scrollTo(0, 0);
      }}
      className={styles.header}
    >
      <Auth />
      <Title />
      <Cart />
    </header>
  );
}

const Title = () => (
  <>
    <TitleText className={styles.header_title} />
    <Logo className={styles.header_logo} />
  </>
);
