import React, { ReactElement, useState, useRef } from "react";

import * as styles from "./Slider.css";
import { useSprings, interpolate, animated as a } from "react-spring";
import { useGesture } from "react-use-gesture";

interface Props {
  children: ReactElement[] | ReactElement;
  scaleOnDrag?: boolean;
  itemsPerPage?: number;
  bullets?: string | boolean;
}

const _clamp = (num: number, low: number, high: number) =>
  high >= 0 ? Math.min(Math.max(num, low), high) : Math.min(num, low);

export default function Slider({
  children,
  scaleOnDrag = false,
  itemsPerPage = 1,
  bullets = false,
}: Props): ReactElement {
  if (!Array.isArray(children)) return <>{children}</>;

  const constainerRef = useRef<HTMLDivElement>();

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const SLIDES = children.reduce(
    (acc, _, i) =>
      i % itemsPerPage ? acc : [...acc, children.slice(i, i + itemsPerPage)],
    []
  );

  const [springProps, setSpringProps] = useSprings(SLIDES.length, (i) => ({
    x: i * window.innerWidth,
    sc: 1,
  }));

  const bind = useGesture({
    onDrag: ({
      down,
      delta: [xDelta],
      direction: [xDir],
      distance,
      cancel,
    }) => {
      if (down && distance > window.innerWidth / 5) {
        cancel();
        setCurrentIndex(
          _clamp(currentIndex + (xDir > 0 ? -1 : 1), 0, SLIDES.length - 1)
        );
      }
      // @ts-ignore
      setSpringProps((i) => ({
        x: (i - currentIndex) * window.innerWidth + (down ? xDelta : 0),
        sc: scaleOnDrag
          ? down && xDir
            ? 1 - distance / window.innerWidth / 2
            : 1
          : 1,
      }));
    },
  });

  return (
    <>
      <div className={styles.container}>
        {springProps.map(
          ({ x, sc }, index) =>
            currentIndex === index && (
              <a.div
                ref={constainerRef}
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
                {SLIDES[currentIndex]}
              </a.div>
            )
        )}
      </div>
      {bullets && SLIDES.length > 1 && (
        <div className={bullets.toString()}>
          {SLIDES.map((_, i) => (
            <div
              onClick={() => setCurrentIndex(i)}
              style={{
                opacity: i === currentIndex ? 0.6 : 0.3,
                transform: `scale(${i === currentIndex ? 1 : 0.8})`,
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
