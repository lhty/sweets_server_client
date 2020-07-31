import React, { useState } from "react";

import * as styles from "./Slider.css";
import { useSprings, interpolate, animated as a } from "react-spring";
import { useGesture } from "react-use-gesture";

interface SliderProps {
  itemsPerPage?: number;
  scaleOnDrag?: boolean;
  hasBullets?: boolean | string;
  activeIndex?: number;
  auto?: number;
  children?: React.ReactElement | React.ReactElement[];
  onSlideChange?: (slide: number) => void;
  setSlideCustom?: (slide: number) => number;
}

export default function Slider({
  itemsPerPage = 1,
  scaleOnDrag = false,
  hasBullets = false,
  activeIndex = 0,
  auto = 0,
  children,
  onSlideChange = () => undefined,
  setSlideCustom = undefined,
}: SliderProps): React.ReactElement {
  if (!Array.isArray(children)) return <>{children}</>;

  const [currentSlide, setSlide] = useState<number>(0);

  const SLIDES = children.reduce(
    (acc, _, i) =>
      i % itemsPerPage ? acc : [...acc, children.slice(i, i + itemsPerPage)],
    []
  );

  const [springs, set] = useSprings(SLIDES.length, (i) => ({
    x:
      i < currentSlide
        ? -window.innerWidth
        : i === currentSlide
        ? 0
        : window.innerWidth,
    sc: i != currentSlide && scaleOnDrag ? 0.8 : 1,
  }));

  const handleSlideToPage = (i: number) =>
    // @ts-ignore
    set((i) => ({
      x:
        i < currentSlide
          ? -window.innerWidth
          : i === currentSlide
          ? 0
          : window.innerWidth,
      sc: i != currentSlide && scaleOnDrag ? 0.8 : 1,
    })); // @ts-ignore
  set((i) => ({
    x:
      i < currentSlide
        ? -window.innerWidth
        : i === currentSlide
        ? 0
        : window.innerWidth,
    sc: i != currentSlide && scaleOnDrag ? 0.8 : 1,
  }));

  const bind = useGesture(
    {
      onDrag: ({ down, direction: [xDir], distance, cancel }) => {
        if (down && distance > window.innerWidth / 5) {
          const newIndex = _clamp(
            currentSlide + (xDir > 0 ? -1 : 1),
            0,
            SLIDES.length - 1
          );
          cancel();
          handleSlideToPage(newIndex);
          setSlide(newIndex);
        }
      },
    },
    {
      drag: {
        delay: 100,
      },
    }
  );

  return (
    <>
      <div className={styles.container}>
        {springs.map(
          ({ x, sc }, index) =>
            currentSlide === index && (
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
                {SLIDES[currentSlide]}
              </a.div>
            )
        )}
      </div>
      {hasBullets && SLIDES.length > 1 && (
        <div className={hasBullets.toString()}>
          {SLIDES.map((_, i) => (
            <div
              onClick={() => {
                handleSlideToPage(i);
                setSlide(i);
              }}
              style={{
                opacity: i != currentSlide ? 0.6 : 1,
                transform: `scale(${i === currentSlide ? 1 : 0.8})`,
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
