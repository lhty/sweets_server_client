import React, { useReducer } from "react";

import { useFormik } from "formik";

import { useQuery } from "@apollo/client";
import getTags from "../../graphql/queries/getTags.graphql";

import { useMutation } from "@apollo/client";
import uploadFiles from "../../graphql/mutations/uploadFiles.graphql";
import sendBox from "../../graphql/mutations/addBox.graphql";

import FileUpload from "./FileUpload";
import Info from "./Info";
import Selectable from "./Selectable";
import Price from "./Price";
import Dimensions from "./Dimensions";

import { Tags, ComponentDimensionsDimensions } from "../../@types/queryTypes";

type dataType = {
  tags: Array<string>;
  dimensions: Partial<ComponentDimensionsDimensions>;
};

const AddBox = () => {
  const [sendFiles] = useMutation(uploadFiles);
  const [uploadBox] = useMutation(sendBox);

  const [{ tags, dimensions }, setData] = useReducer(
    (data: dataType, action: Partial<dataType>) => ({ ...data, ...action }),
    {
      tags: [],
      dimensions: { weight: 0, width: 0, breadth: 0, height: 0 },
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

    await uploadBox({
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
            dimensions,
            tags,
          },
        },
      },
      refetchQueries: ["getItems"],
    });
  };

  const { data: tagData, loading: tagLoading } = useQuery<{
    tags: Array<Tags>;
  }>(getTags, {
    // variables: { name: null },
  });
  const {
    values: { name, description, base_price, additional, discount, files },
    setFieldValue,
    handleSubmit,
    handleChange,
    handleReset,
  } = useFormik({
    initialValues: {
      name: "",
      description: "",
      base_price: 0,
      additional: 0,
      discount: "",
      files: [],
    },
    onSubmit: async (values) => {
      try {
        await handleSubmitMutation(values.files);
        handleReset(values);
      } catch (e) {
        console.log(e);
      }
      handleReset(values);
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <Info {...{ handleChange, name, description }} />
      <Price
        {...{
          base_price,
          additional,
          discount,
          handleChange,
        }}
      />
      <Dimensions {...{ dimensions, set: setData }} />
      {!tagLoading && (
        <Selectable {...{ set: setData, data: tagData, selected: tags }} />
      )}
      <FileUpload {...{ files, setFieldValue }} />
      <button type="submit" disabled={!files.length || !name || !description}>
        Submit
      </button>
    </form>
  );
};

export default AddBox;
