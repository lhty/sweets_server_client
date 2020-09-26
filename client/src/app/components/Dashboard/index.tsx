import React, { useState, useReducer } from "react";

import { useMutation } from "@apollo/client";
import uploadFiles from "../../graphql/mutations/uploadFiles.graphql";
import addBundle from "../../graphql/mutations/addBundle.graphql";

import * as styles from "./Dashboard.css";

import { useFormik } from "formik";

import Info from "./Info";
import AddBundle from "./AddBundle";
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

  type dataType = {
    name: string;
    description: string;
    set?: Array<ComponentBundleItemInput>;
    box?: string;
    price?: number;
    isDone: boolean;
    currentPage: keyof typeof variant;
  };

  const [{ set, box, price, currentPage, isDone }, setData] = useReducer(
    (data: dataType, action: any) => ({ ...data, ...action }),
    {
      name: "",
      description: "",
      set: [],
      box: "",
      price: 0,
      isDone: false,
      currentPage: "bundle",
    }
  );

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
            box,
            bundle: set,
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
      // try {
      //   await handleSubmitMutation(values.files);
      //   handleReset(values);
      // } catch (e) {
      //   console.log(e);
      // }
      console.log(values);
    },
  });

  const variant: any = {
    bundle: (
      <AddBundle
        {...{
          handleChange,
          additional,
          discount,
          price,
          setData,
          isDone,
        }}
      />
    ),
    item: null,
    box: null,
    material: null,
    banner: null,
    tag: null,
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_nav}>
        {Object.keys(variant).map((tab) => (
          <button
            className={currentPage === tab ? styles.active : ""}
            onClick={() => setData({ currentPage: tab })}
            key={tab}
          >
            {tab}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <Info {...{ handleChange, name, description }} />
        {variant[currentPage]}
        {currentPage !== "tag" && <FileUpload {...{ files, setFieldValue }} />}
        <button
          type="submit"
          disabled={!files.length || !set.length || !name || !description}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
