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
  const [fullscreen, setFullscreen] = useState<number | null>(null);
  const fullscreenRef = useRef();

  const handleToggleOffFullscreen = () => setFullscreen(null);

  useClickOPutside(fullscreenRef, handleToggleOffFullscreen, fullscreen >= 0);

  if (fullscreen || fullscreen === 0)
    return createPortal(
      <img
        ref={fullscreenRef}
        className={styles.fullscreen}
        onClick={handleToggleOffFullscreen}
        src={ThumbnailUrl({ images, index: fullscreen, fullscreen })}
        alt=""
        draggable="false"
      />,
      document.getElementById("fullscreen")
    );

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <Slider hasBullets={bullets}>
          {images.map((images, index) => (
            <div key={images.id} onClick={() => setFullscreen(index)}>
              <img
                src={ThumbnailUrl({ images, index })}
                alt=""
                draggable="false"
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Gallery;
