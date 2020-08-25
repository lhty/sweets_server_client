import React, { ReactElement } from "react";

import { useHistory } from "react-router-dom";

import * as styles from "./Bundles.css";

import Card from "../../Shared/Card";
import Slider from "../../Shared/Slider";
import { Product } from "../../../@types/queryTypes";

interface Props {
  bundles: Product[];
}

export default function Bundles({ bundles }: Props): ReactElement {
  const history = useHistory();

  const handleSelectBundle = (id: string, title: string) =>
    history.push(`${id}/${title}`);

  return (
    <section className={styles.container}>
      <Slider hasBullets={styles.bullets} grid={styles.grid} itemsPerPage={10}>
        {bundles.map((bundle) => (
          <Card
            key={bundle.id}
            input={bundle}
            select={handleSelectBundle}
            showDescription
          />
        ))}
      </Slider>
    </section>
  );
}
