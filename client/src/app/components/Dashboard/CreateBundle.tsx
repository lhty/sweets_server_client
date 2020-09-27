import React from "react";
import Constructor from "../Products/Constructor/Constructor";
import * as styles from "./CreateBundle.css";

interface Props {
  handleChange: (e: React.ChangeEvent<any>) => void;
  additional: number;
  price: number;
  discount: string;
  setData: (obj: any) => void;
  isDone: boolean;
}

const CreateBundle = ({
  handleChange,
  additional,
  discount,
  price,
  setData,
  isDone,
}: Props) => {
  return (
    <div className={styles.bundle}>
      {isDone ? (
        <>
          <h2
            onClick={() => setData({ isDone: false })}
            className={styles.bundle_result}
          >
            Базовая цена : {price} ₽
          </h2>
          {(discount !== "0" || additional > 0) && (
            <h2 className={styles.bundle_result}>
              Итого :{" "}
              {price +
                additional -
                (discount !== "0"
                  ? Math.round(
                      discount.includes("%")
                        ? ((price + additional) / 100) *
                            Number(discount.replace(/\D/g, ""))
                        : Number(discount)
                    )
                  : 0)}{" "}
              ₽
            </h2>
          )}
          <div className={styles.bundle_params}>
            <label htmlFor="additional">Добавочная стоимость</label>
            <input
              onChange={handleChange}
              type="number"
              step="50"
              value={additional || ""}
              name="additional"
            />
            <label htmlFor="discount">Скидка (% или ₽)</label>
            <input
              onChange={handleChange}
              type="text"
              value={discount}
              name="discount"
              placeholder="0"
            />
          </div>
        </>
      ) : (
        <Constructor onSubmit={setData} />
      )}
    </div>
  );
};

export default CreateBundle;
