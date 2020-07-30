import React, { ReactElement, useState, useEffect } from "react";

import * as styles from "./Slider.css";
import { useSprings, interpolate, animated as a } from "react-spring";
import { useGesture } from "react-use-gesture";

interface Props {
  children: ReactElement[] | ReactElement;
  scaleOnDrag?: boolean;
  itemsPerPage?: number;
  bullets?: string | boolean;
}

export default function Slider({
  children,
  scaleOnDrag = false,
  itemsPerPage = 1,
  bullets = false,
}: Props): ReactElement {
  if (!Array.isArray(children)) return <>{children}</>;

  const SLIDES = children.reduce(
    (acc, _, i) =>
      i % itemsPerPage ? acc : [...acc, children.slice(i, i + itemsPerPage)],
    []
  );

  const [slide, setSlide] = useState<number>(0);
  // const [isDragging, setDragging] = useState(false);

  const [springProps, setSpringProps] = useSprings(SLIDES.length, (i) => ({
    x: i * window.innerWidth,
    sc: 1,
  }));

  const bind = useGesture({
    onDrag: ({ down, direction: [xDir], distance, cancel }) => {
      if (down && distance > window.innerWidth / 5) {
        cancel();
        setSlide(_clamp(slide + (xDir > 0 ? -1 : 1), 0, SLIDES.length - 1));
      }
    },
  });

  useEffect(() => {
    setSlide(slide % SLIDES.length);
  }, [slide, SLIDES.length]);

  useEffect(() => {
    // @ts-ignore
    setSpringProps((i) => ({
      x: i < slide ? -window.innerWidth : i === slide ? 0 : window.innerWidth,
      sc: i != slide && scaleOnDrag ? 0.8 : 1,
    }));
    return () => {
      // @ts-ignore
      setSpringProps((i) => ({
        x: 0,
        sc: 1,
      }));
    };
  }, [slide]);

  return (
    <>
      <div className={styles.container}>
        {springProps.map(
          ({ x, sc }, index) =>
            slide === index && (
              <a.div
                onContextMenu={(e) => e.preventDefault()}
                className={styles.wrapper}
                {...bind()}
                key={index}
                style={{
                  transform: interpolate(
                    [x, sc],
                    (x, sc) => `translateX(${x}px) scale(${sc})`
                  ),
                }}
              >
                {SLIDES[slide]}
              </a.div>
            )
        )}
      </div>
      {bullets && SLIDES.length > 1 && (
        <div className={bullets.toString()}>
          {SLIDES.map((_, i) => (
            <div
              onClick={() => setSlide(i)}
              style={{
                opacity: i != slide ? 0.6 : 1,
                transform: `scale(${i === slide ? 1 : 0.8})`,
                transition: "0.3s ease",
              }}
              key={i}
            >
              <p>{i + 1}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

const _clamp = (num: number, low: number, high: number) =>
  high >= 0 ? Math.min(Math.max(num, low), high) : Math.min(num, low);
