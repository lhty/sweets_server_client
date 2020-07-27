import React, { ReactElement } from "react";

import { useQuery } from "@apollo/client";
import * as getBanners from "./getBanners.graphql";
import { Banner as IBanner } from "graphql/queryTypes.d";

import Slider from "../Shared/Slider";
import Banner from "./Banner";

import * as styles from "./index.css";

export default function index(): ReactElement {
  const { data, loading } = useQuery(getBanners);

  if (loading) <p>Loading</p>;

  return (
    <section className={styles.container}>
      <Slider bullets={styles.bullets} scaleOnDrag>
        {data?.banners.map((banner: IBanner, i: number) => (
          <Banner key={i} {...{ banner }} />
        ))}
      </Slider>
    </section>
  );
}
