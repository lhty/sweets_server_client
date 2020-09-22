import React, { useState, useReducer } from "react";

import { useMutation } from "@apollo/client";
import uploadFiles from "../../graphql/mutations/uploadFiles.graphql";
import addBundle from "../../graphql/mutations/addBundle.graphql";

import * as styles from "./Dashboard.css";

import { useFormik, useField } from "formik";
import * as yup from "yup";

import Constructor from "../Products/Constructor/Constructor";
import FileUpload from "./FileUpload";
import { ComponentBundleItemInput } from "../../@types/queryTypes";

export default function () {
  const [sendFiles] = useMutation(uploadFiles);
  const [uploadBundle] = useMutation(addBundle);
  const [constructor, constructedSet] = useState({
    set: [],
    box: "",
    price: 0,
    done: false,
  });

  // type dataType = {
  //   set?: Array<ComponentBundleItemInput>;
  //   box?: string;
  //   price?: number;
  //   done: boolean;
  // };

  // const [data, setData] = useReducer(
  //   (data: dataType, action: any) => ({ ...data, action }),
  //   {
  //     done: false,
  //   }
  // );

  const handleSubmitMutation = async (files: any) => {
    const {
      data: { multipleUpload },
    } = await sendFiles({
      variables: {
        files,
      },
    });
    const imagesUidArray = multipleUpload.map(
      (upload: { id: string }) => upload.id
    );

    await uploadBundle({
      variables: {
        input: {
          data: {
            info: {
              name,
              description,
              image: imagesUidArray,
            },
            box: constructor.box,
            bundle: constructor.set,
            price: {
              additional,
              discount,
            },
          },
        },
      },
      refetchQueries: ["getBundles"],
    });
  };

  const {
    values: { name, description, additional, discount, files },
    setFieldValue,
    handleSubmit,
    handleChange,
    handleReset,
  } = useFormik({
    initialValues: {
      name: "",
      description: "",
      discount: "",
      additional: 0,
      files: [],
    },
    onSubmit: async (values) => {
      try {
        await handleSubmitMutation(values.files);
        handleReset(values);
      } catch (e) {
        console.log(e);
      }
    },
    validationSchema: yup.object({
      files: yup.array(),
    }),
  });

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.details}>
          <input
            onChange={handleChange}
            type="text"
            value={name}
            autoComplete="off"
            name="name"
            placeholder="Название"
          />
          <textarea
            onChange={handleChange}
            value={description}
            name="description"
            placeholder="Описание"
          />
        </div>
        <div className={styles.create}>
          {constructor.done ? (
            <>
              <h2
                onClick={() => constructedSet({ ...constructor, done: false })}
                className={styles.create_result}
              >
                Базовая цена : {constructor.price} ₽
              </h2>
              {(discount !== "0" || additional > 0) && (
                <h2 className={styles.create_result}>
                  Итого :{" "}
                  {constructor.price +
                    additional -
                    (discount !== "0"
                      ? Math.round(
                          discount.includes("%")
                            ? ((constructor.price + additional) / 100) *
                                Number(discount.replace(/\D/g, ""))
                            : Number(discount)
                        )
                      : 0)}{" "}
                  ₽
                </h2>
              )}
              <div className={styles.create_params}>
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
            <Constructor onSubmit={constructedSet} />
          )}
        </div>
        <FileUpload {...{ files, setFieldValue }} />
        <button
          type="submit"
          disabled={
            !files.length || !constructor.set.length || !name || !description
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
}
