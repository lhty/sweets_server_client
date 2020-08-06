import React, { ReactElement, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as styles from "./AuthPage.css";

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
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const errors = { email: "", password: "" };
        if (!values.email) {
          errors.email = "Обязателньое поле";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Неправильный email";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setTimeout(() => {
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />
          <Field type="password" name="password" />
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
