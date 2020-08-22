import React from "react";

import { useMutation } from "@apollo/client";
import uploadFiles from "./uploadFiles.graphql";

import * as styles from "./Dashboard.css";
import { FileAddOutlined } from "@ant-design/icons";

import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import * as yup from "yup";

export default function () {
  const [sendFiles, sendFilesresult] = useMutation(uploadFiles);

  const {
    values: { files },
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: {
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
        console.log(multipleUpload);
      } catch (e) {
        console.log(e);
      }
    },
    validationSchema: yup.object().shape({
      recaptcha: yup.array(),
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
      <form
        style={{ display: "flex", flexFlow: "column wrap" }}
        onSubmit={handleSubmit}
      >
        <div className={styles.drop} {...getRootProps()}>
          <input {...getInputProps()} />
          <FileAddOutlined style={{ fontSize: "5rem" }} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <button type="submit">Submit</button>
      </form>
      {files.map((file, i) => (
        <p key={i}>{file.name}</p>
      ))}
    </div>
  );
}
