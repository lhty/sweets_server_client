import React, { useCallback } from "react";

import * as styles from "./Dashboard.css";
import { FileAddOutlined } from "@ant-design/icons";

import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import * as yup from "yup";

export default function () {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length === 0) {
      return;
    }
    formik.handleChange(formik.values.files.concat(acceptedFiles));
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const formik = useFormik({
    initialValues: {
      files: [],
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: yup.object().shape({
      recaptcha: yup.array(),
    }),
  });
  console.log(formik.values);
  return (
    <div className={styles.container}>
      <form
        style={{ display: "flex", flexFlow: "column wrap" }}
        onSubmit={formik.handleSubmit}
      >
        <div className={styles.drop} {...getRootProps()}>
          <input {...getInputProps()} />
          <FileAddOutlined style={{ fontSize: "5rem" }} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
