import React, { useRef, useEffect, useState, ReactElement } from "react";
import { useHistory } from "react-router-dom";

import { ReactComponent as TitleTextSvg } from "../../../assets/title.svg";
import { ReactComponent as LogoSvg } from "../../../assets/heart.svg";
import * as styles from "./Header.css";

import { useSpring, animated as a } from "react-spring";

import { useSelector, useDispatch } from "react-redux";
import { ToggleHeaderPopup } from "../../redux/actions/view";
import { RootState } from "../../redux/reducers";

import Auth from "./Auth";
import Cart from "./Cart";

import useClickOutside from "../hooks/useClickOutside";
import { SmallDashOutlined } from "@ant-design/icons";

export default function Header(): ReactElement {
  const isOpen = useSelector((state: RootState) => state.view.headerPopup);
  const dispatch = useDispatch();
  const history = useHistory();
  const headerRef = useRef();

  const [scrollPosition, setSrollPosition] = useState(0);

  const handleOffsetTracker = () => {
    const position = window.pageYOffset;
    setSrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleOffsetTracker, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleOffsetTracker);
    };
  }, []);

  const { offset, padding } = useSpring({
    offset: scrollPosition,
    padding: scrollPosition ? 0 : 5,
  });

  useClickOutside(headerRef, () => dispatch(ToggleHeaderPopup(null)));

  return (
    <a.header
      style={{
        backgroundColor: offset.to(
          (offset) => `rgba(253, 241, 236, ${offset / 100}) `
        ),
        boxShadow: offset.to(
          (offset) =>
            `0 10px 40px -10px rgb(0 0 0 / ${Math.min(offset / 1000, 0.5)})`
        ),
        padding,
      }}
      ref={headerRef}
      className={styles.header}
    >
      <Auth
        Handler={() =>
          dispatch(ToggleHeaderPopup(isOpen === "auth" ? null : "auth"))
        }
        isOpen={isOpen}
      />
      <Title
        Handler={() => {
          dispatch(ToggleHeaderPopup(null));
          history.replace("/");
        }}
        offset={scrollPosition}
      />
      <Cart
        Handler={() =>
          dispatch(ToggleHeaderPopup(isOpen === "cart" ? null : "cart"))
        }
        isOpen={isOpen}
      />
    </a.header>
  );
}

const Title = ({
  Handler,
  offset,
}: {
  Handler: () => void;
  offset: number;
}) => {
  const { s, top, opacity } = useSpring({
    top: offset ? -3 : 7,
    s: offset,
    opacity: offset ? 0 : 1,
  });

  const Logo = a(LogoSvg);
  const TitleText = a(TitleTextSvg);

  return (
    <a.div
      style={{
        position: "relative",
        top,
        transform: s.to((s) => `scale(${1.3 - Math.min(s / 10, 0.5)})`),
      }}
      onClick={() => {
        Handler();
        window.pageYOffset === 0 ? null : window.scrollTo(0, 0);
      }}
    >
      <Logo className={styles.header_logo} />
      {/* @ts-ignore */}
      <TitleText style={{ opacity }} className={styles.header_title} />
    </a.div>
  );
};
