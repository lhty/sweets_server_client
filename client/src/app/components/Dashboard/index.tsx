import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import uploadFiles from "../../graphql/mutations/uploadFiles.graphql";
import addBundle from "../../graphql/mutations/addBundle.graphql";

import * as styles from "./Dashboard.css";
import { FileAddOutlined } from "@ant-design/icons";

import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import * as yup from "yup";

import Constructor from "../Products/Constructor/Constructor";

export default function () {
  const [sendFiles] = useMutation(uploadFiles);
  const [upload, { data }] = useMutation(addBundle);
  const [constructor, constructedSet] = useState({
    set: [],
    box: "",
    price: 0,
    done: false,
  });

  const handleSubmitMutation = async (files: any) => {
    const {
      data: { multipleUpload },
    } = await sendFiles({
      variables: {
        files,
      },
    });
    const image = multipleUpload.map((upload: { id: string }) => upload.id);

    await upload({
      variables: {
        input: {
          data: {
            info: {
              name,
              description,
              image,
            },
            box: constructor.box,
            bundle: constructor.set,
            price: {
              additional: 0,
              discount: "",
            },
          },
        },
      },
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
      try {
        await handleSubmitMutation(values.files);
        console.log(data);
        handleReset(values);
      } catch (e) {
        console.log(e);
      }
    },
    validationSchema: yup.object({
      files: yup.array(),
    }),
  });

  const onDrop = (acceptedFiles: any) => {
    const usedPaths = files.map(({ path }) => path);
    const filesToAdd = acceptedFiles.filter(
      ({ path }: { path: string }) => !usedPaths.includes(path)
    );
    setFieldValue("files", [...files, ...filesToAdd]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.details}>
          <input
            onChange={handleChange}
            type="text"
            value={name}
            name="name"
            placeholder="название"
          />
          <textarea
            onChange={handleChange}
            value={description}
            name="description"
            placeholder="описание"
          />
        </div>
        <div className={styles.create}>
          {constructor.done ? (
            <h2
              onClick={() => constructedSet({ ...constructor, done: false })}
              className={styles.create_result}
            >
              {constructor.set.length} шт {constructor.price} ₽
            </h2>
          ) : (
            <Constructor onSubmit={constructedSet} />
          )}
        </div>
        <div className={styles.drop} {...getRootProps()}>
          <input name="files" {...getInputProps()} />
          <FileAddOutlined style={{ fontSize: "5rem" }} />
          <ul>
            {files.map((file, i) => (
              <li
                onClick={() =>
                  setFieldValue(
                    "files",
                    files.filter((_, _i) => i !== _i)
                  )
                }
                key={i}
              >
                {file.name + " " + Math.round(file.size / 1000)} kB
              </li>
            ))}
          </ul>
        </div>

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
