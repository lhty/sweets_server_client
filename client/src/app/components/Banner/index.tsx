import React, { useReducer, useRef, ReactElement } from "react";

import { useQuery } from "@apollo/client";
import getBanners from "../../graphql/queries/getBanners.graphql";
import { Banner as bannerType } from "../../@types/queryTypes";

import Slider from "../Shared/Slider";
import Banner from "./Banner";

import useClickOutside from "../hooks/useClickOutside";
import * as styles from "./index.css";

export default function index(): ReactElement | null {
  const { data, loading } = useQuery(getBanners);
  const [isOpen, toggle] = useReducer((isOpen) => !isOpen, false);
  const bannerRef = useRef();
  useClickOutside(bannerRef, () => toggle(), isOpen);
  if (loading) return null;
  return (
    <section ref={bannerRef} className={styles.container}>
      <Slider hasBullets={styles.bullets} disabled={isOpen} scaleOnDrag>
        {data?.banners.map(
          (banner: bannerType) =>
            banner && <Banner key={banner.id} {...{ banner, isOpen, toggle }} />
        )}
      </Slider>
    </section>
  );
}
