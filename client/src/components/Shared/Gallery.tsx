import React, { ReactElement } from "react";

import { ThumbnailUrl } from "../lib/";
import Slider from "./Slider";

import * as styles from "./Gallery.css";
import { UploadFile } from "graphql/queryTypes";

interface Props {
  images: UploadFile[];
  bullets?: string;
}

const Gallery = ({ images, bullets }: Props): ReactElement => {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <Slider hasBullets={bullets}>
          {images.map((image, i) => (
            <img
              key={image.id}
              src={ThumbnailUrl(image, i)}
              alt=""
              draggable="false"
            />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Gallery;
