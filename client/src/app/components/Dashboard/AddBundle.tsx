import React, { useReducer } from "react";

import { useFormik } from "formik";

import { useMutation } from "@apollo/client";
import uploadFiles from "../../graphql/mutations/uploadFiles.graphql";
import sendBundle from "../../graphql/mutations/addBundle.graphql";

import CreateBundle from "./CreateBundle";
import FileUpload from "./FileUpload";
import Info from "./Info";

import { ComponentBundleItemInput } from "../../@types/queryTypes";
import Tag from "./Tag";

type dataType = {
  set?: Array<ComponentBundleItemInput>;
  box?: string;
  price?: number;
  isDone: boolean;
};

const AddBundle = () => {
  const [sendFiles] = useMutation(uploadFiles);
  const [uploadBundle] = useMutation(sendBundle);

  const [{ set, box, price, isDone }, setData] = useReducer(
    (data: dataType, action: any) => ({ ...data, ...action }),
    {
      set: [],
      box: "",
      price: 0,
      isDone: false,
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
      try {
        await handleSubmitMutation(values.files);
        handleReset(values);
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <Info {...{ handleChange, name, description }} />
      <Tag />
      <CreateBundle
        {...{
          handleChange,
          additional,
          discount,
          price,
          setData,
          isDone,
        }}
      />
      <FileUpload {...{ files, setFieldValue }} />
      <button
        type="submit"
        disabled={!files.length || !set.length || !name || !description}
      >
        Submit
      </button>
    </form>
  );
};

export default AddBundle;
