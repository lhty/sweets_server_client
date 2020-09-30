import React from "react";
import { ComponentDimensionsDimensions } from "../../@types/queryTypes";

import * as styles from "./Dimensions.css";

interface Props {
  dimensions: Partial<ComponentDimensionsDimensions>;
  set: (i: any) => void;
}
const locale = ["Вес", "Ширина", "Длина", "Высота"];

const Dimensions = ({ dimensions, set }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.container_wrapper}>
        {Object.keys(dimensions).map((prop, i) => (
          <React.Fragment key={prop + i}>
            <label htmlFor={prop}>{locale[i]}</label>
            <input
              onChange={(e) =>
                set({
                  dimensions: {
                    ...dimensions,
                    [prop]: Number(e.target.value),
                  },
                })
              }
              type="number"
              value={dimensions[prop] || ""}
              name={prop}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Dimensions;
