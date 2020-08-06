import React, { ReactElement, useState } from "react";
import * as styles from "./AuthPage.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

// import { SyncOutlined } from "@ant-design/icons";

interface Props {}

const AuthPage = ({}: Props): ReactElement => {
  const [toggleState, setToggleState] = useState("login");

  return (
    <div className={styles.Auth}>
      <button
        className={styles.toggle}
        onClick={() =>
          setToggleState(toggleState === "login" ? "signup" : "login")
        }
      >
        {toggleState === "login" ? "Регистрация" : "Вход"}
      </button>
      {/* <SyncOutlined spin /> */}
      {toggleState === "login" ? <Login /> : <Signup />}
    </div>
  );
};

const Login = () => {
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Неправильный email")
      .required("Обязателньое поле"),
    password: yup.string().required("Обязателньое поле").min(5),
  });

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validateOnChange={true}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        // make async call
        console.log("submit: ", values);
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting, handleSubmit, handleChange, handleBlur }) => (
        <Form onSubmit={handleSubmit} className={styles.form}>
          <Field
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorMessage name="email" component="div" />
          <Field
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorMessage name="password" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Войти
          </button>
        </Form>
      )}
    </Formik>
  );
};

const Signup = () => {
  return <div></div>;
};

export default AuthPage;
