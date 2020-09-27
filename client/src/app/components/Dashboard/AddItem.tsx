import React, { useReducer } from "react";

import { useFormik } from "formik";

import { useMutation } from "@apollo/client";
import uploadFiles from "../../graphql/mutations/uploadFiles.graphql";
import sendItem from "../../graphql/mutations/addItem.graphql";

import FileUpload from "./FileUpload";
import Info from "./Info";
import Tag from "./Tag";
import Material from "./Material";

type dataType = {
  base_price?: number;
  additional?: number;
  discount?: string;
  is_available_in_constructor?: boolean;
};

const AddItem = () => {
  const [sendFiles] = useMutation(uploadFiles);
  const [uploadItem] = useMutation(sendItem);

  const [
    { base_price, additional, discount, is_available_in_constructor },
    setData,
  ] = useReducer((data: dataType, action: any) => ({ ...data, ...action }), {
    base_price: 0,
    additional: 0,
    discount: "",
    is_available_in_constructor: true,
  });

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

    await uploadItem({
      variables: {
        input: {
          data: {
            info: {
              name,
              description,
              image: imagesUidArray,
            },
            price: {
              base_price,
              additional,
              discount,
            },
            is_available_in_constructor,
          },
        },
      },
      refetchQueries: ["getItems"],
    });
  };

  const {
    values: { name, description, files },
    setFieldValue,
    handleSubmit,
    handleChange,
    handleReset,
  } = useFormik({
    initialValues: {
      name: "",
      description: "",
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
      handleReset(values);
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <Info {...{ handleChange, name, description }} />
      <Material />
      <Tag />
      <FileUpload {...{ files, setFieldValue }} />
      <button type="submit" disabled={!files.length || !name || !description}>
        Submit
      </button>
    </form>
  );
};

export default AddItem;
