import React from "react";

import { useFormik } from "formik";

interface Props {}

export default function (props: Props) {
  const formik = useFormik({
    initialValues: {
      files: [],
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div>
      <form
        style={{ display: "flex", flexFlow: "column wrap" }}
        onSubmit={formik.handleSubmit}
      >
        <label htmlFor="files">Upload</label>
        <input
          id="files"
          name="files"
          type="file"
          onChange={formik.handleChange}
          value={formik.values.files}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
