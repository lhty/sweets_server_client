import React, { useState, useRef, ReactElement } from "react";
import { createPortal } from "react-dom";

import { ThumbnailUrl } from "../lib";
import Slider from "./Slider";

import * as styles from "./Gallery.css";
import { UploadFile } from "../../@types/queryTypes";

import useClickOPutside from "../hooks/useClickOutside";

interface Props {
  images: UploadFile[];
  bullets?: string;
}

const Gallery = ({ images, bullets }: Props): ReactElement => {
  const [fullscreen, setFullscreen] = useState<number>();
  const fullscreenRef = useRef();

  const handleToggleOffFullscreen = () => setFullscreen(0);

  useClickOPutside(fullscreenRef, handleToggleOffFullscreen);

  if (fullscreen)
    return createPortal(
      <img
        ref={fullscreenRef}
        className={styles.fullscreen}
        onClick={handleToggleOffFullscreen}
        src={ThumbnailUrl(images, fullscreen, fullscreen)}
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
