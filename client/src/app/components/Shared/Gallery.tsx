import React, { useState, ReactElement } from "react";
import { createPortal } from "react-dom";

import { ThumbnailUrl } from "../lib";
import Slider from "./Slider";

import * as styles from "./Gallery.css";
import { UploadFile } from "../../graphql/queryTypes";

interface Props {
  images: UploadFile[];
  bullets?: string;
}

const Gallery = ({ images, bullets }: Props): ReactElement => {
  const [fullscreen, setFullscreen] = useState<number>(0);

  if (fullscreen)
    return createPortal(
      <img
        className={styles.fullscreen}
        src={ThumbnailUrl(images, fullscreen, fullscreen)}
        onClick={() => setFullscreen(0)}
        alt=""
        draggable="false"
      />,
      document.getElementById("fullscreen")
    );

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <Slider hasBullets={bullets}>
          {images.map((image, i) => (
            <img
              key={image.id}
              src={ThumbnailUrl(image, i)}
              onClick={() => setFullscreen(i)}
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
