import React, { ReactElement } from "react";

import { useQuery } from "@apollo/client";
import * as getBanners from "./getBanners.graphql";
import { Banner as bannerType } from "../../@types/queryTypes";

import Slider from "../Shared/Slider";
import Banner from "./Banner";

import * as styles from "./index.css";

export default function index(): ReactElement {
  const { data, loading } = useQuery(getBanners);

  if (loading) <p>Loading</p>;

  return (
    <section className={styles.container}>
      <Slider hasBullets={styles.bullets} scaleOnDrag>
        {data?.banners.map(
          (banner: bannerType, i: number) =>
            banner && <Banner key={i} {...{ banner }} />
        )}
      </Slider>
    </section>
  );
}
