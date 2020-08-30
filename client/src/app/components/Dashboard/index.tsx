import React from "react";

import { useMutation } from "@apollo/client";
import uploadFiles from "./uploadFiles.graphql";

import * as styles from "./Dashboard.css";
import { FileAddOutlined } from "@ant-design/icons";

import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import * as yup from "yup";

import Constructor from "../Products/Constructor/Constructor";

export default function () {
  const [sendFiles] = useMutation(uploadFiles);

  const {
    values: { name, description, box, additional, discount, bundle, files },
    setFieldValue,
    handleSubmit,
    handleChange,
    handleReset,
  } = useFormik({
    initialValues: {
      name: "",
      description: "",
      box: "",
      additional: 0,
      discount: "",
      bundle: [],
      files: [],
    },
    onSubmit: async (values) => {
      try {
        const {
          data: { multipleUpload },
        } = await sendFiles({
          variables: {
            files,
          },
        });
        console.log(multipleUpload.map((upload: { id: string }) => upload.id));
        handleReset(values);
      } catch (e) {
        console.log(e);
      }
    },
    validationSchema: yup.object({
      files: yup.array(),
    }),
  });

  const onDrop = (acceptedFiles: any) =>
    setFieldValue("files", [...files, ...acceptedFiles]);

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
            // type="text"
            value={description}
            name="description"
            placeholder="описание"
          />
        </div>
        <div className={styles.create}>
          <Constructor />
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

        <button type="submit" disabled={!files.length}>
          Submit
        </button>
      </form>
    </div>
  );
}
