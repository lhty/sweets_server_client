import React, { useState, useRef, useEffect, ReactElement } from "react";
import { createPortal } from "react-dom";

import { ThumbnailUrl } from "../lib";
import Slider from "./Slider";

import { useSpring, useTransition, animated as a } from "react-spring";

import * as styles from "./Gallery.css";
import { UploadFile } from "../../@types/queryTypes";

import useClickOPutside from "../hooks/useClickOutside";

interface Props {
  images: UploadFile[];
  bullets?: string;
  card?: boolean;
}

const Gallery = ({ images, bullets, card = false }: Props): ReactElement => {
  if (card) {
    const { url, width, height } = ThumbnailUrl({
      source: images,
    });
    return <Img {...{ url, width, height, className: styles.card }} />;
  }

  const [fullscreen, setFullscreen] = useState<number | null>(null);
  const fullscreenRef = useRef();
  const handleToggleOffFullscreen = () => setFullscreen(null);
  useClickOPutside(fullscreenRef, handleToggleOffFullscreen, fullscreen >= 0);

  if (fullscreen || fullscreen === 0) {
    const { url } = ThumbnailUrl({
      source: images,
      index: fullscreen,
      fullscreen,
    });
    return createPortal(
      <div className={styles.fullscreen}>
        <img
          ref={fullscreenRef}
          onClick={handleToggleOffFullscreen}
          src={url}
          alt=""
          draggable="false"
        />
      </div>,
      document.getElementById("fullscreen")
    );
  }


  return (
    <section className={styles.container}>
      <Slider hasBullets={bullets} grid={styles.wrapper}>
        {images.map((image, index) => {
          const { url, width, height } = ThumbnailUrl({
            source: images,
            index,
          });
         return  <Img {...{ url, width, height,key:image.name + image.id }} />
        })}
      </Slider>
    </section>
  );
};

const Img = ({
  url,
  width,
  height,
  alt = "",
  ...rest
}: {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}) => {
   const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = url;
    img.onload = () => setLoading(false)
  }, []);

  const loaderStyle: any = useSpring({
    opacity: loading ? 1 : 0,
    width,
    height,
  });

  return loading ? (
    <a.div style={loaderStyle} className={styles.skeleton} />
  ) : (
    <img
      src={url}
      alt={alt}
      onDragStart={(e) => e.preventDefault()}
      draggable="false"
      {...rest}
    />
  );
};

export default Gallery;
